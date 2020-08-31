import React, {useState, useContext} from 'react';
import "./Info.css"

const Species = ({name}) => {
    return(
        <div className = "Info">
            <p>Species: {name}</p>
        </div>
    )
}

export default Species;