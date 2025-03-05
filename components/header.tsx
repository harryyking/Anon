import React from 'react'

const Header = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
    <a className="text-xl">Anon</a>
    </div>

    <div className="flex-none">
     <button className="btn btn-secondary">Get Started</button>
    </div>
  </nav>
  )
}

export default Header