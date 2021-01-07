import React from 'react';

/**
 * SessionInfo class containing all the information respective
 * to a session to be displayed.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class SessionInfo extends React.Component {

    /**
     * Create the SessionInfo class with the state containing
     * information on the session.
     *
     * @param props Empty optional props for Authors
     */
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            author: "",
            abstract: "",
            award: "",
            chair: "",
            room: ""
        }
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        // Set vars for information depending on if its set
        let awardSlot;
        if (this.props.details.award) {
            awardSlot = <p><b>Award:</b> {this.props.details.award}</p>;
        }
        let authors;
        if (this.props.authorsExist.length > 0 && this.props.authors) {
            authors = <p><b>Authors: </b> {this.props.authors}</p>;
        }
        let abstract;
        if (this.props.details.abstract) {
            abstract = <p><b>Abstract:</b> {this.props.details.abstract}</p>;
        }
        let chair;
        if (this.props.details.chair) {
            chair = chair = <p><b>Chair:</b> {this.props.details.chair}</p>;
        }

        return <div>
            {authors}

            <p><b>Type:</b> {this.props.details.type}</p>
            {abstract}
            {awardSlot}
            {chair}
            <p><b>Room:</b> {this.props.details.room}</p>
        </div>
    }

}