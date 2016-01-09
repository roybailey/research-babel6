import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';

class Rating extends React.Component {

    componentDidMount() {
        var that = this;
        // this works where onClick with 'get rating' query didn't...
        $(ReactDOM.findDOMNode(this))
            .rating('setting', 'onRate', function(value) {
                console.log("onRate( "+that.props.item+", "+value+" )");
                that.props.handler(that.props.item, value);
            });
    }

    render() {
        return <div className="ui star rating"
                 data-max-rating="5"
                 data-rating={this.props.rating}>{this.props.rating}</div>;
    }
}

export default Rating;
