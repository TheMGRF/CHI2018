import React from 'react';

export default class Slot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            slotId:1,
            type:"",
            dayInt:"",
            dayString:"",
            startHour:"",
            startMinute:"",
            endHour:"",
            endMinute:"",
            data:[]
        }
    }

    render() {
        return (
            <div className="slot" id={this.props.slotId}>
                <p>Slot ID: {this.props.slotId}</p>
                <p>Type: {this.props.type}</p>
                <p>Day Int: {this.props.dayInt}</p>
                <p>Day String: {this.props.dayString}</p>
                <p>Start: {this.props.startHour}:{this.props.startMinute}</p>
                <p>End: {this.props.endHour}:{this.props.endMinute}</p>
            </div>
        )
    }

    /*componentDidMount() {
        const url = "http://localhost/part1/api/slots?slotId=" + this.props.slotId + "&limit=1";

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