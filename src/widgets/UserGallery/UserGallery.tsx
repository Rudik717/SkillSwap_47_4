import { Icon } from '@/ui-kit'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass } from 'swiper/react'
import 'swiper/swiper.css'

import styles from './UserGallery.module.css'

export interface UserGalleryProps {
  images: string[]
  alt?: string
  navigation?: boolean
  onImageClick?: (index: number) => void
}

export const UserGallery: React.FC<UserGalleryProps> = ({
  images,
  alt = 'Фото пользователя',
  navigation = true,
  onImageClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const mainSwiperRef = useRef<SwiperClass | null>(null)

  if (!images?.length) return null

  const totalImages = images.length
  const hasMultiple = totalImages > 1
  const showOverlay = totalImages > 4
  const singleImage = totalImages === 1

  const getSmallImages = () => {
    const smallImages = []
    const maxCount = Math.min(3, totalImages - 1)

    for (let i = 1; i <= maxCount; i++) {
      const index = (currentIndex + i) % totalImages
      smallImages.push(images[index])
    }
    return smallImages
  }

  const smallImages = getSmallImages()
  const emptySlotsCount = Math.max(0, 3 - smallImages.length)

  const handleImageClick = (index: number) => {
    mainSwiperRef.current?.slideToLoop(index)
    onImageClick?.(index)
  }

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex)
  }

  const handlePrev = () => mainSwiperRef.current?.slidePrev()
  const handleNext = () => mainSwiperRef.current?.slideNext()

  return (
    <div className={styles.galleryContainer}>
      <div className={`${singleImage ? styles.singleImageGallery : styles.gallery}`}>
        <div className={styles.mainImageContainer}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={hasMultiple}
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            className={styles.mainSwiper}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div
                  className={styles.mainImage}
                  onClick={() => handleImageClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageClick(index)
                    }
                  }}
                >
                  <img
                    src={src}
                    alt={`${alt} ${index + 1}`}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кастомные стрелки навигации */}
          {navigation && hasMultiple && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrev}
                aria-label="Предыдущее фото"
              >
                <Icon name="left-switch" size={16} />
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext}
                aria-label="Следующее фото"
              >
                <Icon name="right-switch" size={16} />
              </button>
            </>
          )}
        </div>

        {/* Сетка миниатюр */}
        {hasMultiple && (
          <div className={styles.smallGrid}>
            {smallImages.map((src, index) => {
              const actualIndex = (currentIndex + index + 1) % totalImages
              const isLastWithOverlay = index === smallImages.length - 1 && showOverlay

              return (
                <div
                  key={`${currentIndex}-${index}`}
                  className={styles.smallImageWrapper}
                  onClick={() => handleImageClick(actualIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageClick(actualIndex)
                    }
                  }}
                >
                  <img
                    src={src}
                    alt={`${alt} ${actualIndex + 1}`}
                    className={styles.image}
                    loading="lazy"
                  />
                  {isLastWithOverlay && (
                    <div className={styles.overlay}>
                      <span className={styles.count}>+{totalImages - 4}</span>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Пустые места, если изображений меньше 4 */}
            {Array.from({ length: emptySlotsCount }).map((_, index) => (
              <div key={`empty-${index}`} className={styles.smallImageWrapperEmpty} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
