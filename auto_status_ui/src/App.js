import React, { Component } from 'react';
import './App.css';
import Actions from './components/actions';
import MailBody from './components/mailBody';
import  Header from './components/header';
import  Users from './components/users';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailBody: null,
      membersList: [],
      isMailSent: false
    }
    this.getMailBody = this.getMailBody.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
  }

  getMailBody() {
    fetch('http://localhost:49569/api/status/get')       
    .then(response => response.json())
    .then((data) => { 
      this.setState({ mailBody: data.StatusHtml });
      this.setState({ membersList: data.MembersList });
     });
  }

  sendMail() {
    fetch('http://localhost:49569/api/status/sendMail', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.mailBody)
    })       
    .then(response => response.json())
    .then((data) => { 
      this.setState({ isMailSent: data });
      if(this.state.isMailSent) {
       //  toastr.success('Mail sent successfully!', '', { displayDuration:3000 })
      } else {
       // toastr.erroor('Something went wrong while sending mail', 'Failed', { displayDuration:3000 })
      }
     });
  }

  notifyUser(mailAddress) {
    fetch('http://localhost:49569/api/status/notifyUser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mailAddress)
    })       
    .then(response => response.json())
    .then((data) => { 
     // this.setState({ isMailSent: data });
      if(data) {
       //  toastr.success('Mail sent successfully!', '', { displayDuration:3000 })
      } else {
       // toastr.erroor('Something went wrong while sending mail', 'Failed', { displayDuration:3000 })
      }
     });
  }

  render() {
    return (
      <div className="main">
         <Header/>
         <div className="px-4">
            <Actions runQuery={this.getMailBody} sendMail={this.sendMail} />
            {/* <div>
              <MailBody html={this.state.mailBody} /> 
              <Users membersList= {this.state.membersList} />
            </div> */}

            <div className="row">
              <div className="col-9">
                <MailBody html={this.state.mailBody} />
              </div>
              <div className="col-3">
                <Users membersList={this.state.membersList} notifyUser={this.notifyUser}/>
              </div>
          </div>  

         </div>
      </div>
    );
  }
}
