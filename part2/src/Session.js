import React from 'react';

export class Session extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionId:1,
            name:"",
            typeId:"",
            roomId:"",
            chairId:"",
            slotId:"",
            data:[]
        }
    }

    render() {
        return (
            <div className="session">
                <p>ID: {this.state.data.sessionId}</p>
                <p>Name: {this.state.data.name}</p>
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/sessions?limit=1";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
                this.setState({data: data.data[0]})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };

}