import React from 'react';

export default class Search extends React.Component {
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