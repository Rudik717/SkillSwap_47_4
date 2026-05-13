import 'modern-normalize/modern-normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app/App'
import './index.css'
import { worker } from './mocks/browser'
import { store } from './store/root'

async function prepareApp() {
  if (import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      waitUntilReady: true,
    })
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

prepareApp()
