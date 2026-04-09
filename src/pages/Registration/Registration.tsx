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

const Images = [
  'https://i.pinimg.com/736x/18/13/63/1813631ee45a3612a6d9b4b116567a4b.jpg',
  'https://i.pinimg.com/736x/04/20/c4/0420c4d695e7f04aa9f769ee9dca0878.jpg',
  'https://i.pinimg.com/736x/ff/e3/2d/ffe32d8f5d5ca7fe2409ebfcd0fd9b28.jpg',
  'https://i.pinimg.com/1200x/cc/04/78/cc0478ece26a04406fa2e50272d93144.jpg',
  'https://i.pinimg.com/736x/d0/a3/07/d0a3075735394a68407a85ae0c1ceb38.jpg',
  'https://i.pinimg.com/736x/f0/3f/5c/f03f5cdddb3324887f20eee1edbe1dc6.jpg',
  'https://i.pinimg.com/736x/fb/6f/37/fb6f374d1616ef629eb00c9e3dd1386f.jpg',
  'https://i.pinimg.com/736x/19/aa/49/19aa496eb777b54e5c985436615f699a.jpg',
]

export const Registration = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading } = useSelector((state: RootState) => state.user)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [data, setData] = useState<TRegisterData>({
    id: '',
    name: '',
    email: '',
    password: '',
    birthDate: null,
    gender: '',
    city: '',
    avatar: '',
    about: '',
    skills: [
      {
        id: '',
        userId: '',
        type: 'learn',
        category: '',
        subcategory: '',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: '',
        userId: '',
        type: 'teach',
        category: '',
        subcategory: '',
        title: '',
        description: '',
        images: [],
        createdAt: '',
        updatedAt: '',
      },
    ],
    createdAt: '',
    updatedAt: '',
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
    images: Images,
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
