import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';
import Card from './Card-semantic.jsx';

class Portfolio extends React.Component {

    componentDidMount() {
        $('.menu .item').tab();
    }

    render() {
        var categoriesList = [];
        var cardTabs = [];
        this.props.categories.forEach((category)=> {
            categoriesList.push(
                <div key={category} className="item" data-tab={category}>{category}
                </div>
            );
            var cardList = [];
            ['one','two','three'].forEach((card)=>{
                cardList.push(
                    <Card id={'card-'+card} header={category+"-"+card}/>
                );
            });
            cardTabs.push(
                <div className="ui bottom attached tab segment" data-tab={category}>
                    <div className="ui cards">
                        {cardList}
                    </div>
                </div>
            );
        });
        console.log(categoriesList);
        return (
            <div className="ui segment">
                <div className="ui top attached tabular menu">
                    {categoriesList}
                </div>
                {cardTabs}
            </div>
        );
    }
}

export default Portfolio;
