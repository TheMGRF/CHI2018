import React from "react";
import Update from "../authentication/Update";

/**
 * Component for updating session titles through the API
 *
 * Note: Upon clicking the update buttons an API request
 * will be sent to update the session name in the DB.
 *
 * @author Thomas Griffiths
 */
export default class SessionUpdater extends React.Component {

    /**
     * Create the SessionUpdater class with the state containing
     * the name to use as a base for the session.
     *
     * @param props Empty optional props for Authors
     */
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            data: []
        }
    }

    /**
     * Method for when the component has successfully updated
     * to set the state name again to accommodate React's bad
     * handling of textareas dynamiclly updating.
     *
     * @param nextProps The props to pass in
     */
    componentDidUpdate(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.setState({name: nextProps.name});
        }
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
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