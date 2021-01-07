import React from "react";
import Update from "../authentication/Update";

/**
 * Component for updating session titles through the API
 *
 * Note: Upon clicking the update buttons an API request
 * will be sent to update the session name in the DB.
 */
export default class SessionUpdater extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            data: []
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.setState({name: nextProps.name});
        }
    }

    render() {
        return (
            <div>
                <textarea
                    className="session-name-box"
                    key={this.props.id}
                    value={this.state.name}
                    onChange={event => this.setState({name: event.target.value})}
                />
                <br/>
                <Update admin={this.props.admin} name={this.state.name} sessionId={this.props.sessionId} handleLogoutClick={this.props.handleLogoutClick}/>
            </div>
        )
    }

    /**
     * When the component will unmount.
     * Fixes "Warning: Can't perform a React state update on an unmounted component"
     */
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}