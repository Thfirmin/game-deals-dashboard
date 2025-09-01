import { Moon, Sun } from 'lucide-react'
import './style.css'
import { UseState, type UseStateReturn } from '@/lib/utils'

type ThemeSwitcherProps = {
  themeState: UseStateReturn<"light" | "dark">;
}

export default function ThemeSwitcher({ themeState }: ThemeSwitcherProps) {
  const themeIcon = UseState<"moon" | "sun">(themeState.get() === "light" ? "sun" : "moon");

  return (
    <div className="theme-switcher">
      <button className={`theme-switcher-circle-${themeIcon.get()}`} onClick={() => {
        themeState.set(themeState.get() === "light" ? "dark" : "light");
        themeIcon.set(themeIcon.get() === "moon" ? "sun" : "moon");
      }}>
        {
          themeState.get() === "light"
            ? <Sun className='theme-switcher-icon-sun hover:cursor-pointer'/>
            : <Moon className='theme-switcher-icon-moon hover:cursor-pointer'/>
        }
      </button>
    </div>
  )
}