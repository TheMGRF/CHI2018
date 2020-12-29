import React from 'react';
import Session from "./Session";

export default class Sessions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    render() {
        return (
            this.state.data.map(slot => {
                return <Session
                    sessionId={slot.sessionId}
                    name={slot.name}
                    typeId={slot.typeId}
                    roomId={slot.roomId}
                    chairId={slot.chairId}
                    slotId={slot.slotId}
                />
            })
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/sessions";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };
}