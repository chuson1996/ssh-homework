import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
// import Grid from 'react-bootstrap/lib/Grid';
// import Row from 'react-bootstrap/lib/Row';
// import Col from 'react-bootstrap/lib/Col';
// import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
// import { asyncConnect } from 'redux-async-connect';
// import get from 'lodash/get';

// @asyncConnect([{
// 	promise: ({store: {dispatch}}) => {
// 	}
// }])
@connect((state) => ({
	loggedIn: state.auth.loaded
}))
export default class Home extends Component {
	static propTypes = {
		loggedIn: PropTypes.bool
	};

	render() {
		const styles = require('./Home.scss');
		const { loggedIn } = this.props;

		return (
			<div className={styles.home}>
				<Helmet title="Social Samurai"/>
				{ !loggedIn ? (
						<h1>
							Please <Link to={`/login`}>Login</Link>
						</h1>
					) : (<Link to={`/documents`}>View Documents</Link>)
				}
			</div>
		);
	}
}
