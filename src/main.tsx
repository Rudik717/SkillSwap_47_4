import 'modern-normalize/modern-normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app/App.tsx'
import './index.css'
import { store } from './store/root.ts'

// MSW
async function enableMocking() {
  // ВАЖНО: dev + флаг
  const shouldMock = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true'

  if (!shouldMock) return

  const { worker } = await import('./mocks/browser')

  await worker.start({
    onUnhandledRequest: 'bypass',
  })
}

// 🔥 ВАЖНО: сначала MSW, потом React
async function bootstrap() {
  await enableMocking()

  const root = createRoot(document.getElementById('root')!)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

bootstrap()
