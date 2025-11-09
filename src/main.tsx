import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ToastLayout from './Components/SharedComponents/ToastLayout/ToastLayout.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.tsx'
import { AuthProvider } from './AuthContext/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastLayout>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </ToastLayout>
  </StrictMode>,
)
