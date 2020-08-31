import React from 'react';
import "./Info.css"

const Person = ({name, height, weight, hairColor, dateOfBirth}) => {
    return(
        <div className = "Info">
            <p style = {{fontSize:"25px"}}><b>Name: {name}</b></p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Hair Color: {hairColor}</p>
            <p>Date of Birth: {dateOfBirth}</p>
        </div>
    )
}

export default Person;
