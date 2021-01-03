import React from 'react';
import AuthorModal from "./AuthorModal";

export default class Author extends React.Component {

    constructor(props) {
        super(props);

        this.state = {visible: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            visible: !state.visible
        }));
    }

    render() {
        return (
            <div>
                <h3 className="author-name" onClick={this.handleClick}>{this.props.details.name}</h3>
                {!this.state.visible ? <div onClick={this.handleClick}><AuthorModal details={this.props.details}/></div> : null}
            </div>
        )
    }

    componentDidMount() {
        this.setState({visible: !this.state.visible});
    }
}