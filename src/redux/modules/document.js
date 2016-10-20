// import config from '../../config';
const LOAD = 'ssh-homework/document/LOAD';
const LOAD_SUCCESS = 'ssh-homework/document/LOAD_SUCCESS';
const LOAD_FAIL = 'ssh-homework/document/LOAD_FAIL';
const SEARCH = 'ssh-homework/document/SEARCH';
const SEARCH_SUCCESS = 'ssh-homework/document/SEARCH_SUCCESS';
const SEARCH_FAIL = 'ssh-homework/document/SEARCH_FAIL';

const initialState = {
	loaded: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true,
				searchResult: []
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
		case SEARCH:
			return {
				...state,
				searching: false,
				searchResult: []
			};
		case SEARCH_SUCCESS:
			return {
				...state,
				searching: false,
				searchResult: action.result
			};
		case SEARCH_FAIL:
			return {
				...state,
				searching: false,
				error: action.error
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.document && globalState.document.loaded;
}

export function load(token, docId) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/document/${docId}/text`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	};
}

export function search(token, docId, keyword) {
	return {
		types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
		promise: (client) => client.get(`/document/${docId}/text?search=${keyword}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	};
}
