import React, {Component, PropTypes} from 'react';
import {LoginForm} from 'components';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';

export default class Login extends Component {

	static propTypes = {
		user: PropTypes.object,
		login: PropTypes.func,
		logout: PropTypes.func
	};

	render() {
		return (
			<div>
				<Helmet title="ssh-homework: Login"/>
				<Row>
					<Col sm={6} smOffset={3} xs={12}>
						<h2>Login</h2>
						<LoginForm formName="Login" />
					</Col>
				</Row>
			</div>
		);
	}
}
