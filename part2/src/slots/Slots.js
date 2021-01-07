import React from 'react';
import Slot from "./Slot";

/**
 * Slots class to display a list of slots and their
 * information directly from the API endpoint.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class Slots extends React.Component {

    /**
     * Create the Slots class with the empty data state
     * ready to add more slots from the API.
     *
     * @param props Empty optional props for Authors
     */
    constructor(props) {
        super(props);

        this.state = {
            data: []
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
            this.state.data.map(slot => {
                return <Slot
                    slotId={slot.slotId}
                    type={slot.type}
                    dayInt={slot.dayInt}
                    dayString={slot.dayString}
                    startHour={slot.startHour}
                    startMinute={slot.startMinute}
                    endHour={slot.endHour}
                    endMinute={slot.endMinute}
                />
            })
        )
    }

    /**
     * Method for handling when the component mounts
     * and fetching all sessions from the API endpoint.
     */
    componentDidMount() {
        const url = "http://localhost/part1/api/slots";

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