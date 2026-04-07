import { type RootState } from '@/store'
import { getAllCategories, getAllSubcategories } from '@/store/categories'
import { recommendedUsersSelector } from '@/store/users'
import { Button, Icon, Text } from '@/ui-kit'
import { UserCard, UserGallery, UsersGrid } from '@/widgets'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass } from 'swiper/react'
import 'swiper/swiper.css'

import styles from './SkillDetails.module.css'

export const SkillDetails = () => {
  const navigate = useNavigate()

  // Пока нет авторизации всегда редирект на логин
  const handleOfferClick = () => {
    navigate('/login')
  }

  // TODO: Проверка на авторизацию юзера и правильный редирект

  // Получаем список пользователей и категорий
  const similarUsers = useSelector((state: RootState) => recommendedUsersSelector(state))
  const categories = useSelector((state: RootState) => getAllCategories(state))
  const subcategories = useSelector((state: RootState) => getAllSubcategories(state))

  // Ref для управления слайдером похожих предложений
  const similarSwiperRef = useRef<SwiperClass | null>(null)

  // Отображаем первого пользователя и его навык
  const user = similarUsers[0]
  const skill = user?.skills?.[0] ?? null

  // Находим объекты категорий по id
  const categoryObj = categories.find((cat) => cat.id === skill?.category)
  const subcategoryObj = subcategories.find((sub) => sub.id === skill?.subcategory)

  // Отображение дефолтных картинок, если не установлены свои
  const skillImages = skill?.images?.length
    ? skill.images
    : [
        'https://i.pinimg.com/736x/18/13/63/1813631ee45a3612a6d9b4b116567a4b.jpg',
        'https://i.pinimg.com/736x/04/20/c4/0420c4d695e7f04aa9f769ee9dca0878.jpg',
        'https://i.pinimg.com/736x/ff/e3/2d/ffe32d8f5d5ca7fe2409ebfcd0fd9b28.jpg',
        'https://i.pinimg.com/1200x/cc/04/78/cc0478ece26a04406fa2e50272d93144.jpg',
      ]

  // Проверка данных перед рендером
  if (!similarUsers || similarUsers.length === 0) {
    return <Text variant="Body">Загрузка данных...</Text>
  }

  if (!skill) {
    return <Text variant="Body">Навык пока недоступен</Text>
  }

  // Обработчики навигации слайдера
  const handlePrev = () => similarSwiperRef.current?.slidePrev()
  const handleNext = () => similarSwiperRef.current?.slideNext()

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.topElement}>
        <UserCard user={user} showAbout hideActions />

        <div className={styles.detailsWrapper}>
          <div className={styles.topButtons}>
            <button className={styles.topButton} onClick={() => {}}>
              <Icon name="like" />
            </button>
            <button className={styles.topButton} onClick={() => {}}>
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

              <Button onClick={handleOfferClick}>Предложить обмен</Button>
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
    </div>
  )
}
