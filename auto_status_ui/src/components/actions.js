import React from 'react';
import './actions.css';

const actions = (props) => {

    return (
        <div className="pt-3">
            <div>
                <div >

                    <span className="dropdown"> 
                    {/* className="dropdown-menu" */}
                        <select value="Daily" onChange={() => {}}>
                            <option className="dropdown-item" value="Daily">Daily</option>
                            <option className="dropdown-item" value="Monthly">Monthly</option>
                            <option className="dropdown-item" value="Custom">Custom</option>
                        </select>
                    </span>

                <button onClick={props.runQuery} className="btn actions-btn">Execute Query</button>
                <button onClick={props.sendMail} className="ml-2 btn actions-btn">Send Mail</button>
                </div>
            </div>
        </div>
        )
}

export default actions;
