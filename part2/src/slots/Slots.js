import React from 'react';
import Slot from "./Slot";

export default class Slots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    render() {
        /*return (
            this.state.data.map(slot  => {
                return <Slot slotId={slot.slotId}/>
            })
        )*/

        /*for (let i = 0; i < this.state.data.length; i++) {
            return <Slot slotId={this.state.data[i].slotId}/>
        }*/

        return (
            this.state.data.map(slot => {
                return <Slot
                    slotId={slot.slotId}
                    type={slot.type}
                    dayInt={slot.dayInt}
                    dayString={slot.dayString}
                    startHour={slot.startHour}
                    startMinute={slot.startMinute}
                    endHour={slot.endHour}
                    endMinute={slot.endMinute}
                />
            })
        )

        // return <Slot/>
    }

    componentDidMount() {
        const url = "http://localhost/part1/api/slots";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    };
}