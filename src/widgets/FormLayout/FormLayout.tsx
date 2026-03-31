import { type ReactNode } from 'react'

import styles from './FormLayout.module.css'

interface Props {
  title: ReactNode
  children: ReactNode
  infoBlock: ReactNode
}

export const FormLayout = ({ title, children, infoBlock }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div>{title}</div>
      <div className={styles.wrapperSection}>
        <section className={styles.section}>{children}</section>
        <section className={styles.section}>{infoBlock}</section>
      </div>
    </div>
  )
}
