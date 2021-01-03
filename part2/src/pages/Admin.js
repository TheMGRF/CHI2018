import React from 'react';

export default class Admin extends React.Component {

    state = {"email": "john@example.com", "password": "top_secret!"}

    handleLoginClick = () => {
        let myJSON = {"email": this.state.email, "password": this.state.password};

        const url = "http://localhost/part1/api/login"
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(myJSON)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                    console.log("something went wrong ", err)
                }
            );
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <button onClick={this.handleLoginClick} disabled={false}>Log in</button>
            </div>
        );
    }

}