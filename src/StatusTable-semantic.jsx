import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';

class StatusTable extends React.Component {

    render() {
        var tableRows = [];
        this.props.dataset.forEach((item)=> {
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
                <div className="four wide column">{item.score}</div>
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
