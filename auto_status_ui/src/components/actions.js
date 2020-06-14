import React from 'react';
import './actions.css';

const actions = (props) => {


    return (
        <div className="pt-3">
            <div>
                <div >

                    <span className="dropdown">
                        <select className="btn actions-btn dropdown-toggle" value={props.statusType} onChange={props.statusTypeChange}>
                            <option className="dropdown-item" value="Daily">Daily</option>
                            <option className="dropdown-item" value="Monthly">Monthly</option>
                            <option className="dropdown-item" value="Custom">Custom</option>
                        </select>
                    </span>

                    {props.statusType === 'Custom' && props.allQueriesList && props.allQueriesList.length > 0 ?
                        <span className="dropdown">
                            <select className="ml-2 btn actions-btn dropdown-toggle" value={props.selectedCustomQuery} onChange={props.customQueryChange}>
                                { props.allQueriesList.map(t =>
                                    <option className="dropdown-item" value={t.Id}>{t.Name}</option>
                                )}
                            </select>
                        </span> : null
                    }

                    {/* <button onClick={props.getAllQueries} className="ml-2 btn actions-btn">Get All Queries</button> */}
                    <button onClick={props.runQuery} className="ml-2 btn actions-btn">Execute Query</button>
                    <button onClick={props.sendMail} className="ml-2 btn actions-btn"
                        disabled={!props.canEnableSendButton}>Send Mail</button>
                </div>
            </div>
        </div>
    )
}

export default actions;
