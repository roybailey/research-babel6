import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
import "../node_modules/uikit/dist/css/uikit.min.css";
//import D3 from 'd3';
import UIKit from 'uikit';
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	render() {
		return (
        	<h1>Simple React + Babel + Bootstrap + Webpack </h1>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
