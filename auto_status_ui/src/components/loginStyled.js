import React, { Component } from 'react'
import './loginStyled.css';
import history from '../history';

class loginStyled extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            isFormValid: true
        }
        this.userNameChange = this.userNameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    userNameChange(event) {
        this.setState({ userName: event.target.value });
    }

    passwordChange(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit() {
        if (this.isValid()) {
            return history.push('/Home');
        }
    }

    isValid() {
        if (this.state.userName.toLowerCase() === 'kantola' && this.state.password === '12345') {
            this.setState({ isFormValid: true });
            return true;
        } else {
            this.setState({ isFormValid: false });
            return false;
        }
    }

    render() {
        return (
            <div>
                <img className="wave" src={require("../Assets/wave.png")}/>
                <div className="container">
                    <div className="img">
			            <img src={require("../Assets/bg.svg")}/>
		            </div>
                    <div className="login-content">
                        <form>
                            <img src={require("../Assets/avathar.svg")}/>
                            <h4 className="title">Status Automation</h4>
                            <div className="input-div one">
                            <div className="i">
                                    <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <input type="text" placeholder="Username" className="input" value={this.state.userName}
                                onChange={this.userNameChange}/>
                            </div>
                            </div>
                            <div className="input-div pass">
                            <div className="i">
                                    <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" placeholder="Password" className="input"  value={this.state.password}
                                onChange={this.passwordChange}/>
                            </div>
                            </div>
                            <button type="submit" className="loginButton" onClick={this.onSubmit}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default loginStyled
