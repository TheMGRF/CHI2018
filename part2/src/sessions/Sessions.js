import React from 'react';
import Session from "./Session";

/**
 * Sessions class to display a collection of Session classes
 * in a paginated system with a searchable query box.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class Sessions extends React.Component {

    /**
     * Create the Sessions class with the state containing
     * information how many items per page should exist
     * with a default empty query state.
     *
     * @param props Empty optional props for Authors
     */
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 3,
            query: "",
            data: []
        }
    }

    /**
     * Handle clicking the previous page button to update
     * the object state to go backwards
     */
    handlePreviousClick = () => {
        this.setState({page: this.state.page - 1})
    }

    /**
     * Handle clicking the next page button to update
     * the object state to go forward
     */
    handleNextClick = () => {
        this.setState({page: this.state.page + 1})
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        let filteredData = this.state.data;

        // Create page sizes and button information
        let noOfPages = Math.ceil(filteredData.length / this.state.pageSize);
        if (noOfPages === 0) noOfPages = 1;
        let disabledPrevious = (this.state.page <= 1);
        let disabledNext = (this.state.page >= noOfPages);

        let pageSize = this.state.pageSize;
        let page = this.state.page;

        // Whether the buttons should appear is dependent on if theres more than 1 page available
        let buttons = noOfPages > 1 ? <div id="author-buttons">
            <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
            <span id="page-indicator">Page {this.state.page} of {noOfPages}</span>
            <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
        </div> : null;


        // Return the filtered list of sessions
        return (
            <div>
                {
                    filteredData
                        .slice(((pageSize * page) - pageSize), (pageSize * page))
                        .map((details, id) => {
                            return <Session
                                key={id}
                                details={details}
                                start={details.startHour + ":" + details.startMinute}
                                end={details.endHour + ":" + details.endMinute}
                            />;
                        })
                }

                {buttons}
            </div>
        )
    }

    /**
     * Method for handling when the component mounts
     * and fetching the session from a specific day by
     * its ID.
     */
    componentDidMount() {
        const url = "http://unn-w18013094.newnumyspace.co.uk/chi2018/part1/api/sessionsonday?day=" + this.props.day + "&slotId=" + this.props.slotId;

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