import React from 'react';
import ReactDOM from 'react-dom';

class Card extends React.Component {

    static renderButton(status) {
        if(status && status !== 'To Do' )
            return <div className="ui basic green button">{status}</div>
        return <div className="ui basic red button">Unknown</div>
    }

    render() {
        return (
            <div className="card">
                <div className="content">
                    <i className="icon user right floated"></i>

                    <div className="header">{this.props.header || 'Header'}</div>
                    <div className="meta">{this.props.meta || 'meta data'}</div>
                    <div className="description">{this.props.description || 'Long description'}</div>
                    <div className="description">
                        <span className="right floated"><i className="heart outline like icon"></i>17 likes</span>
                        <i className="comment icon"></i>3 comments
                    </div>
                    <div className="description">
                        <div className="ui teal label right floated">{this.props.status || 'N/A'}</div>
                        <div className="ui label right floated">{this.props.priority || 'N/A'}</div>
                        <div className="ui label right floated">{this.props.category || 'N/A'}</div>
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        {Card.renderButton(this.props.status)}
                        {Card.renderButton(this.props.target)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
