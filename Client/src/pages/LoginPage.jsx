import { NavBar, LoginForm } from '../components/allComponents'

function LoginPage() {
  return (
    <div>
      <NavBar />
      
      {/* This is for header */}
      <div className='mt-[60px]'></div>

      {/* Login form */}
      <LoginForm />
      
    </div>
  )
}

export default LoginPage
