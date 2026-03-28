import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '20px' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
