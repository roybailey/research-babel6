import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';

class List extends React.Component {
    render() {
        let { name, items } = this.props;
        let options = [];

        options.push(<option value={name}>{name}</option>);

        for (var index in items) {
            let item = items[index];
            options.push(<option value={item}>{item}</option>);
        }

        return (
            <span>
                <select onChange={this.props.handler} value={this.props.value ? this.props.value : "Model"}>
                    {options}
                </select>
            </span>
        );
    }
}

class TwoLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: null,
            model: null
        };
        this.brandChanged = this.brandChanged.bind(this);
        this.modelChanged = this.modelChanged.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.knownModel = this.knownModel.bind(this);
        this.dataset = {};
    }

    componentDidMount() {
        d3.json(this.props.source, (result) => {
            console.log(JSON.stringify(result,undefined,2));
            this.dataset = result;
            this.setState(this.state);
        });
    }

    brandChanged(event) {
        let brand = event.target.value;
        if (this.knownBrand(brand)) {
            let models = this.data()[brand];
            this.setState({
                brand, model: null,
                models: models, buttonDisabled: true,
            });
        } else {
            this.setState({
                brand: null, model: null
            });
        }
    }

    modelChanged(event) {
        let model = event.target.value;
        if (this.knownModel(model)) {
            this.setState({model});
        } else {
            this.setState({model: null});
        }
    }

    buttonClicked(event) {
        let { brand, model } = this.state;
        console.log(this.state);
        console.log(`${brand} ${model} riding...`);
    }

    data() {
        return this.dataset;
    }

    buttonDisabled() {
        return this.state.model === null || this.state.brand === null;
    }

    models() {
        return this.state.brand ? this.data()  [this.state.brand] : [];
    }

    brands() {
        return Object.keys(this.data());
    }

    knownBrand(brand) {
        return this.brands().indexOf(brand) !== -1
    }

    knownModel(model) {
        return this.models().indexOf(model) !== -1
    }

    render() {
        console.log(this.data());
        return (
            <div id={this.props.id}>
                <List name="Brand" items={this.brands()} handler={this.brandChanged} value={this.state.brand}/>
                <List name="Model" items={this.models()} handler={this.modelChanged} value={this.state.model}/>
                <button onClick={this.buttonClicked} disabled={this.buttonDisabled()}>Ride</button>
            </div>
        );
    }
}

export default TwoLists;
