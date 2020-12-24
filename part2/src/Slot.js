import React from 'react';

export class Slot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    render() {
        return (
            <div className="session">
                <p>ID: {this.state.data.slotId}</p>
                <p>Type: {this.state.data.type}</p>
                <p>Day: {this.state.data.dayString}</p>
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/sessions?day=Monday&limit=1";

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