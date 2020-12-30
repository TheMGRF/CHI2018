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
                    contentId={slot.contentId}
                    type={slot.type}
                    title={slot.title}
                    author="N/A"
                    abstract={slot.abstract}
                    chair={slot.chair}
                    room={slot.room}
                />
            })
        )
    }

    componentDidMount() {
        //const url = "http://localhost/part1/api/sessions";
        const url = "http://localhost/part1/api/sessionsbeforeday?day=5";

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