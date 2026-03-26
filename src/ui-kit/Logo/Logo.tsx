import styles from './Logo.module.css'
import starIcon from './Star.svg'

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.circle}>
        <img src={starIcon} alt="star" className={styles.star} />
      </div>
      <span className={styles.text}>SkillSwap</span>
    </div>
  )
}
