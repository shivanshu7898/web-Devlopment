import React from 'react'
import logo from '../assets/transparentLogoLight-De2Z7I01.png'

function Header() {
  return (
    <header className="bg-white shadow-sm  bg-amber-600">
      <nav className="flex items-center justify-between  bg-amber-600">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Cravings logo" className="w-25" />
      
        </div>

        <div className="">
      <button className="text-white border border-transparent  text-lg hover:border-white-50 transition-all" >login</button>
      <button className="text-white text-lg bg-amber-600">Register</button>
        </div>
      </nav>
    </header>
  )
}

export default Header; 