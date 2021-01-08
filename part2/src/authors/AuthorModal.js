import React from 'react';

/**
 * AuthorModal class to create a popup modal to contain
 * information on an Author that can be hidden by default.
 *
 * @author Thomas Griffiths (W18013094)
 */
export default class AuthorModal extends React.Component {

    /**
     * Constructor to create the class and bind the
     * handling of the update click method.
     *
     * @param props The properties associated with the class
     */
    constructor(props) {
        super(props);

        this.state = {
            authorId: 1,
            data: []
        }
    }

    /**
     * The render method to create the JSX/HTML content
     * for the page with class states and properties.
     *
     * @returns {JSX.Element} The fully rendered JSX object
     */
    render() {
        return (
            <div id={this.props.details.authorId} className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2>{this.props.details.name}</h2>
                    {
                        this.state.data.map((details, id) => {
                            return <div key={id} className="model-content-text">
                                <p><b>Content:</b> {details.name}</p>
                                <p><b>Session:</b> {details.title}</p>
                                <p><b>Abstract:</b> {details.abstract}</p>
                                {details.award ? <p>Awarded: {details.award}</p> : null}
                                <hr/>
                            </div>;
                        })
                    }
                </div>
            </div>
        )
    }

    /**
     * Method for handling when the component mounts
     * and sending an API call to fetch the class data
     * containing information like name, ids, abstract and
     * awards if they were given.
     */
    componentDidMount() {
        const url = "http://unn-w18013094.newnumyspace.co.uk/chi2018/part1/api/sessioncontent?contentId=" + this.props.details.contentId;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.data})
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
            })
    }

    /**
     * When the component will unmount.
     * Fixes "Warning: Can't perform a React state update on an unmounted component"
     */
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}