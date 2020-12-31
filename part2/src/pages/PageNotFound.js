import React from 'react';
import {Link} from "react-router-dom";

/**
 * A light weight 404 error page for when the Router
 * fails to find a valid page.
 *
 * @author Thomas Griffiths
 */
export default class PageNotFound extends React.Component {

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