import React from 'react';

export default class Update extends React.Component {

    render() {
        const admin = this.props.admin;

        return (
            <div>
                {admin > 0 ?
                    <button id="update-btn" /*onClick={this.props.handleUpdateClick(this.props.sessionId, this.props.title)}*/ disabled={admin}>Update</button>
                    :
                    null
                }
            </div>
        )
    }
}