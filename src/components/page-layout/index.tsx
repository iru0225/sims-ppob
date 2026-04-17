import clsx from "clsx"
import { useMemo } from "react"
import { Link, useLocation } from "react-router"

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  const showHeader = useMemo(() => {
    let show = true
    if (location.pathname === '/login' || location.pathname === '/register') {
      show = false
    }
    return show
  }, [location.pathname])

  return(
    <div className="w-full h-screen">
      {
        showHeader && (
          <header
            className='h-12.5 w-full border-b flex px-8 sticky top-0 bg-white z-10'
          >
            <div className="flex-1">
              <Link to='/' className='flex gap-2 justify-center items-center w-fit mt-2.5'>
                <img src='/images/Logo.png' alt='Logo image' className="w-8 h-8"/>
                <h3 className="text-xl text-black font-bold text-center no-underline">SIMS PPOB</h3>
              </Link>
            </div>
            <nav
              className='flex gap-4 justify-between items-center'
            >
              <Link to='/topup' className={
                clsx(
                  'text-sm text-gray-500 no-underline',
                  location.pathname === '/topup' && 'text-red-700'
                )
              }>Top Up</Link>
              <Link to='/transaction' className={
                clsx(
                  'text-sm text-gray-500 no-underline',
                  location.pathname === '/transaction' && 'text-red-700'
                )
              }>Transaction</Link>
              <Link to='/akun' className={
                clsx(
                  'text-sm text-gray-500 no-underline',
                  location.pathname === '/akun' && 'text-red-700'
                )
              }>Akun</Link>
            </nav>
          </header>
        )
      }
      {children}
    </div>
  )
}

export default PageLayout