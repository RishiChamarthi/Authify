import { NavBar, Hero } from '../components/allComponents.js'

function HomePage() {
  return (
    <div>
      <NavBar />

      {/* This is for header */}
      <div className='mt-[59px]'></div>

      {/* This is Hero Section */}
      <Hero/>

    </div>
  )
}

export default HomePage
