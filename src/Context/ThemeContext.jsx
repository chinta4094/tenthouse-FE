
import React, {createContext} from 'react'

export const ThemeContext = createContext()

export default function ThemeContextd({ theme, handleThemeChange }) {
    return (
        <div>
            <span onClick={handleThemeChange}>{theme}</span>
        </div>
    )
}