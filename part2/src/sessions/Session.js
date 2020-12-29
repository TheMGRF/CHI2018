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
                <table className="sessionTable">
                    <tr>
                        <th>Session ID</th>
                        <th>Name</th>
                        <th>Type ID</th>
                        <th>Room ID</th>
                        <th>Chair ID</th>
                        <th>Slot ID</th>
                    </tr>
                    <tr>
                        <td>{this.props.sessionId}</td>
                        <td>{this.props.name}</td>
                        <td>{this.props.typeId}</td>
                        <td>{this.props.roomId}</td>
                        <td>{this.props.chairId}</td>
                        <td>{this.props.slotId}</td>
                    </tr>
                </table>
            </div>
        )
    }

    /*componentDidMount() {
        const url = "http://localhost/part1/api/sessions?sessionId=" + this.props.sessionId + "&limit=1";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data[0]})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };*/

}