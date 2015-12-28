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
            console.log("categoriesList:"+category.key);
            categoriesList.push(
                <div key={'tab-'+category.key} className="item" data-tab={category.key}>{category.title || category.key}
                </div>
            );
            var cardList = [];
            category.values.forEach((card)=>{
                console.log("card:"+card.id);
                cardList.push(
                    <Card key={card.id} id={card.id} header={card.header}/>
                );
            });
            cardTabs.push(
                <div key={category.key} className="ui bottom attached tab segment" data-tab={category.key}>
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
