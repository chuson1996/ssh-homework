import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded } from 'redux/modules/auth';
import {
		App,
		Home,
		NotFound,
		Login,
		Documents,
		Document,
	} from 'containers';
import combineMiddlewaresGenerator from 'utils/combineMiddlewaresGenerator';

export default (store) => {
	const combine = combineMiddlewaresGenerator(store);


	const requireLogin = (_store, nextState, action) => {
		const checkAuth = () => {
			const { auth: { loaded }} = _store.getState();
			if (!loaded) {
				// oops, not logged in, so can't be here!
				action.replace('/login');
			}
			action.next();
		};

		checkAuth();
	};

	const isLoggedIn = (_store, nextState, action) => {
		const checkAuth = () => {
			const { auth: { loaded }} = _store.getState();
			if (loaded) {
				action.replace('/');
			}
			action.next();
		};

		checkAuth();
	};

	return (
		<Route path="/" component={App}>
			{ /* Home (main) route */ }
			<IndexRoute
				// onEnter={combine([requireLogin])}
				component={Home} />

			<Route
				path="/login"
				onEnter={combine([isLoggedIn])}
				component={Login} />

			<Route
				path="/documents"
				onEnter={combine([requireLogin])}
				component={Documents} />

			<Route
				path="/documents/:docId"
				onEnter={combine([requireLogin])}
				component={Document} />

			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
