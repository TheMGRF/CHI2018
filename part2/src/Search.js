import React from 'react';

/**
 * Search class to take the user's input and pass it
 * to the parent handle search method.
 *
 * @author Thomas Griffiths
 */
export default class Search extends React.Component {

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div>
                <p>Search: {this.props.query}</p>
                <input
                    type='text'
                    placeholder='search'
                    value={this.props.query}
                    onChange={this.props.handleSearch}
                />
            </div>
        )
    }
}