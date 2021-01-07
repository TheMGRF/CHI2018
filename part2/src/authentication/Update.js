import React from 'react';

export default class Update extends React.Component {

    constructor(props) {
        super(props);

        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }


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

    updateCallback = (data) => {
        console.log(data)
        if (data.status !== 200) {
            this.props.handleLogoutClick();
        }
    }

    render() {
        const admin = this.props.admin;

        console.log("Real Status: " + admin);

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

    componentDidMount() {
        console.log("Admin Status: " + this.props.admin);
    }
}