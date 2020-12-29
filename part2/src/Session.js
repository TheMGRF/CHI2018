import React from 'react';

export default class Session extends React.Component {

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
                <p>Session ID: {this.state.data.sessionId}</p>
                <p>Name: {this.state.data.name}</p>
                <p>Type ID: {this.state.data.typeId}</p>
                <p>Room ID: {this.state.data.roomId}</p>
                <p>Chair ID: {this.state.data.chairId}</p>
                <p>Slot ID: {this.state.data.slotId}</p>
            </div>
        )
    }

    componentDidMount() {
        //http://localhost/part1/api/sessions?sessionId=2375&limit=1
        //const url = "http://localhost/part1/api/sessions?limit=1";
        const url = "http://localhost/part1/api/sessions?sessionId=" + this.props.sessionId + "&limit=1";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data[0]})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };

}