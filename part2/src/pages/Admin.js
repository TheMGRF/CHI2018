import React from 'react';
import Login from "../authentication/Login";
import SessionUpdater from "../sessions/SessionUpdater";

export default class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            admin: -1,
            email: "",
            password: "",
            page: 1,
            pageSize: 4,
            query: "",
            data: []
        }

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

    handleLogoutClick = () => {
        this.setState({authenticated: false, admin: 0})
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }

    loginCallback = (data) => {
        console.log(data)
        if (data.status === 200) {
            const {token} = data;
            this.setState({authenticated: true, admin: data.admin, token: token});
            localStorage.setItem("token", token)
            if (data.admin > 0) {
                localStorage.setItem("admin", data.admin);
            }
        }
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    render() {
        let data = this.state.data;

        const authenticated = this.state.authenticated;
        const admin = localStorage.getItem("admin");

        let logInOut = <Login handleLoginClick={this.handleLoginClick} email={this.state.email}
                              password={this.props.password} handleEmail={this.handleEmail}
                              handlePassword={this.handlePassword}/>
        let editable = null;

        if (authenticated === true) {
            logInOut = <div>
                <button id="logout-btn" onClick={this.handleLogoutClick}>Log Out</button>
            </div>
            editable = <div id="session-names-collection">
                {
                    data.map((details, id) => (
                        <SessionUpdater
                            id={id}
                            key={id}
                            authenticated={authenticated}
                            admin={admin >= 0 ? 1 : 0}
                            sessionId={details.sessionId}
                            name={details.name}
                            handleLogoutClick={this.handleLogoutClick}
                            postData={this.postData}
                        />
                    ))
                }
            </div>
        }

        return (
            <div>
                <h2 id="admin-title">Admin</h2>
                {logInOut}

                <br/>

                {editable}
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({authenticated: true});

            const url = "http://localhost/part1/api/sessions";

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    this.setState({data: data.data});
                })
                .catch((err) => {
                    console.log("Something went wrong: ", err)
                })
        }
    }

    /**
     * When the component will unmount.
     * Fixes "Warning: Can't perform a React state update on an unmounted component"
     */
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}