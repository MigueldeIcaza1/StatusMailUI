import React from 'react';
import history from '../history';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
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
        // else {
        //     return history.push('/');
        // }
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
            <div className="row py-3 justify-content-center">
                <form>
                    {this.state.isFormValid === false ?
                        <div className="validation-msg" > Please provide valid credentials </div>
                        : null}
                    <div className="form-group">
                        <label htmlFor="userName">UserName</label>
                        <input type="text" className="form-control" id="userName" placeholder="Enter UserName"
                            value={this.state.userName} onChange={this.userNameChange} />
                        <small id="userIdHelp" className="form-text text-muted">Your project name</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                            value={this.state.password} onChange={this.passwordChange} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Login</button>
                </form>
            </div>
        )
    }
}
