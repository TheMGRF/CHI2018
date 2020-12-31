import React from 'react';
import './nav.css';
import {Link} from "react-router-dom";

/**
 * Global navigation bar for the site
 *
 * @author Thomas Griffiths
 */
export default class Nav extends React.Component {
    render() {
        return (
            <div className="navBar">
                {/*<h1>CHI 2018</h1>*/}
                {/*<div id="header"></div>*/}

                <ul id="nav">
                    <li><Link to="/" id="schedule" /*className="active"*/>Schedule</Link></li>
                    <li><Link to="/authors" id="authors">Authors</Link></li>
                    <li><Link to="/admin" id="admin">Admin</Link></li>
                    <li><a href="//localhost/part1/api/" target="_blank" rel="noreferrer">About</a></li>
                </ul>
            </div>
        )
    }
}