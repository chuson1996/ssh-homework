import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
// import {Link} from 'react-router';
import {login as _login} from 'redux/modules/auth';
import {browserHistory} from 'react-router';

@reduxForm({
	form: 'login'
})
@connect(
	state => ({
		loginError: state.auth.loginError
	}),
	{
		login: _login,
	}
)
export default class LoginForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func,
		pristine: PropTypes.bool,
		submitting: PropTypes.bool,
		fields: PropTypes.object,
		login: PropTypes.func,
		form: PropTypes.string,
		loginError: PropTypes.object
	};

	handleSubmit = (values) => {
		this.props.login(values).then(() => {
			browserHistory.push('/documents');
		});
	};

	render() {
		const {
			handleSubmit,
			pristine,
			submitting
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleSubmit)}>
				<div className="form-group">
					<label>Username</label>
					<div>
						<Field className="form-control" name="username"
							component="input" type="text" placeholder="username" />
					</div>
				</div>
				<div className="form-group">
					<label>Password</label>
					<div>
						<Field className="form-control" name="password"
							component="input" type="password" placeholder="Password" />
					</div>
				</div>
				<button className="btn btn-success" disabled={pristine || submitting}
						type="submit">Login</button>
			</form>
		);
	}
}
