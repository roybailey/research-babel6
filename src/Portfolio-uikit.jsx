import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';
import PortfolioThumbnail from './PortfolioThumbnail.jsx';

class Portfolio extends React.Component {

    render() {
        var categoriesList = [];
        this.props.categories.forEach((category)=> {
            categoriesList.push(<li key={category}><a href="#">{category}</a></li>);
        });
        console.log(categoriesList);
        var dataSwitcher="{connect:'#switcher-content'}";
        return (
            <div className="uk-grid" data-uk-grid-margin>
                <div className="uk-width-1-1">

                    <ul className="uk-subnav uk-subnav-pill" data-uk-switcher={dataSwitcher}>
                        {categoriesList}
                    </ul>

                    <ul id="switcher-content" className="uk-switcher">

                        <li className="uk-active">
                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-1"/>
                                <PortfolioThumbnail id="modal-2"/>
                                <PortfolioThumbnail id="modal-3"/>
                            </div>

                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-4"/>
                                <PortfolioThumbnail id="modal-5"/>
                                <PortfolioThumbnail id="modal-6"/>
                            </div>

                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-7"/>
                                <PortfolioThumbnail id="modal-8"/>
                                <PortfolioThumbnail id="modal-9"/>
                            </div>
                        </li>

                        <li>
                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-10"/>
                                <PortfolioThumbnail id="modal-11"/>
                                <PortfolioThumbnail id="modal-12"/>
                            </div>

                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-13"/>
                                <PortfolioThumbnail id="modal-14"/>
                                <PortfolioThumbnail id="modal-15"/>
                            </div>
                        </li>

                        <li>
                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-16"/>
                                <PortfolioThumbnail id="modal-17"/>
                                <PortfolioThumbnail id="modal-18"/>
                            </div>

                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-19"/>
                                <PortfolioThumbnail id="modal-20"/>
                            </div>
                        </li>

                        <li>
                            <div className="uk-grid" data-uk-grid-margin>
                                <PortfolioThumbnail id="modal-21"/>
                            </div>
                        </li>

                    </ul>

                </div>
            </div>
        );
    }
}

export default Portfolio;
