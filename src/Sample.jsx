import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import D3 from 'd3';

class List extends React.Component {
    render() {
        let { name, items } = this.props;
        let options = [];

        options.push(<option key={name} value={name}>{name}</option>);

        for (var index in items) {
            let item = items[index];
            options.push(<option key={item} value={item}>{item}</option>);
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
        this.brandChanged = this.brandChanged.bind(this);
        this.modelChanged = this.modelChanged.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.knownModel = this.knownModel.bind(this);
        // set initial state
        this.state = {
            brand: null, model: null
        };
    }

    componentDidMount() {
        this.setState({
            brand: null, model: null
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
        const { onRide } = this.props;
        console.log('########## 1) Button Click ##########');
        console.log(this.props);
        console.log(this.state);
        console.log(`${brand} ${model} riding...`);
        console.log('########## 2) Button Click ##########');
        onRide(brand, model);
        console.log('########## 3) Button Click ##########');
    }

    data() {
        return this.props.brands || {};
    }

    buttonDisabled() {
        return this.state.model === null || this.state.brand === null;
    }

    models() {
        return this.state.brand ? this.data()[this.state.brand] : [];
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
        console.log('########## 1) render ##########');
        console.log(this.data());
        console.log(this.props.brands);
        console.log(this.props.onRide);
        console.log('########## 2) render ##########');
        return (
            <div id={this.props.id}>
                <List name="Brand" items={this.brands()} handler={this.brandChanged} value={this.state.brand}/>
                <List name="Model" items={this.models()} handler={this.modelChanged} value={this.state.model}/>
                <button onClick={this.buttonClicked} disabled={this.buttonDisabled()}>Ride</button>
            </div>
        );
    }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
    return {
        brands: state.cars.brands
    }
}

// our action creator for clicking the ride button
function ride(brand, model) {
    return {
        type: 'RIDE',
        brand: brand,
        model: model
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
    return {
        onRide: bindActionCreators(ride,dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TwoLists);
