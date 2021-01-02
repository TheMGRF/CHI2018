import React from 'react';

export default class AuthorModal extends React.Component {

    render() {
        return (
            <div id={this.props.details.authorId} className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2>{this.props.details.name}</h2>
                    <p></p>
                </div>
            </div>
        )
    }
}