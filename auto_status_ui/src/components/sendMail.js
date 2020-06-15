import React from 'react';

const ShowMailButton = (props) => {
    return (
        <button onClick={props.sendMail} className="ml-2 btn actions-btn" id="showMailButton"
        >Send Mail</button>
        )
}

export default ShowMailButton;