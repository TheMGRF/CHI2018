import React from 'react';
import EnableDay from "../EnableDay";

/**
 * Schedule class to contain all the days to have available
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class Schedule extends React.Component {

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div>
                <div id="all-days">
                    <br/>
                    <ul>
                        <li><h2>Available Days:</h2></li>
                        <li><EnableDay day={"Monday"}/></li>
                        <li><EnableDay day={"Tuesday"}/></li>
                        <li><EnableDay day={"Wednesday"}/></li>
                        <li><EnableDay day={"Thursday"}/></li>
                    </ul>
                </div>
            </div>
        )
    }

}