import React from 'react';
import EnableDay from "./EnableDay";

export default class Schedule extends React.Component {

    render() {
        return (
            <div id="all-days">
                <h2>Available Days:</h2>
                <EnableDay day={"Monday"}/>
                <EnableDay day={"Tuesday"}/>
                <EnableDay day={"Wednesday"}/>
                <EnableDay day={"Thursday"}/>
            </div>
        )
    }

}