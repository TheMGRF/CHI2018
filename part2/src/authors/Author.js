import React from 'react';
import AuthorModal from "./AuthorModal";

export default class Author extends React.Component {

    constructor(props) {
        super(props);

        this.state = { visible: false };

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
                <button onClick={this.handleClick}>{this.props.details.name}</button>
                { !this.state.visible ? <AuthorModal details={this.props.details}/> : null }
            </div>
        )
    }

    componentDidMount() {
        this.setState({ visible: !this.state.visible});
    }
}