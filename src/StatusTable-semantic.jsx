import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';
import Rating from './Rating-semantic.jsx';

class StatusTable extends React.Component {

    componentDidMount() {
    }

    onRating(p1,p2) {
        console.log("Parent Rating change notification");
        console.log(p1);
        console.log(p2);
    }

    render() {
        var tableRows = [];
        this.props.dataset.forEach((item)=> {
            var that = this;
            tableRows.push(
                <div className="four wide column">{item.group}</div>
            );
            tableRows.push(
                <div className="four wide column">{item.title}</div>
            );
            tableRows.push(
                <div className="four wide column">{item.status}</div>
            );
            tableRows.push(
                <div className="four wide column">
                    <Rating item={item} rating={item.score} handler={this.props.onRating} />
                </div>
            );
        });
        console.log(tableRows);
        return (
            <div className="ui grid">
                {tableRows}
            </div>);
    }
}

export default StatusTable;
