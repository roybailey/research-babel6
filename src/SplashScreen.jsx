import React from 'react';

class SplashScreen extends React.Component {
	render() {
		return (
			<div className="uk-grid" data-uk-grid-margin>
				<div className="uk-width-medium-1-1">

					<div className="uk-vertical-align uk-text-center splash-screen">
						<div className="uk-vertical-align-middle uk-width-1-2">
							<h1 className="uk-heading-large">Splash Screen</h1>
							<p className="uk-text-large">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo.</p>
							<p>
								<a className="uk-button uk-button-primary uk-button-large" href="#">Button</a>
								<a className="uk-button uk-button-large" href="#">Button</a>
							</p>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default SplashScreen;
