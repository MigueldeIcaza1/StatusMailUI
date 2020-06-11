import React, { Component } from 'react';
import './App.css';
import Actions from './components/actions';
import MailBody from './components/mailBody';
import  Users from './components/users';
import 'reactjs-toastr/lib/toast.css';
import SpinnerPage from './components/spinnerPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toaster from "./components/toaster";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailBody: null,
      membersList: [],
      isMailSent: false,
      statusType: 'Daily',
      spinner : false,
      toastMessage : null,
      toastStatus : null
    }
    // this.getMailBody = this.getMailBody.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.getStatusMailBody = this.getStatusMailBody.bind(this);
    this.canEnableSendButton = this.canEnableSendButton.bind(this);
    this.notifyAll = this.notifyAll.bind(this);
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
        this.setState({
          toastMessage : "😀 Mail sent successfully.",
          toastStatus : 'Success'
        })
      } else {
          this.setState({
            toastMessage : ":-( Something went wrong while sending mail.",
            toastStatus : 'Error'
        })
      }
     });
  }

  notifyUser(mailAddress) {
    fetch('http://localhost:49569/api/status/notifyUser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([mailAddress])
    })       
    .then(response => response.json())
    .then((data) => { 
     // this.setState({ isMailSent: data });
      if(data) {
          this.setState({
            toastMessage : "😀 Notified User Successfully.",
            toastStatus : 'Success'
          })
      } else {
          this.setState({
            toastMessage : ":-( Something went wrong while sending mail.",
            toastStatus : 'Error'
        })
      }
     });
  }

  notifyAll(membersList){
    fetch('http://localhost:49569/api/status/notifyUser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(membersList)
    })       
    .then(response => response.json())
    .then((data) => { 
      if(data) {
        this.setState({
          toastMessage : "😀 Notified Users Successfully.",
          toastStatus : 'Success'
        })
      } else {
          this.setState({
            toastMessage : ":-( Something went wrong while sending mail.",
            toastStatus : 'Error'
          })
        }
     });
  }

  getStatusMailBody() {
    this.setState({
        spinner : true 
    })
    fetch('http://localhost:49569/api/status/get/?statusType=' + this.state.statusType)       
    .then(response => response.json())
    .then((data,error) => { 
      if (data) {
        this.setState({ mailBody: data.StatusHtml });
        this.setState({ membersList: data.MembersList,spinner : false },()=>{
          console.log(this.state.membersList);
        });
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
      <div>
        <div className="main">
          <div className="px-4">
            <Actions statusType={this.state.statusType} statusTypeChange={this.statusChange}
              runQuery={this.getStatusMailBody} sendMail={this.sendMail} canEnableSendButton={this.canEnableSendButton()} />

            <div className="row">
              <div className="col-9">
                <MailBody html={this.state.mailBody} />
              </div>
              <div className="col-3">
                <Users membersList={this.state.membersList} notifyUser={this.notifyUser} notifyAll = {this.notifyAll}/>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.spinner &&
          <SpinnerPage></SpinnerPage>
        }
        {/* <ToastContainer /> */}
        <Toaster message = {this.state.toastMessage} status = {this.state.toastStatus} />
      </div>
    );
  }
}
