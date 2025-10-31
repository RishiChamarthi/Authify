import React from 'react'
import { HomePage, LoginPage, RegisterPage, VerifyAccount, ResetPassword } from './pages/allPages'
import { Route, Routes } from 'react-router-dom'
import { Toaster, toast } from 'sonner';



function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            padding: "12px 20px",
            width: "300px",
          }
        }}
      />
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/register' Component={RegisterPage}/>
        <Route path='/verify-account' Component={VerifyAccount}/>
        <Route path='/reset-password' Component={ResetPassword}/>
      </Routes>
    </div>
  )
}

export default App
