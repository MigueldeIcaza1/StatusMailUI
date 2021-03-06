import React from 'react';
import './users.css';

const users = (props) => {

      const pascalise = function pascalise(str) {
        return str.replace(/\w+(.)/g,
            function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
      }

      return (
        <div className="user-container">
            <div>
                {
                  props.membersList && props.membersList.length > 0 &&
                  <div>
                    <button className="btn btn-primary row text-center notify" onClick = {()=>props.notifyAll(props.membersList)}> Notify All</button>
                  </div>
                } 
               
                {
                  props.membersList && props.membersList.map((item, index) => (
                    <div key={item.DisplayName} className="row px-5 pt-3 user-name-container">
                      <span className="col-7 align-self-center user-name">{pascalise(item.DisplayName)} </span>
                      <span className="col">
                          <button  disabled={item.IsStatusFilled} className="btn btn-outline-primary" onClick={() => props.notifyUser([item])}>Notify</button>
                      </span>
                    </div>
                  ))
                }
            </div>

{/* <nav class="navbar bg-light">
  <ul class="navbar-nav">
    <li class="nav-item">
              {props.membersList.map((item, index) => (
                  <div className="row">  
                    <span className="col">{pascalise(item.DisplayName)} </span>
                    <span className="col"><button class="btn btn-outline-info my-2 my-sm-0 notify-btn">Notify</button></span>
                  </div>
                ))}
    </li>
  </ul>
</nav> */}



        </div>
    )

}

export default users;
