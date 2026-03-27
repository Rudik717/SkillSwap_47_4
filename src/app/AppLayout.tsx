import { Footer, Header } from '@/widgets'
import { Outlet } from 'react-router-dom'

import styles from './AppLayout.module.css'

export const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
