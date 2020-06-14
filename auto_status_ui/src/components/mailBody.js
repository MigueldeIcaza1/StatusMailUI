import React from 'react';

const mailBody = (props) => {

   //  let html = '<b>hi... I am HTML!!!</b>'

    return (
       <div className="mail-body py-3">
            <div 
               dangerouslySetInnerHTML={{__html: props.html}}
            />
       </div>
        )
}

export default mailBody;