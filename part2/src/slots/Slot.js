import React from 'react';

/**
 * Slot class to contain information on a specific
 * slot's information and display it back to the user.
 *
 * @author Thomas Griffiths
 */
export default class Slot extends React.Component {

    /**
     * Create the Slot class with the state containing
     * all the information to display for a slot.
     *
     * @param props Empty optional props for Authors
     */
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
            endMinute:""
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
}