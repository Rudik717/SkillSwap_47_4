import sageBaby from '@/assets/sage/sage-baby.png'
import sageGuru from '@/assets/sage/sage-guru.png'
import sageMentor from '@/assets/sage/sage-mentor.png'
import sageStudent from '@/assets/sage/sage-student.png'
import clsx from 'clsx'

import styles from './SageAvatar.module.css'
import type { TAvatarProps } from './type'

export const SageLevel = {
  BABY: 1,
  STUDENT: 2,
  MENTOR: 3,
  GURU: 4,
} as const

const SAGE_CONFIG = {
  [SageLevel.BABY]: {
    src: sageBaby,
    title: 'Новичок',
  },
  [SageLevel.STUDENT]: {
    src: sageStudent,
    title: 'Ученик',
  },
  [SageLevel.MENTOR]: {
    src: sageMentor,
    title: 'Ментор',
  },
  [SageLevel.GURU]: {
    src: sageGuru,
    title: 'Гуру',
  },
}

export const SageAvatar = ({ level }: TAvatarProps) => {
  const config = SAGE_CONFIG[level]
  const frameClass = {
    [SageLevel.BABY]: styles.frameBaby,
    [SageLevel.STUDENT]: styles.frameStudent,
    [SageLevel.MENTOR]: styles.frameMentor,
    [SageLevel.GURU]: styles.frameGuru,
  }[level]
  return (
    <div className={clsx(styles.baseContainer, frameClass)}>
      <img src={config.src} alt={config.title} className={styles.image} />
      <div className={styles.title}>{config.title}</div>
    </div>
  )
}
