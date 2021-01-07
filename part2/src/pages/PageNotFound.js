import React from 'react';
import {Link} from "react-router-dom";

/**
 * A light weight 404 error page for when the Router
 * fails to find a valid page.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class PageNotFound extends React.Component {

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div id="error">
                <h2 id="error-text">404 - Page Not Found</h2>
                <br/>
                <Link id="safety" to="/">Back to Safety</Link>
            </div>
        )
    }

}