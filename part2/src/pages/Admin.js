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

    handleUpdateClick = (sessionId, title) => {
        const url = "http://localhost/part1/api/update"

        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            let json = {
                "token": token,
                "title": title,
                "sessionId": sessionId
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

        const authenticated = this.state.authenticated;

        let logInOut = <Login handleLoginClick={this.handleLoginClick} email={this.state.email}
                              password={this.props.password} handleEmail={this.handleEmail}
                              handlePassword={this.handlePassword}/>
        if (authenticated) {
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
                                <SessionUpdater
                                    id={id}
                                    key={id}
                                    admin={authenticated}
                                    contentId={details.contentId}
                                    title={details.title}
                                    handleUpdateClick={this.handleUpdateClick}
                                    postData={this.postData}
                                />
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

/**
 * Component for updating session titles through the API
 * Note: Due to the pagination and how React is handling
 * the updating the titles are automatically updated
 * on key presses but the update buttons will still
 * function to also send the API request to update too.
 */
class SessionUpdater extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            data: []
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({title: nextProps.title});
        }
    }

    render() {
        return (
            <div>
                <textarea
                    className="session-name-box"
                    key={this.props.id}
                    value={this.state.title}
                    onChange={event => this.setState({title: event.target.value})}
                />
                <br/>
                <Update admin={this.props.admin} handleUpdateClick={this.props.handleUpdateClick} sessionId={this.state.data.sessionId}/>
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/sessioncontent?contentId=" + this.props.contentId;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data[0]})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    }

}