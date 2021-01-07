import React from 'react';
import Sessions from "./Sessions";

/**
 * ExpandedDay class to contain information on an expanded day
 * including session information obtained by day and ID
 * depending on if it is showing in the state.
 */
export default class ExpandedDay extends React.Component {

    /**
     * Create the ExpandedDay class with the state showing
     * being false by default.
     *
     * @param props Empty optional props for Authors
     */
    constructor(props) {
        super(props);

        this.state = {
            showing: false
        };
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        const {showing} = this.state;

        return (
            <div>
                <h2 className="expanded-day-header" onClick={() => this.setState({showing: !showing})}>{this.props.name} ({this.props.startHour}:{this.props.startMinute} - {this.props.endHour}:{this.props.endMinute})</h2>
                {this.state.showing ? <Sessions day={this.props.day} slotId={this.props.slotId}/> : null}
            </div>
        )
    }

}