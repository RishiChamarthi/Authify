import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { Link } from 'react-router-dom'
import { home } from '../assets/allAssets.js'

function Hero() {

  const {isLoggedIn, userData} = useContext(AppContext)

  return (
    <section className="bg-white place-content-center h-[91vh]">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 flex items-center justify-center">
          <div className='flex flex-col md:flex-row max-w-[90vw] items-center justify-between gap-10'>
            {/* Content div */}
            <div className="md:w-1/2 text-left max-w-[500px]">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
                Welcome
                <strong className="text-indigo-600"> {isLoggedIn ? userData?.name || "Developer" : "Developer"} </strong>
              </h1>

              <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                This is just an authentication web app. In this you can verify your account and also reset your password.
                Explore the app.
              </p>

              <div className="mt-4 flex gap-4 sm:mt-6">
                <Link to={isLoggedIn ? "/" : "/register"} className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Image div */}
            <div className="md:w-1/2 max-lg:mt-8">
              <img src={home} className="block w-full aspect-71/50 max-lg:w-4/5 mx-auto object-cover" alt="login img" />
            </div>
          </div>

        </div>
      </section>
  )
}

export default Hero
