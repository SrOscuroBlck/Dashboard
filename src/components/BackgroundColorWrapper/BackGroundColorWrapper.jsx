import React, { useState } from 'react'
import {
    BackgroundColorContext,
    backgroundColors,
} from '../../contexts/BackgroundColorContext'

export default BackGroundColorWrapper = (props) => {
    const [bgColor, setBgColor] = useState(backgroundColors.blue)
    function changeColor(color) {
        setBgColor(color)
    }
    return (
        <BackgroundColorContext.Provider value={{ bgColor, changeColor }}>
            {props.children}
        </BackgroundColorContext.Provider>
    )
}
