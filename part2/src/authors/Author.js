import React from 'react';
import AuthorModal from "./AuthorModal";

/**
 * Author class to create a name element and modal
 * component to show author information on a user
 * click depending on if the state visible is true.
 *
 * @author Thomas Griffiths
 */
export default class Author extends React.Component {

    /**
     * Constructor to create the class and bind the
     * handling of the update click method.
     *
     * @param props The properties associated with the class
     */
    constructor(props) {
        super(props);

        this.state = {visible: false};

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Method to handle the clicking of the modal object to
     * set if it is visible or not.
     */
    handleClick() {
        this.setState(state => ({
            visible: !state.visible
        }));
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div>
                <h3 className="author-name" onClick={this.handleClick}>{this.props.details.name}</h3>
                {!this.state.visible ? <div onClick={this.handleClick}><AuthorModal details={this.props.details}/></div> : null}
            </div>
        )
    }

    /**
     * Method for handling when the component mounts
     * and setting the visible state of the author modal.
     */
    componentDidMount() {
        this.setState({visible: !this.state.visible});
    }
}