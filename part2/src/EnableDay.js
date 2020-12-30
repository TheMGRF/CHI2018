import React from 'react';
import Sessions from "./sessions/Sessions";

export default class EnableDay extends React.Component {

    constructor(props) {
        super(props);

        this.state = { showing: false };

    }

    render() {
        const { showing } = this.state;

        return (
            <div className="day-display">
                <button className="day-display-btn" onClick={() => this.setState({ showing: !showing})}>{this.props.day}</button>
                <br/>
                {
                    this.state.showing ? <Sessions day={this.props.day}/> : null
                }
            </div>
        )
    }

}