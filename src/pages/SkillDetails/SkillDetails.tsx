import { type RootState } from '@/store'
import { getAllCategories, getAllSubcategories } from '@/store/categories'
import { loadRequests, saveRequests, toggleFavorite } from '@/store/user-slice'
import { getUser, similarUsersSelector } from '@/store/users'
import { Button, Icon, Text } from '@/ui-kit'
import {
  Loading,
  RequestSuccess,
  ToastContainer,
  UserCard,
  UserGallery,
  UsersGrid,
} from '@/widgets'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass } from 'swiper/react'
import 'swiper/swiper.css'

import styles from './SkillDetails.module.css'

declare const window: Window & typeof globalThis
declare const navigator: Navigator

const defaultImages = [
  'https://i.pinimg.com/736x/18/13/63/1813631ee45a3612a6d9b4b116567a4b.jpg',
  'https://i.pinimg.com/736x/04/20/c4/0420c4d695e7f04aa9f769ee9dca0878.jpg',
  'https://i.pinimg.com/736x/ff/e3/2d/ffe32d8f5d5ca7fe2409ebfcd0fd9b28.jpg',
  'https://i.pinimg.com/1200x/cc/04/78/cc0478ece26a04406fa2e50272d93144.jpg',
]

const TOAST_DURATION = 3000

const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
  }
}

export const SkillDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { id } = useParams<{ id: string }>()

  const { loading, user } = useSelector((state: RootState) => getUser(state, id))

  const currentUser = useSelector((state: RootState) => state.user.user)
  const similarUsers = useSelector((state: RootState) =>
    similarUsersSelector(state, currentUser?.id, user?.id)
  )

  const categories = useSelector((state: RootState) => getAllCategories(state))
  const subcategories = useSelector((state: RootState) => getAllSubcategories(state))

  // Ref для управления слайдером похожих предложений
  const similarSwiperRef = useRef<SwiperClass | null>(null)

  const [showShareToast, setShowShareToast] = useState(false)
  const shareToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    return () => {
      if (shareToastTimerRef.current) clearTimeout(shareToastTimerRef.current)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [id])

  const handleShareClick = useCallback(async () => {
    try {
      await copyToClipboard(window.location.href)
    } catch {
      // ignore
    }

    if (shareToastTimerRef.current) clearTimeout(shareToastTimerRef.current)

    setShowShareToast(true)
    shareToastTimerRef.current = setTimeout(() => {
      setShowShareToast(false)
      shareToastTimerRef.current = null
    }, TOAST_DURATION)
  }, [])

  const handleShareToastClose = useCallback(() => {
    setShowShareToast(false)
    if (shareToastTimerRef.current) {
      clearTimeout(shareToastTimerRef.current)
      shareToastTimerRef.current = null
    }
  }, [])

  const handleOfferClick = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: location.pathname } } })
      return
    }

    if (!user) return

    const requests = loadRequests(currentUser.id)

    const newRequest = user.id

    requests.push(newRequest)
    saveRequests(currentUser.id, requests)

    // Открываем модалку вместо тоста
    setShowSuccessModal(true)
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    // Здесь можно добавить редирект, если потом понадобится
    // например: navigate('/my-requests')
  }

  if (loading) return <Loading />

  if (!user) return <Navigate to="/not-found" />

  // проверяем, есть ли юзер в избранном текущего пользователя
  const like = currentUser?.favorites?.includes(user.id) ?? false

  const handleLikeClick = () => {
    if (!currentUser || !user) return
    dispatch(toggleFavorite(user.id))
  }

  const skill = user?.skills?.filter((skill) => skill.type === 'teach')?.[0] ?? null

  const categoryObj = categories.find((cat) => cat.id === skill?.category)
  const subcategoryObj = subcategories.find((sub) => sub.id === skill?.subcategory)

  const skillImages = skill?.images?.length ? skill.images : defaultImages

  const handlePrev = () => similarSwiperRef.current?.slidePrev()
  const handleNext = () => similarSwiperRef.current?.slideNext()

  const shareToast = {
    id: 'share-toast',
    message: 'Ссылка скопирована',
    notificationId: 'share',
  }

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.topElement}>
        <UserCard user={user} showAbout hideActions />

        <div className={styles.detailsWrapper}>
          <div className={styles.topButtons}>
            {(!currentUser || currentUser.id !== user.id) && (
              <button
                className={`${styles.topButton} ${like ? styles.liked : ''}`}
                onClick={handleLikeClick}
              >
                <Icon name={like ? 'like-filled' : 'like'} />
              </button>
            )}
            <button className={styles.topButton} onClick={handleShareClick}>
              <Icon name="share" />
            </button>
            <button className={styles.topButton} onClick={() => {}}>
              <Icon name="more-square" />
            </button>
          </div>

          <section className={styles.skillDetails}>
            <div className={styles.skillInfo}>
              <div className={styles.skillHeader}>
                <Text variant="H1" className={styles.skillTitle}>
                  {skill?.title ?? 'Навык'}
                </Text>

                <Text variant="Caption" className={styles.skillCategory}>
                  {skill && categoryObj && subcategoryObj
                    ? `${categoryObj.name} / ${subcategoryObj.name}`
                    : 'Категория'}
                </Text>
              </div>

              <div className={styles.skillDescriptionWrapper}>
                <Text variant="Body" className={styles.skillDescription}>
                  {skill?.description ?? 'Описание навыка пока недоступно.'}
                </Text>
              </div>

              {(!currentUser || currentUser.id !== user.id) && (
                <Button onClick={handleOfferClick}>Предложить обмен</Button>
              )}
            </div>

            <UserGallery images={skillImages} />
          </section>
        </div>
      </section>

      <section className={styles.bottomElement}>
        <div className={styles.similarOffersHeader}>
          <Text variant="H2" className={styles.similarOffersTitle}>
            Похожие предложения
          </Text>
        </div>

        <div className={styles.similarSwiperWrapper}>
          <Swiper
            spaceBetween={24}
            slidesPerView={4}
            loop={similarUsers.length > 4}
            onSwiper={(swiper) => (similarSwiperRef.current = swiper)}
            className={styles.similarSwiper}
          >
            {similarUsers.map((user) => (
              <SwiperSlide key={user.id}>
                <UsersGrid users={[user]} columns={1} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrev}
            aria-label="Предыдущее"
          >
            <Icon name="left-switch" size={16} />
          </button>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Следующее"
          >
            <Icon name="right-switch" size={16} />
          </button>
        </div>
      </section>

      {showShareToast && (
        <ToastContainer
          toasts={[shareToast]}
          onClose={handleShareToastClose}
          autoHideDuration={TOAST_DURATION}
        />
      )}

      {showSuccessModal && <RequestSuccess onClose={handleModalClose} onRedirect={() => {}} />}
    </div>
  )
}
