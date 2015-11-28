import React from 'react';
import ReactDOM from 'react-dom';

class Card extends React.Component {

    render() {
        return (
            <div className="card">
                <div className="content">
                    <i className="icon user right floated"></i>

                    <div className="header">{this.props.header||'Header'}</div>
                    <div className="meta">{this.props.meta||'meta data'}</div>
                    <div className="description">{this.props.description||'Long description'}</div>
                    <div className="description">
                        <span className="right floated"><i className="heart outline like icon"></i>17 likes</span>
                        <i className="comment icon"></i>3 comments
                    </div>
                    <div className="description">
                        <a className="active teal item">
                            Size/
                            <div className="ui teal label right floated">XS</div>
                        </a>
                        <a className="item">
                            Days/
                            <div className="ui label right floated">240</div>
                        </a>
                        <a className="item">
                            Date
                            <div className="ui label right floated">JAN</div>
                        </a>
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button">Approve</div>
                        <div className="ui basic red button">Decline</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
