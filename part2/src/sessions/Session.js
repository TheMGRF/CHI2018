import React from 'react';
import SessionInfo from "./SessionInfo";

export default class Session extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showing: false,
            sessionId: 1,
            contentId: 1,
            title: "",
            data: []
        }
    }

    render() {
        const {showing} = this.state;

        return (
            <div className="session" id={this.props.details.sessionId}>
                <h3 className="session-info-expander" onClick={() => this.setState({showing: !showing})}>{this.props.details.title} &#9660;</h3>

                {showing ? <SessionInfo details={this.props.details} authorsExist={this.state.data} authors={this.state.data.map(data => <span>{data.name}, </span>)}/> : null}
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/authorsforcontent?contentId=" + this.props.details.contentId + "&limit=1";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    }

}