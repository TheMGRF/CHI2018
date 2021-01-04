import React from 'react';

export default class Update extends React.Component {

    render() {
        return <div>
            <button onClick={this.props.handleUpdateClick}>Update</button>
        </div>
    }
}