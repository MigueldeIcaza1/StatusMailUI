import React, { Component } from 'react';
import Header from './header';
import SpinnerPage from './spinnerPage';
import Toaster from "./toaster";
import history from '../history';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            configurations: [],
            isEditMode: false,
            editedConfigurations: [],
            spinner : false,
            toastMessage : null,
            toastStatus : null,
        };
        this.pascalise = this.pascalise.bind(this);
        this.configurationChange = this.configurationChange.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        this.setState({ spinner : true });
        fetch('http://localhost:49569/api/status/getconfigurations')
            .then(response => response.json())
            .then(data => {
                let list = [];
                if (data) {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key];
                            list.push({ key: key, value: element });
                        }
                    }
                    this.setState({ configurations: list });
                    this.setState({ spinner : false });
                }
            });
    }

    pascalise(str) {
        return str.replace(/\w+(.)/g,
            function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); });
    }

    configurationChange(index, event) {
        var configurations = this.state.configurations.slice();
        configurations[index].value = event.target.value;
        configurations[index].isChanged = true;
        this.setState({ configurations: configurations });
    }

    edit() {
        this.setState({ isEditMode: true });
    }

    back() {
        return history.push('/Home');
    }

    save() {
        this.setState({ spinner : true });
        let editedList = this.state.configurations.filter(t => t.isChanged === true);

        fetch('http://localhost:49569/api/status/saveConfigutaions', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedList)
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    this.setState({ isEditMode: false, spinner : false, toastMessage : "Settings updated successfully!", toastStatus : 'Success'});
                }
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="row no-gutters">
                    <div className="col-3">
                        <button onClick={this.back} className="btn actions-btn">Back</button>
                    </div>
                    <div className="col-6">
                        <div className="d-flex pt-3">
                            <h4 className="px-5 col-10">Settings</h4>
                            {!this.state.isEditMode && <button className="btn btn-primary h-100" onClick={() => this.edit()}> Edit</button>}
                        </div>
                        {
                            !this.state.isEditMode && this.state.configurations && this.state.configurations.map((item, index) => (
                                <div key={item.DisplayName} className="row px-5 pt-3 user-name-container">
                                    <span className="col align-self-center user-name">{this.pascalise(item.key)} </span>
                                    <span className="col"> {item.value} </span>
                                </div>
                            ))
                        }
                        {
                            this.state.isEditMode && this.state.configurations && this.state.configurations.map((item, index) => (
                                <div key={item.DisplayName} className="row px-5 pt-3">
                                    <span className="col-5 align-self-center user-name">{this.pascalise(item.key)} </span>
                                    <input type="text" className="form-control col"
                                        onChange={this.configurationChange.bind(this, index)} value={item.value} />
                                </div>
                            ))
                        }
                        {
                            this.state.isEditMode && <div className="row justify-content-md-center"><button onClick={this.save} className="btn actions-btn">Save</button></div>
                        }
                    </div>
                    <div className="col-3"></div>
                </div>
                {
                    this.state.spinner &&
                    <SpinnerPage></SpinnerPage>
                }
                <Toaster message={this.state.toastMessage} status={this.state.toastStatus} />
            </div>
        )
    }
}

