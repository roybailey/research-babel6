import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from 'react-bootstrap';

class MainNavBar extends React.Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Knowledge Centre</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavItem eventKey={1} href="features.html">Features</NavItem>
					<NavItem eventKey={2} href="technologies.html">Technologies</NavItem>
					<NavDropdown eventKey={3} title="Teams" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Components</MenuItem>
						<MenuItem eventKey={3.2}>Applications</MenuItem>
						<MenuItem eventKey={3.3}>Architecture</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.4}>Platform</MenuItem>
						<MenuItem eventKey={3.5}>Content</MenuItem>
						<MenuItem eventKey={3.6}>Data</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.7}>Entitlements</MenuItem>
						<MenuItem eventKey={3.8}>Mobile</MenuItem>
						<MenuItem eventKey={3.9}>Support</MenuItem>
						<MenuItem eventKey={3.10}>QA</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	}
}

export default MainNavBar;
