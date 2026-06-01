import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import { LoadingProvider } from './contexts/LoadingContext'
import Loader from './components/Loader'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <LoadingProvider>
        <Loader />
        <App />
      </LoadingProvider>
    </ErrorBoundary>
  </StrictMode>,
)
