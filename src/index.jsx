import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	render() {
		return (
			<nav className="uk-navbar uk-margin-large-bottom">
				<a className="uk-navbar-brand uk-hidden-small" href="dashboard.html">Knowledge Centre</a>
				<ul className="uk-navbar-nav uk-hidden-small">
					<li><a href="features.html">Features</a></li>
					<li><a href="">Data Flows</a></li>
					<li><a href="">Technologies</a></li>
					<li className="uk-parent" data-uk-dropdown>
						<a href="">Teams</a>

						<div className="uk-dropdown uk-dropdown-navbar">
							<ul className="uk-nav uk-nav-navbar">
								<li className="uk-nav-header">Client</li>
								<li><a href="#">Components</a></li>
								<li><a href="#">Applications</a></li>
								<li><a href="#">Architecture</a></li>
								<li className="uk-nav-header">Server</li>
								<li><a href="#">Platform</a></li>
								<li><a href="#">Content</a></li>
								<li><a href="#">Data</a></li>
								<li className="uk-nav-header">Specialist</li>
								<li><a href="#">Mobile</a></li>
								<li><a href="#">Entitlements</a></li>
								<li><a href="#">Support</a></li>
								<li><a href="#">QA</a></li>
							</ul>
						</div>

					</li>
				</ul>

				<div className="uk-navbar-flip">

					<ul className="uk-navbar-nav">
						<li className="uk-parent" data-uk-dropdown>
							<a href="">Operations</a>

							<div className="uk-dropdown uk-dropdown-navbar">
								<ul className="uk-nav uk-nav-navbar">
									<li className="uk-nav-header">Developer</li>
									<li><a href="#">JIRA Projects</a></li>
									<li><a href="#">GitHub Repositories</a></li>
									<li className="uk-nav-header">Access Control</li>
									<li><a href="#">Service Accounts</a></li>
									<li><a href="#">Certificates</a></li>
									<li className="uk-nav-divider"></li>
									<li><a href="#">Exceptions</a></li>
								</ul>
							</div>

						</li>
						<li><a href="">Recommendations</a></li>
						<li className="uk-parent" data-uk-dropdown>
							<a href="">Support</a>

							<div className="uk-dropdown uk-dropdown-navbar">
								<ul className="uk-nav uk-nav-navbar">
									<li><a href="#">Splunk</a></li>
									<li><a href="#">Elastic Search</a></li>
									<li><a href="#">Apache Cassandra</a></li>
									<li><a href="#">Neo4j Graph Database</a></li>
								</ul>
							</div>

						</li>
					</ul>

				</div>
			</nav>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
