// import config from '../../config';
const LOAD = 'ssh-homework/auth/LOAD';
const LOAD_SUCCESS = 'ssh-homework/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'ssh-homework/auth/LOAD_FAIL';
const LOGIN = 'ssh-homework/auth/LOGIN';
const LOGIN_SUCCESS = 'ssh-homework/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'ssh-homework/auth/LOGIN_FAIL';
const LOGOUT = 'ssh-homework/auth/LOGOUT';

const initialState = {
	loaded: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.result,
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};
		case LOGIN:
			return {
				...state,
				loggingIn: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loggingIn: false,
				loaded: true,
				data: action.result
			};
		case LOGIN_FAIL:
			return {
				...state,
				loggingIn: false,
				data: null,
				loginError: action.error
			};
		case LOGOUT:
			return {
				...state,
				data: null,
				loaded: false
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.auth && globalState.auth.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadAuth')
	};
}

export function login({ username, password }) {
	return {
		types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
		promise: (client) => client.post('/login', {
			data: { username, password }
		})
	};
}

export function logout() {
	document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
	return {
		type: LOGOUT
	};
}
