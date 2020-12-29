import React from 'react';
import './nav.css';

export default class Nav extends React.Component {
    render() {
        return (
            <div className="navBar">
                <ul id="nav">
                    <li><a href="rawr" className="active">Schedule</a></li>
                    <li><a href="rawr">Authors</a></li>
                    <li><a href="rawr">Admin</a></li>
                    <li><a href="//localhost/part1/api/" target="_blank" rel="noreferrer">About</a></li>
                </ul>
            </div>
        )
    }

}