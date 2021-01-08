import React from 'react';
import SessionInfo from "./SessionInfo";

/**
 * Session class show session information if it is expanded
 * via clicking on the session title.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class Session extends React.Component {

    /**
     * Create the Session class with the state containing
     * information to create a session an if the expanded
     * information should be showing.
     *
     * @param props Empty optional props for Authors
     */
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

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        const {showing} = this.state;

        return (
            <div className="session" id={this.props.details.sessionId}>
                <h3 className="session-info-expander" onClick={() => this.setState({showing: !showing})}>{this.props.details.title} &#9660;</h3>

                {showing ? <SessionInfo details={this.props.details} authorsExist={this.state.data} authors={this.state.data.map((data, id) => <span key={id}>{data.name}, </span>)}/> : null}
            </div>
        )
    }

    /**
     * Method for handling when the component mounts
     * ad sending an API request to fetch authors
     * corresponding to the content ID.
     */
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