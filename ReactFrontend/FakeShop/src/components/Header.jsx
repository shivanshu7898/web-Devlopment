import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="flex justify-between  p-3.5 bg-black text-white">
      <h1 className="text-2xl">Shopping</h1>
      <nav className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Product</Link>
      </nav>
    </header>
  )
}

export default Header
