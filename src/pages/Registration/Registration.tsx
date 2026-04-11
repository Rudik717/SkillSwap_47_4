import type { AppDispatch } from '@/store'
import type { RootState } from '@/store'
import { registerUser } from '@/store/user-slice'
import { Spinner } from '@/ui-kit'
import type { TRegisterData } from '@/utils'
import type { TSkillFormData } from '@/utils'
import { Registration1 } from '@/widgets'
import { Registration2 } from '@/widgets'
import { Registration3 } from '@/widgets'
import { RegistrationPreview } from '@/widgets'
import { RegistrationSuccess } from '@/widgets'
import { useModal } from '@/widgets/Modal/useModal'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Registration = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading } = useSelector((state: RootState) => state.user)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [data, setData] = useState<TRegisterData>({
    name: '',
    email: '',
    password: '',
    birthDate: null,
    gender: '',
    city: '',
    avatar: '',
    skills: [
      {
        type: 'learn',
        category: '',
        subcategory: '',
      },
      {
        type: 'teach',
        category: '',
        subcategory: '',
        title: '',
        description: '',
        images: [],
      },
    ],
  })

  const { openModal, closeModal, isModalOpen } = useModal()
  // для ошибки
  const [registrationError, setRegistrationError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setRegistrationError(null)
    // Сборка всех данных
    const userData: TRegisterData = {
      ...data,
      skills: data.skills.filter((skill) => {
        if (skill.type === 'learn') {
          return skill.category && skill.subcategory
        }
        if (skill.type === 'teach') {
          return skill.title && skill.description && skill.category && skill.subcategory
        }
        return false
      }),
    }
    try {
      await dispatch(registerUser(userData)).unwrap()
      setIsSuccessModalOpen(true)
      closeModal()
    } catch (error) {
      const errorData =
        ((error as AxiosError)?.response?.data as { message?: string })?.message ||
        'Ошибка регистрации'
      setRegistrationError(errorData)
    }
  }

  const extractedSkill: TSkillFormData = {
    title: data.skills[1]?.title ?? '',
    description: data.skills[1]?.description ?? '',
    category: data.skills[1]?.category ?? '',
    subcategory: data.skills[1]?.subcategory ?? '',
    images: data.skills[1]?.images ?? [],
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {step === 1 && <Registration1 data={data} setData={setData} nextStep={() => setStep(2)} />}
      {step === 2 && (
        <Registration2
          data={data}
          setData={setData}
          nextStep={() => setStep(3)}
          prevStep={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Registration3
          data={data}
          setData={setData}
          nextStep={() => openModal()} // Открывается окно с превью
          prevStep={() => setStep(2)}
        />
      )}

      {isModalOpen && (
        <RegistrationPreview
          data={extractedSkill}
          isOpen={isModalOpen}
          onEdit={() => {
            setRegistrationError(null)
            closeModal()
          }}
          onConfirm={handleConfirm} // Нажатие на кнопку 'Готово' и отправка данных
          error={registrationError}
        />
      )}

      {isSuccessModalOpen && (
        <RegistrationSuccess
          variant="registration"
          onClose={() => setIsSuccessModalOpen(false)}
          onRedirect={() => navigate('/')}
        />
      )}
    </>
  )
}
