import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { load as loadDocument } from 'redux/modules/document';
import last from 'lodash/last';
import Highlighter from 'react-highlight-words';
import get from 'lodash/get';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const state = getState();
		const token = state.auth.data.token;
		const pathname = state.routing.locationBeforeTransitions.pathname;
		const docId = last(pathname.split('/'));
		const promises = [];
		promises.push(dispatch(loadDocument(token, docId)));
		return Promise.all(promises);
	}
}])
@connect(
	(state) => ({
		doc: state.document.data,
		token: get(state.auth.data, 'token')
	}),
	null
)
export default class Document extends Component {
	static propTypes = {
		doc: PropTypes.string,
		handleSubmit: PropTypes.func,
		params: PropTypes.object,
		token: PropTypes.string,
	};

	render() {
		const {
			doc,
		} = this.props;
		let searchWords = get(this.state, 'keyword');
		searchWords = searchWords ? [searchWords] : [];
		const styles = require('./Document.scss');

		return (
			<div>
				<input
					className={`${styles.keywordInput} form-control`}
					name="keyword"
					ref={(_elem) => this.keyword = _elem}
					type="text"
					onChange={() => this.setState({
						keyword: this.keyword.value
					})}
					placeholder="Search keyword" />
				<Highlighter
					highlightClassName="text-danger"
					searchWords={searchWords}
					textToHighlight={doc} />
			</div>
		);
	}
}
