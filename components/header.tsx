import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 navbar bg-base-100 ">
    <div className="navbar-start flex-1">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">Reflect</span>
        </Link>

      <div className="flex flex-1 items-center justify-end space-x-2">
        <button className='btn btn-secondary'>Log in</button>
      </div>
    </div>
  </header>
  )
}

export default Header