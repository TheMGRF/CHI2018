import React from 'react';

/**
 * Login class to manage user email and password input
 * with a login button to forward to user confirmation.
 *
 * @author Thomas Griffiths
 */
export default class Login extends React.Component {

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div id="login-area">
                <input
                    type='text'
                    placeholder='email'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                />
                <button onClick={this.props.handleLoginClick}>Log in</button>
            </div>
        );
    }
}