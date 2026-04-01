import { Footer, Header } from '@/widgets'
import { Outlet } from 'react-router-dom'

import styles from './AppLayout.module.css'

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
