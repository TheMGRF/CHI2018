import React from 'react';
import Search from '../Search'
import Author from "../authors/Author";

/**
 * Class for handling displaying a list of available authors
 * and clicking them to view more of their information at
 * the convention.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class Authors extends React.Component {

    /**
     * Create the Authors object with pre-set page
     * sizes and an empty query and bind the search
     * method to the class.
     *
     * @param props Empty optional props for Authors
     */
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 9,
            query: "",
            data: []
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * Handle searching in the input box of this object and
     * update states
     *
     * @param e Input from search qeuery
     */
    handleSearch = (e) => {
        this.setState({page: 1, query: e.target.value})
        this.searchDetails(e.target.value)
    }

    /**
     * Search through the authors API endpoint by default with all
     * values available then filter down depending on the set query
     * instead of using a client side filter.
     *
     * @param query The name of the author to search for
     */
    searchDetails = (query) => {
        let url = "http://localhost/part1/api/authors";
        if (query) url += "?name=" + query;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            });
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
     * Renders the list of authors filtered by query.
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

        return (
            <div id="author-search">
                <h2>Author Database</h2>

                <Search id="search-bar" query={this.state.query} handleSearch={this.handleSearch}/>
                {
                    filteredData
                        .slice(((pageSize * page) - pageSize), (pageSize * page))
                        .map((details, id) => (
                            <Author key={id} details={details}/>
                        ))
                }

                <div id="author-buttons">
                    <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
                    <span id="page-indicator">Page {this.state.page} of {noOfPages}</span>
                    <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
                </div>
            </div>
        );
    }

    /**
     * Method for handling when the component mounts and
     * calling the search details method to fetch and search
     * via the API endpoint.
     */
    componentDidMount() {
        this.searchDetails();
    }
}