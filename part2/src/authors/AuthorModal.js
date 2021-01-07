import React from 'react';

export default class AuthorModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authorId: 1,
            data: []
        }
    }

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

    componentDidMount() {
        const url = "http://localhost/part1/api/sessioncontent?contentId=" + this.props.details.contentId;

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