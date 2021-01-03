import React from 'react';
import ExpandedDay from "./sessions/ExpandedDay";

export default class EnableDay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showing: false,
            showSession: false,
            page: 1,
            pageSize: 6,
            data: []
        };
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
        const {showing} = this.state;

        let filteredData = this.state.data;

        let noOfPages = Math.ceil(filteredData.length / this.state.pageSize);
        if (noOfPages === 0) noOfPages = 1;
        let disabledPrevious = (this.state.page <= 1);
        let disabledNext = (this.state.page >= noOfPages);

        let pageSize = this.state.pageSize;
        let page = this.state.page;

        let buttons = showing ? <div id="author-buttons">
            <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
            <span id="page-indicator">Page {this.state.page} of {noOfPages}</span>
            <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
        </div> : null;

        return (
            <div className="day-display">
                <button className="day-display-btn" onClick={() => this.setState({showing: !showing})}>{this.props.day}</button>
                <br/>

                {
                    // api call will filter down data to this day
                    //this.state.data.map((details, id) => {
                    filteredData
                        .slice(((pageSize * page) - pageSize), (pageSize * page))
                        .map((details, id) => {
                            let day = this.props.day === details.dayString; // extra client side check for day to be sure
                            return showing && day ?
                                <ExpandedDay
                                    key={id}
                                    day={this.props.day}
                                    slotId={details.slotId}
                                    name={details.name}
                                    startHour={details.startHour}
                                    startMinute={details.startMinute}
                                    endHour={details.endHour}
                                    endMinute={details.endMinute}
                                />
                                : null;
                        })
                }
                {buttons}
            </div>
        )
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/slots?day=" + this.props.day;

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