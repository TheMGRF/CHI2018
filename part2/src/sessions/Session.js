import React from 'react';

export default class Session extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionId:1,
            contentId:1,
            type:"",
            title:"",
            author:"",
            abstract:"",
            chair:"",
            room:"",
            data:[]
        }
    }

    render() {
        return (
            <div className="session" id={this.props.sessionId}>
                <h3>{this.props.title}</h3>

                <p>
                    <b>Authors: </b>
                    {
                        this.state.data.map(data => <span>{data.name}, </span>)
                    }
                </p>

                <p><b>Type:</b> {this.props.type}</p>
                <p><b>Abstract:</b> {this.props.abstract}</p>
                <p><b>Chair:</b> {this.props.chair}</p>
                <p><b>Room:</b> {this.props.room}</p>
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/authorsforcontent?contentId=" + this.props.contentId + "&limit=1";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
                console.log(data.data[0])
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };

}