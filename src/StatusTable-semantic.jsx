import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';

class StatusTable extends React.Component {


    componentDidMount() {
        $('.ui.rating').rating();
        $('.ui.rating')
            .rating('setting', 'onRate', function(value) {
                console.log("onRate");
                console.log(value);
            });
    }

    onRating(p1,p2) {
        console.log("Rating change");
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
                    <div className="ui star rating"
                         onClick={that.onRating.bind(this, item)}
                         data-max-rating="5"
                         data-rating={item.score}>{item.score}</div>
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
