import React from 'react';
import Login from "../authentication/Login";
import Update from "../authentication/Update";

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {"authenticated": false, "email": "", "password": ""}

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    postData = (url, json, callback) => {
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(json)
        })
            .then((response) => response.json())
            .then((data) => {
                callback(data)
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                }
            );
    }

    handleLoginClick = () => {
        const url = "http://localhost/part1/api/login"
        let json = {"email": this.state.email, "password": this.state.password};
        this.postData(url, json, this.loginCallback);
    }

    handleUpdateClick = () => {
        const url = "http://localhost/part1/api/update"

        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            let json = {
                "token": token,
                "title": "Gender",
                "sessionId": 2375
            };
            this.postData(url, json, this.updateCallback);
        } else {
            this.setState({"authenticated": false})
        }
    }

    handleLogoutClick = () => {
        this.setState({"authenticated": false})
        localStorage.removeItem('token');
    }

    loginCallback = (data) => {
        console.log(data)
        if (data.status === 200) {
            const {token} = data;
            this.setState({"authenticated": true, "token": token});
            localStorage.setItem("token", token)
        }
    }

    updateCallback = (data) => {
        console.log(data)
        if (data.status !== 200) {
            this.handleLogoutClick();
        }
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    render() {
        let page = <Login handleLoginClick={this.handleLoginClick} email={this.state.email}
                          password={this.props.password} handleEmail={this.handleEmail}
                          handlePassword={this.handlePassword}/>
        if (this.state.authenticated) {
            page = <div>
                <Update handleUpdateClick={this.handleUpdateClick}/>
                <button onClick={this.handleLogoutClick}>Log Out</button>
            </div>
        }

        return (
            <div>
                <h1>Admin</h1>
                {page}
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({"authenticated": true});
        }
    }

}