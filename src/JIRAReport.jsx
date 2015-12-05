import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';
import Card from './Card-semantic.jsx';

class JIRAReport extends React.Component {

    render() {
        var cardList = [];
        this.props.items.forEach((card)=>{
            console.log(card);
            if(card.summary) {
                cardList.push(
                    <Card id={card.key}
                          key={card.key}
                          meta={card.assignee}
                          header={card.summary}
                          status={card.status}
                          target={card.fixVersion}
                          priority={card.priority}
                          description={card.description}/>
                );
            }
        });
        return (
            <div className="ui cards">
                {cardList}
            </div>
        );
    }
}

export default JIRAReport;
