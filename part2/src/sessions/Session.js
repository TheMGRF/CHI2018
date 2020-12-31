import React from 'react';

export default class Session extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionId: 1,
            contentId: 1,
            type: "",
            title: "",
            author: "",
            abstract: "",
            award: "",
            chair: "",
            room: "",
            data: []
        }
    }

    render() {
        let awardSlot;
        if (this.props.award) {
            awardSlot = <p><b>Award:</b> {this.props.award}</p>
        }

        return (
            <div className="session" id={this.props.sessionId}>
                <h3>{this.props.title}</h3>

                <p>
                    <b>Authors: </b> {this.state.data.map(data => <span>{data.name}, </span>)}
                </p>

                <p><b>Type:</b> {this.props.type}</p>
                <p><b>Abstract:</b> {this.props.abstract}</p>
                {awardSlot}
                <p><b>Chair:</b> {this.props.chair}</p>
                <p><b>Room:</b> {this.props.room}</p>
                <p><b>Times: </b> {this.props.start} - {this.props.end}</p>
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/authorsforcontent?contentId=" + this.props.contentId + "&limit=1";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };

}