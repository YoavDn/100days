import React from 'react'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/main.css'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import { Analytics } from '@vercel/analytics/react'
const App = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <p className="font-mono text-gray-500">Loading..</p>
          </div>
        }
      >
        {useRoutes(routes)}
      </Suspense>
      <Analytics />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
