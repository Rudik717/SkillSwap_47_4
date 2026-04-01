import styles from './Avatar.module.css'

type AvatarProps = {
  url?: string
  alt?: string
  size?: number
}

export const Avatar = ({ url, alt = 'User avatar', size = 100 }: AvatarProps) => {
  if (!url) {
    return <div className={styles.emptyAvatar} style={{ width: size, height: size }}></div>
  }
  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      <img src={url} alt={alt} className={styles.image} />
    </div>
  )
}
