import { NavBar, RegisterForm } from '../components/allComponents.js'

function Registerpage() {
  return (
    <div>
      <NavBar />
      
      {/* This is for header */}
      <div className='mt-[60px]'></div>

      {/* Register Form */}
      <RegisterForm />
      
    </div>
  )
}

export default Registerpage
