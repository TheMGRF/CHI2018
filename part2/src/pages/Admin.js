import React from 'react';
import Login from "../authentication/Login";
import Update from "../authentication/Update";

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            email: "",
            password: "",
            page: 1,
            pageSize: 8,
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
            this.handleLogoutClick();
        }
    }

    handleLogoutClick = () => {
        this.setState({authenticated: false})
        localStorage.removeItem('token');
    }

    loginCallback = (data) => {
        console.log(data)
        if (data.status === 200) {
            const {token} = data;
            this.setState({authenticated: true, token: token});
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

    /**
     * Handle clicking the previous page button to update
     * the object state to go backwards
     */
    handlePreviousClick = () => {
        this.setState({page: this.state.page - 1})
    }

    /**
     * Handle clicking the next page button to update
     * the object state to go forward
     */
    handleNextClick = () => {
        this.setState({page: this.state.page + 1})
    }

    render() {
        let filteredData = this.state.data;

        let noOfPages = Math.ceil(filteredData.length / this.state.pageSize);
        if (noOfPages === 0) noOfPages = 1;
        let disabledPrevious = (this.state.page <= 1);
        let disabledNext = (this.state.page >= noOfPages);

        let pageSize = this.state.pageSize;
        let page = this.state.page;

        let logInOut = <Login handleLoginClick={this.handleLoginClick} email={this.state.email}
                              password={this.props.password} handleEmail={this.handleEmail}
                              handlePassword={this.handlePassword}/>
        if (this.state.authenticated) {
            logInOut = <div>
                <button id="logout-btn" onClick={this.handleLogoutClick}>Log Out</button>
            </div>
        }

        return (
            <div>
                <h2 id="admin-title">Admin</h2>
                {logInOut}

                <br/>

                <div id="session-names-collection">
                    {
                        filteredData
                            .slice(((pageSize * page) - pageSize), (pageSize * page))
                            .map((details, id) => (
                                <SessionUpdater id={id} title={details.title}/>
                            ))
                    }

                    <div id="session-buttons">
                        <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
                        <span id="page-indicator">Page {this.state.page} of {noOfPages}</span>
                        <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({authenticated: true});
        }

        const url = "http://localhost/part1/api/content";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    }

}

class SessionUpdater extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({value: nextProps.title});
        }
    }

    render() {
        return (
            <div>
                <textarea
                    className="session-name-box"
                    key={this.props.id}
                    value={this.state.title}
                    onChange={event => this.setState({value: event.target.value})}
                    defaultValue={this.state.title}
                />
                <br/>
                <Update handleUpdateClick={this.handleUpdateClick}/>
            </div>
        )
    }

}