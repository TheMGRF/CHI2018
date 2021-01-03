import React from 'react';

export default class SessionInfo extends React.Component {

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

    render() {
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