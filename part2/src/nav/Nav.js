import React from 'react';
import './nav.css';

export default class Nav extends React.Component {
    render() {
        return (
            <div className="navBar">
                {/*<h1>CHI 2018</h1>*/}
                {/*<div id="header"></div>*/}

                <ul id="nav">
                    <li><a href="/" className="active">Schedule</a></li>
                    <li><a href="/authors">Authors</a></li>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="//localhost/part1/api/" target="_blank" rel="noreferrer">About</a></li>
                </ul>
            </div>
        )
    }

}