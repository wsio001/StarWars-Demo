import React, {useState, useContext} from 'react';
import "./Info.css"
const Starships = ({name}) => {
    return(
        <div className = "Info">
            <p>{name}</p>
        </div>
    )
}

export default Starships;