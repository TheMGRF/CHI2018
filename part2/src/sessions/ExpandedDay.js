import React from 'react';
import Sessions from "./Sessions";

export default class ExpandedDay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showing: false
        };
    }

    render() {
        const {showing} = this.state;

        return (
            <div>
                <h2 className="expanded-day-header" onClick={() => this.setState({showing: !showing})}>{this.props.name} ({this.props.startHour}:{this.props.startMinute} - {this.props.endHour}:{this.props.endMinute})</h2>
                {this.state.showing ? <Sessions day={this.props.day} slotId={this.props.slotId}/> : null}
            </div>
        )
    }

}