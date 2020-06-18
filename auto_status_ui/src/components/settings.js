import React, { Component } from 'react';
import Header from './header';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            configurations: [],
        };
        this.pascalise = this.pascalise.bind(this);
    }

    componentDidMount() {
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
                }
            });
    }
    
    pascalise(str) {
        return str.replace(/\w+(.)/g,
            function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
    }
    
    render() {
        return (
            <div>
                <Header />
                <div className="row no-gutters">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <h4 className="pt-3 px-5">Settings</h4>
                        {
                            this.state.configurations && this.state.configurations.map((item, index) => (
                                <div key={item.DisplayName} className="row px-5 pt-3 user-name-container">
                                    <span className="col align-self-center user-name">{this.pascalise(item.key)} </span>
                                    <span className="col"> {item.value} </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        )
    }
}

