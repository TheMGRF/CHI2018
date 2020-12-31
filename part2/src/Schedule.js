import React from 'react';
import EnableDay from "./EnableDay";

export default class Schedule extends React.Component {

    render() {
        return (
            <div>
                <div id="all-days">
                    <br/>
                    <ul>
                        <li><h2>Available Days:</h2></li>
                        <li><EnableDay day={"Monday"}/></li>
                        <li><EnableDay day={"Tuesday"}/></li>
                        <li><EnableDay day={"Wednesday"}/></li>
                        <li><EnableDay day={"Thursday"}/></li>
                    </ul>
                </div>
            </div>
        )
    }

}