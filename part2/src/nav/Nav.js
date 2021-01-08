import React from 'react';
import './nav.css';
import {Link} from "react-router-dom";

/**
 * Global navigation bar for the site
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class Nav extends React.Component {

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div className="navBar">
                <ul id="nav">
                    <li><Link to="/" id="schedule" /*className="active"*/>Schedule</Link></li>
                    <li><Link to="/authors" id="authors">Authors</Link></li>
                    <li><Link to="/admin" id="admin">Admin</Link></li>
                    <li><a href="//localhost/part1" target="_blank" rel="noreferrer" id="about-link">About</a></li>
                </ul>
            </div>
        )
    }
}