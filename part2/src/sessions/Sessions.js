import React from 'react';
import Session from "./Session";

export default class Sessions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 3,
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

        let buttons = noOfPages > 1 ? <div id="author-buttons">
            <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
            <span id="page-indicator">Page {this.state.page} of {noOfPages}</span>
            <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
        </div> : null;


        return (
            <div>
                {
                    filteredData
                        .slice(((pageSize * page) - pageSize), (pageSize * page))
                        .map((details, id) => {
                            return <div>
                                <Session
                                    key={id}
                                    details={details}
                                    start={details.startHour + ":" + details.startMinute}
                                    end={details.endHour + ":" + details.endMinute}
                                />
                            </div>;
                        })
                }

                {buttons}
            </div>
        )
    }

    componentDidMount() {
        //const url = "http://localhost/part1/api/sessions";
        //const url = "http://localhost/part1/api/sessionsbeforeday?day=5";
        //const url = "http://localhost/part1/api/sessionsonday?day=" + this.props.day;
        const url = "http://localhost/part1/api/sessionsonday?day=" + this.props.day + "&slotId=" + this.props.slotId;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    }
}