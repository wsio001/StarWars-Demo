import React, {useState, useContext} from 'react';
import "emoji-dictionary"
import "./Info.css"
const Starships = ({name}) => {
    const emoji = require("emoji-dictionary")

    return(
        <div className = "Info">
            <p>{emoji.getUnicode("rocket")+ " "+ name}</p>
        </div>
    )
}

export default Starships;