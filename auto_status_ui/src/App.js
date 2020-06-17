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
import Header from './components/header';
import ShowMailButton from './components/sendMail';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailBody: null,
      statusType: 'Daily',
      membersList: [],
      allQueriesList: [],
      isMailSent: false,    
      spinner : false,
      toastMessage : null,
      toastStatus : null,
      selectedCustomQuery : null
    }
    this.sendMail = this.sendMail.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.getStatusMailBody = this.getStatusMailBody.bind(this);
    this.canEnableSendButton = this.canEnableSendButton.bind(this);
    this.notify = this.notify.bind(this);
    this.getAllQueries = this.getAllQueries.bind(this);
    this.customQueryChange = this.customQueryChange.bind(this);
  }

  getStatusMailBody() {
    this.setState({ spinner : true });
    this.setState({ mailBody: null });
    const queryItem = this.state.allQueriesList.find(t => t.Id === this.state.selectedCustomQuery);
    const path = queryItem ? queryItem.Path : null;
    const url = `http://localhost:49569/api/status/get/?statusType=${this.state.statusType}&folderHierarchy=${path}`
    fetch(url)       
    .then(response => response.json())
    .then((data,error) => { 
      if (data) {
        this.setState({ mailBody: data.StatusHtml });
        this.setState({ membersList: data.MembersList,spinner : false });
      }
     });
  }
  
  getAllQueries() {
    this.setState({ spinner : true });
    fetch('http://localhost:49569/api/status/getallqueries')       
    .then(response => response.json())
    .then((data,error) => { 
      if (data) {
        this.setState({ allQueriesList: data });
        this.setState({ selectedCustomQuery: data[0].Id});
        this.setState({ spinner : false });
      }
    });
  }

  sendMail() {
    this.setState({ spinner : true });
    fetch('http://localhost:49569/api/status/sendMail', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.mailBody)
    })       
    .then(response => response.json())
    .then((data) => { 
      this.setState({ spinner : false });
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

  notify(membersList){
    this.setState({ spinner : true });
    fetch('http://localhost:49569/api/status/notifyUser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(membersList)
    })       
    .then(response => response.json())
    .then((data) => { 
      this.setState({ spinner : false });
      if(data) {
        this.setState({
          toastMessage : "😀 Notified User/s Successfully.",
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

  statusChange(event) {
    this.setState({statusType: event.target.value});
    if (event.target.value === 'Custom' && this.state.allQueriesList.length === 0) {
      this.getAllQueries();
    }
  }

  customQueryChange(event) {
    this.setState({selectedCustomQuery: event.target.value});
  }

  canEnableSendButton() {    
    let canEnable = false;
    if (this.state.mailBody) 
    canEnable = true;
     return canEnable;
  }

  render() {
    const canEnableSendButton=this.canEnableSendButton();
    return (
      <div>
        <Header />
        <div className="main">
          <div className="px-4">
            <Actions statusType={this.state.statusType} statusTypeChange={this.statusChange}
              runQuery={this.getStatusMailBody} sendMail={this.sendMail} 
              getAllQueries={this.getAllQueries} 
              allQueriesList={this.state.allQueriesList} customQueryChange={this.customQueryChange}
              selectedCustomQuery = {this.state.selectedCustomQuery}/>

            <div className="row">
              <div className="col-9 col-centered">
                <MailBody html={this.state.mailBody} />
                {canEnableSendButton?<ShowMailButton/>:null}
              </div>
              <div className="col-3">
                <Users membersList={this.state.membersList} notifyUser={this.notify} notifyAll = {this.notify}/>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.spinner &&
          <SpinnerPage></SpinnerPage>
        }
        <Toaster message = {this.state.toastMessage} status = {this.state.toastStatus} />
      </div>
    );
  }
}
