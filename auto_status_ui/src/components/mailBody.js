import React from 'react';
import './mailBody.css';

const mailBody = (props) => {

   // let html = '<b>hi... I am HTML!!!</b>'

   const getDate = () => {
      var today = new Date();
      let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
      let time = today.getHours() + ":" + today.getMinutes();
      let dateTime = days[today.getDay()] + ' ' + date + ' ' + time;
      return dateTime;
   }

   return (
      <div className="p-2 mail-body">

         {props.mailInfo ? 
            <div className="pl-2 text-left mail-header">{props.mailInfo.Subject}</div> : null}
         <div>
            {props.mailInfo ?
               <form>
                  <div className="row">
                     <label className="col col-form-label label-font-size text-left pl-4 mt-n2">{getDate()}</label>
                  </div>

                  <div className="row pl-2">
                     <label className="col-1 col-form-label label-font-size">To:</label>
                     <label className="col-form-label col-sm-2 label-font-size pl-2">{props.mailInfo.ToMailAdress}</label>
                  </div>
                  <div className="row pl-2">
                     <label className="col-1 col-form-label label-font-size mt-n2">Cc:</label>
                     <label className="col-1 col-form-label label-font-size pl-2 mt-n2">{props.mailInfo.CcMailAdress}</label>
                  </div>
                 
               </form>
               : null}

             {props.mailInfo ?  <hr className="m-1"></hr> : null}
            <div className="px-4"
               dangerouslySetInnerHTML={{ __html: props.html }}
            />
         </div>

      </div>
   )
}

export default mailBody;