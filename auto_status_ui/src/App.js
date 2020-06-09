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
      isMailSent: false,
      statusType: 'Daily'
    }
    // this.getMailBody = this.getMailBody.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.getStatusMailBody = this.getStatusMailBody.bind(this);
    this.canEnableSendButton = this.canEnableSendButton.bind(this);
  }

  // getMailBody() {
  //   fetch('http://localhost:49569/api/status/get')       
  //   .then(response => response.json())
  //   .then((data) => { 
  //     this.setState({ mailBody: data.StatusHtml });
  //     this.setState({ membersList: data.MembersList });
  //    });
  // }

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

  getStatusMailBody() {
    fetch('http://localhost:49569/api/status/get' + '?statusType=' + this.state.statusType)       
    .then(response => response.json())
    .then((data) => { 
      if (data) {
        this.setState({ mailBody: data.StatusHtml });
        this.setState({ membersList: data.MembersList });
      }
     });
  }


  statusChange(event) {
    this.setState({statusType: event.target.value});
  }

  canEnableSendButton() {    
    let canEnable = false;
    if (this.state.mailBody) 
    canEnable = true;
     return canEnable;
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="px-4">
          <Actions statusType={this.state.statusType} statusTypeChange={this.statusChange}
            runQuery={this.getStatusMailBody} sendMail={this.sendMail} canEnableSendButton={this.canEnableSendButton()} />

          <div className="row">
            <div className="col-9">
              <MailBody html={this.state.mailBody} />
            </div>
            <div className="col-3">
              <Users membersList={this.state.membersList} notifyUser={this.notifyUser} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
