import React from 'react';
import Session from "./Session";
import Author from "../authors/Author";

export default class New extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 2,
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

    render() {
        let filteredData = this.state.data;

        let noOfPages = Math.ceil(filteredData.length / this.state.pageSize);
        if (noOfPages === 0) noOfPages = 1;
        let disabledPrevious = (this.state.page <= 1);
        let disabledNext = (this.state.page >= noOfPages);

        let pageSize = this.state.pageSize;
        let page = this.state.page;

        return (
            <div>
                <p>{this.props.day} | {this.props.name} | {this.props.slotId}</p>
            </div>
        )
    }

    componentDidMount() {
        //const url = "http://localhost/part1/api/sessions";
        //const url = "http://localhost/part1/api/sessionsbeforeday?day=5";
        //const url = "http://localhost/part1/api/sessionsonday?day=" + ;
        const url = "http://localhost/part1/api/sessionsonday?day=" + this.props.day + "&slotId=" + this.props.slotId

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };
}