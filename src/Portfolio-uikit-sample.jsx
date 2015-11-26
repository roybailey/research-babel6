import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';
import PortfolioThumbnail from './PortfolioThumbnail.jsx';
import { Input } from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

class Portfolio extends React.Component {

    render() {
        var categoriesList = [];
        this.props.categories.forEach((category)=> {
            categoriesList.push(<li key={category}><a href="#">{category}</a></li>);
        });
        console.log(categoriesList);
        var dataSwitcher = "{connect:'#my-id'}";
        return (
            <div className="uk-container uk-container-center uk-margin-top">

                <ul data-uk-switcher={dataSwitcher}>
                    <li><a href="#">Any</a></li>
                    <li><a href="#">Some</a></li>
                    <li><a href="#">More</a></li>
                    <li><a href="#">Others</a></li>
                </ul>

                <ul id="my-id" className="uk-switcher">
                    <li>
                        <div> Any.1 <a href="" data-uk-switcher-item="0">...</a></div>
                    </li>
                    <li>
                        <div> Some.1 <a href="" data-uk-switcher-item="1">...</a></div>
                        <div> Some.2 <a href="" data-uk-switcher-item="1">...</a></div>
                        <div> Some.3 <a href="" data-uk-switcher-item="1">...</a></div>
                    </li>
                    <li>
                        <div> More.1 <a href="" data-uk-switcher-item="2">...</a></div>
                        <div> More.2 <a href="" data-uk-switcher-item="2">...</a></div>
                    </li>
                    <li>
                        <div> Others.1 <a href="" data-uk-switcher-item="3">...</a></div>
                        <div> Others.2 <a href="" data-uk-switcher-item="3">...</a></div>
                        <div> Others.3 <a href="" data-uk-switcher-item="3">...</a></div>
                        <div> Others.4 <a href="" data-uk-switcher-item="3">...</a></div>
                    </li>
                </ul>

                <ButtonToolbar>
                    {/* Standard button */}
                    <Button>Default</Button>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary">Primary</Button>

                    {/* Indicates a successful or positive action */}
                    <Button bsStyle="success">Success</Button>

                    {/* Contextual button for informational alert messages */}
                    <Button bsStyle="info">Info</Button>

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning">Warning</Button>

                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger">Danger</Button>

                    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
                    <Button bsStyle="link">Link</Button>
                </ButtonToolbar>

                <form>
                    <Input type="text" label="Text" placeholder="Enter text" />
                    <Input type="email" label="Email Address" placeholder="Enter email" />
                    <Input type="password" label="Password" />
                    <Input type="file" label="File" help="[Optional] Block level help text" />
                    <Input type="checkbox" label="Checkbox" checked readOnly />
                    <Input type="radio" label="Radio" checked readOnly />
                    <Input type="select" label="Select" placeholder="select">
                        <option value="select">select</option>
                        <option value="other">...</option>
                    </Input>
                    <Input type="select" label="Multiple Select" multiple>
                        <option value="select">select (multiple)</option>
                        <option value="other">...</option>
                    </Input>
                    <Input type="textarea" label="Text Area" placeholder="textarea" />
                    <ButtonInput value="Button Input" />
                    <ButtonInput type="reset" value="Reset Button" />
                    <ButtonInput type="submit" value="Submit Button" />
                </form>

            </div>
        );
    }
}

export default Portfolio;
