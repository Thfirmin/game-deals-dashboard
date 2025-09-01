import { useEffect } from 'react'
import LogoIcon from './components/LogoIcon'
import { Link } from 'react-router-dom'
import ThemeSwitcher from './components/ThemeSwitcher'
import { UseState } from './lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  const themeState = UseState<"light" | "dark">(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  
  useEffect(() => {
    document.documentElement.setAttribute('class', themeState.get())
    localStorage.setItem('theme', themeState.get());
  }, [themeState]);

  return (
    <>
      <header id="app-header">
        <nav className='header__nav'>
          <Link to='/' className='header__logo'><LogoIcon /></Link>
          <ul className='nav__menu'>
            <Link to='/' className='nav__item' id='nav-home-item'><li className='nav__link'>Home</li></Link>
            <Link to='/dashboard' className='nav__item' id='nav-dashboard-item'><li className='nav__link'>Dashboard</li></Link>
            <Link to='/about' className='nav__item' id='nav-about-item'><li className='nav__link'>About</li></Link>
          </ul>
          <ThemeSwitcher themeState={themeState} />
        </nav>
      </header>

      <main id="app-main">{children}</main>

      <footer id="app-footer">
        <p className='body_text'>&copy; 2025 Game Deals Dashboard.</p>
        <p className='flex items-center justify-center gap-1 body_text'>
          Follow me on:
          <a className='link' href='https://github.com/Thfirmin'>Github<span className='text-muted'>,</span></a>
          <a className='link' href='https://linkedin.com/in/thfirmin'>LinkedIn<span className='text-muted'>,</span></a>
          <a className='link' href='https://medium.com/@thfirmin'>Medium</a>
        </p>
      </footer>
    </>
  )
}