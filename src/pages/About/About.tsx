import { Avatar, Logo } from '@/ui-kit'
import { useAnimationFrame } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import styles from './About.module.css'

const team: Array<{ name: string; avatar: string; link: string }> = [
  { name: 'Алексей', avatar: '/about/alex.jpg', link: 'https://github.com/AleksShatilin' },
  { name: 'Дарья', avatar: '/about/darya.jpg', link: 'https://github.com/Darya0807' },
  { name: 'Евгения', avatar: '/about/jenya.jpg', link: 'https://github.com/JaneMikh' },
  { name: 'Егор', avatar: '/about/egor.jpg', link: 'https://github.com/duncanpepperoni' },
  { name: 'Иван', avatar: '/about/ivan.jpg', link: 'https://github.com/vanyatyar' },
  { name: 'Наталья', avatar: '/about/natalia.jpg', link: 'https://github.com/Natalia-tech-del' },
  { name: 'Роман', avatar: '/about/roman.jpg', link: 'https://github.com/RomanPushK' },
  { name: 'Рудик', avatar: '/about/rudik.jpg', link: 'https://github.com/Rudik717' },
  { name: 'Светлана', avatar: '/about/sveta.jpg', link: 'https://github.com/s-vovk' },
  { name: 'Яна', avatar: '/about/yana.jpg', link: 'https://github.com/iana2806' },
]

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight)
    }

    const onAudioEnded = () => {
      audio.currentTime = 0
      audio.play()
    }

    const audio = new Audio('/about/about.mp3')
    audio.play()
    audio.addEventListener('ended', onAudioEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', onAudioEnded)
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (!containerRef.current || !contentRef.current) {
      return
    }

    const containerHeight = containerRef.current.offsetHeight
    const speed = 50
    const currentY = parseFloat(contentRef.current.style.top) || containerHeight
    let newY = currentY - (speed * delta) / 1000

    if (newY < -height) {
      newY = containerHeight
    }

    contentRef.current.style.top = `${newY}px`
  })

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content} ref={contentRef}>
        <Logo />
        <h1 className={styles.title}>В проекте принимали участие:</h1>

        <div>
          {team.map(({ avatar, name, link }) => (
            <Person {...{ avatar, name, link }} />
          ))}
        </div>

        <h2 className={styles.footer}>Данный проект выжил вопреки:</h2>
        <ul>
          <li>- 1000+ ошибок в консоли (большинство исправлено закрытием глаза);</li>
          <li>- Нескольким бессонным ночам из-за позиционирования одного дива;</li>
          <li>- Жесткому спору с Git (git push --force победил);</li>
          <li>- Дебаггингу методом “а давай перезагрузим компьютер”.</li>
        </ul>
        <h3>Статус: Работает. Почему — загадка даже для авторов. 😄</h3>
      </div>
    </div>
  )
}

type Props = {
  avatar: string
  name: string
  link: string
}

const Person = ({ avatar, name, link }: Props) => {
  return (
    <div className={styles.person}>
      <Avatar url={avatar} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <a href={link}>{link}</a>
      </div>
    </div>
  )
}
