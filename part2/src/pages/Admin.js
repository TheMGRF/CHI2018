import React from 'react';
import Login from "../authentication/Login";
import SessionUpdater from "../sessions/SessionUpdater";

/**
 * Admin class for handling the login component, API
 * endpoints for login and the listing and updating
 * of session names.
 */
export default class Admin extends React.Component {

    /**
     * Constructor to create the class, set the default
     * state values and bind the handling of the
     * update click method.
     *
     * @param props The properties associated with the class
     */
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
            mounted: false,
            data: []
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    /**
     * Post data method call to send the API call.
     *
     * @param url The URL endpoint
     * @param json The JSON data to send
     * @param callback The callback to associate with the call
     */
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

    /**
     * Handle the clicking of the login button to send the API
     * call to log the user in with their entered email and
     * password.
     */
    handleLoginClick = () => {
        const url = "http://unn-w18013094.newnumyspace.co.uk/chi2018/part1/api/login"
        let json = {"email": this.state.email, "password": this.state.password};
        this.postData(url, json, this.loginCallback);
    }

    /**
     * Handle the clicking of the logout button and subsequently
     * remove the states, tokens, and admin tags from local storage.
     */
    handleLogoutClick = () => {
        this.setState({authenticated: false, admin: 0})
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }

    /**
     * The callback method for handling the login endpoint
     * return and updating the class states and local storage.
     *
     * @param data The data returned by the API endpoint
     */
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

    /**
     * Handle the input of the password passing in
     * the event value.
     *
     * @param e The event to pass
     */
    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    /**
     * Handle the input of the email passing in
     * the event value.
     *
     * @param e The event to pass
     */
    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        if (this.state.mounted === false) {
            this.mount();
        }

        let data = this.state.data;

        // Store authentication and admin values for repeat usage
        const authenticated = this.state.authenticated;
        const admin = localStorage.getItem("admin");

        let logInOut = <Login handleLoginClick={this.handleLoginClick} email={this.state.email}
                              password={this.props.password} handleEmail={this.handleEmail}
                              handlePassword={this.handlePassword}/>
        let editable = null;

        // If the user is authenticated go ahead with showing logout and sessions
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
            <div id="admin-content">
                <h2 id="admin-title">Admin</h2>
                {logInOut}

                <br/>

                {editable}
            </div>
        );
    }

    /**
     * Method for handling when the component mounts and
     * fetching session data from the API.
     */
    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({authenticated: true});

            this.mount();
        }
    }

    mount() {
        const url = "http://unn-w18013094.newnumyspace.co.uk/chi2018/part1/api/sessions";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data, mounted: true});
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
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