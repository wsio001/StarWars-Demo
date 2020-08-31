import React, {useState} from 'react';
import "emoji-dictionary"

const Films = ({title}) => {
    const emoji = require("emoji-dictionary")
    return(
        <div className = "Info">
            <p>{emoji.getUnicode("clapper")+ " "+ title}</p>
        </div>
    )
}

export default Films;