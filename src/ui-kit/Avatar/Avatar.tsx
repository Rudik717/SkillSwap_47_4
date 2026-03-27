import styles from './Avatar.module.css'

type AvatarSize = 'sm' | 'md' | 'lg'

type Props = {
  url: string
  alt?: string
  size?: AvatarSize
}

const sizeMap = {
  sm: 48, // для хедера
  md: 100, // для карточек навыков (по умолчанию)
  lg: 244, // для личного кабинета
}

export const Avatar = ({ url, alt = 'User avatar', size = 'md' }: Props) => {
  const pixelSize = sizeMap[size]

  return (
    <div className={styles.avatar} style={{ width: pixelSize, height: pixelSize }}>
      <img src={url} alt={alt} className={styles.image} />
    </div>
  )
}
