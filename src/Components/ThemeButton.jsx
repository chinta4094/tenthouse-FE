import { useContext } from 'react'
import { ThemeContext } from '../Dashboard'


export default function ThemeButton() {
    const { theme, handleThemeChange } = useContext(ThemeContext)
    return (
        <div className={theme === 'Black' ? 'theme-white' : 'theme-black'}> 
            <span style={{ cursor: 'pointer' }} onClick={handleThemeChange}>{theme}</span>
        </div>
    )
}