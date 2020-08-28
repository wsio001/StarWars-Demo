import React from 'react';

const Character = ({name, height, weight, hairColor, dateOfBirth, speciesInfo}) => {
    return(
        <div>
            <h1>About Me</h1> 
            <p>{name}</p>
            <p>{height}</p>
            <p>{weight}</p>
            <p>{hairColor}</p>
            <p>{dateOfBirth}</p>
            <p>{speciesInfo}</p>
        </div>
    )
}

export default Character;