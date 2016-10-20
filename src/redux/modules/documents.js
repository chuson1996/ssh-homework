// import config from '../../config';
const LOAD = 'ssh-homework/documents/LOAD';
const LOAD_SUCCESS = 'ssh-homework/documents/LOAD_SUCCESS';
const LOAD_FAIL = 'ssh-homework/documents/LOAD_FAIL';

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
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.documents && globalState.documents.loaded;
}

export function load(token) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/documents', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	};
}
