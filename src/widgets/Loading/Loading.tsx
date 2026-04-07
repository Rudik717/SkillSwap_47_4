import { Spinner } from '@/ui-kit'

import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spinner />
      Загрузка...
    </div>
  )
}
