import React from "react";
import Update from "../authentication/Update";

/**
 * Component for updating session titles through the API
 *
 * Note: Due to the pagination and how React is handling
 * the updating the titles are automatically updated
 * on key presses but the update buttons will still
 * function to also send the API request to update too.
 */
export default class SessionUpdater extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            data: []
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({title: nextProps.title});
        }
    }

    render() {
        return (
            <div>
                <textarea
                    className="session-name-box"
                    key={this.props.id}
                    value={this.state.title}
                    onChange={event => this.setState({title: event.target.value})}
                />
                <br/>
                <Update admin={this.props.admin} handleUpdateClick={this.props.handleUpdateClick} sessionId={this.state.data.sessionId}/>
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/sessioncontent?contentId=" + this.props.contentId;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data[0]})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    }

}