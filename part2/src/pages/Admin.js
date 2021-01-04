import React from 'react';

export default class Admin extends React.Component {

    state = {"email": "john@example.com", "password": "johnpassword"}

    postData = (url, myJSON) => {
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

    handleLoginClick = () => {
        const url = "http://localhost/part1/api/login"
        let json = {"email": this.state.email, "password": this.state.password};
        this.postData(url, json);
    }

    handleUpdateClick = () => {
        const url = "http://localhost/part1/api/update"
        let json = {
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6IkpvaG4iLCJpYXQiOjE2MDk3MTk2ODgsImV4cCI6MTYwOTcyMzI4OH0.SShCLwpEqNOvjEZp-H8oFOegjNkcnnv5JFgTMN9DRGA",
            "title": "Gender",
            "sessionId": 2375
        };

        this.postData(url, json);
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <button onClick={this.handleLoginClick} disabled={false}>Log in</button>
                <button onClick={this.handleUpdateClick} disabled={false}>Update</button>
            </div>
        );
    }

}