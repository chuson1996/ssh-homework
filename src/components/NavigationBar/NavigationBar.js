import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import config from '../../config';
import {browserHistory} from 'react-router';
import {logout as _logout} from 'redux/modules/auth';
import get from 'lodash/get';
import {LinkContainer} from 'react-router-bootstrap';

@connect(
	state => ({token: get(state, 'auth.data.token')
}), {
	logout: _logout
})
class NavigationBar extends React.Component {
	static propTypes = {
		token: PropTypes.string,
		logout: PropTypes.func
	};

	handleLogout = () => {
		this.props.logout();
		browserHistory.push('/');
	};

	render() {
		return (
			<Navbar fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">
							<span>{config.app.title}</span>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>

				<Navbar.Collapse>
					{this.props.token && <Nav>
						<LinkContainer to={'/documents'}>
							<NavItem>Documents</NavItem>
						</LinkContainer>
					</Nav>}

					{this.props.token && <Nav navbar pullRight>
						<NavItem eventKey={1} onClick={this.handleLogout}>Logout</NavItem>
					</Nav>}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavigationBar;
