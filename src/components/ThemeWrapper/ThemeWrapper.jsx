import React, { useState, useEffect } from 'react'
import { ThemeContext, themes } from '../../contexts/ThemeContext'

export default ThemeWrapper = (props) => {
    const [theme, setTheme] = useState(themes.light)

    function changeTheme(theme) {
        setTheme(theme)
    }

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.style.backgroundColor = 'white-content'
                break
            case themes.dark:
            default:
                document.body.style.backgroundColor = 'black-content'
                break
        }
    }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
        {props.children}
    </ThemeContext.Provider>
  )
}
