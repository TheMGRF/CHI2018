import React from 'react';

export default class Update extends React.Component {

    render() {
        let admin = this.props.admin;

        return (
            <div>
                {admin ?
                    <button id="update-btn" onClick={this.props.handleUpdateClick(this.props.sessionId, this.props.title)}>Update</button>
                    :
                    <button id="update-btn">DENIED</button>
                }
            </div>
        )
    }
}