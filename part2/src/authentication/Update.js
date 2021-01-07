import React from 'react';

/**
 * Update class to handle the updating of session names.
 *
 * @author Thomas Griffiths
 */
export default class Update extends React.Component {

    /**
     * Constructor to create the class and bind the
     * handling of the update click method.
     *
     * @param props The properties associated with the class
     */
    constructor(props) {
        super(props);

        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }

    /**
     * Method for handling the update click and sending the
     * update API endpoint with the user token.
     */
    handleUpdateClick() {
        const url = "http://localhost/part1/api/update"

        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            let json = {
                "token": token,
                "name": this.props.name,
                "sessionId": this.props.sessionId
            };
            this.postData(url, json, this.updateCallback);
        } else {
            this.props.handleLogoutClick();
        }
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
     * The callback to be ran when the API call runs.
     *
     * @param data The data returned by the API call
     */
    updateCallback = (data) => {
        console.log(data)
        if (data.status !== 200) {
            this.props.handleLogoutClick();
        }
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        const admin = this.props.admin;

        return (
            <div>
                {admin > 0 ?
                    <button id="update-btn" onClick={this.handleUpdateClick}>Update</button>
                    :
                    null
                }
            </div>
        )
    }
}