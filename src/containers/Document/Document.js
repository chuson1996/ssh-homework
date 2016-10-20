import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { load as loadDocument, search as _search } from 'redux/modules/document';
import last from 'lodash/last';
// import Highlighter from 'react-highlight-words';
import {CustomHighlightText} from 'components';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

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
		token: get(state.auth.data, 'token'),
		searchResult: get(state.document, 'searchResult')
	}),
	{
		search: _search
	}
)
class Document extends Component {
	static propTypes = {
		doc: PropTypes.string,
		handleSubmit: PropTypes.func,
		params: PropTypes.object,
		token: PropTypes.string,
		search: PropTypes.func,
		searchResult: PropTypes.array
	};

	search = (e) => {
		if (e) e.preventDefault();
		const { search, token, params: { docId } } = this.props;
		const keyword = get(this.state, 'keyword', '');
		if (keyword) search(token, docId, keyword);
	}

	render() {
		const {
			doc,
			searchResult
		} = this.props;
		let searchWords = get(this.state, 'keyword');
		searchWords = searchWords ? [searchWords] : [];
		const styles = require('./Document.scss');

		return (
			<div>
				<Helmet title={`ssh-homework`}/>
				<form onSubmit={this.search} className={`${styles.keywordInput}`}>
					<input
						className={`form-control`}
						name="keyword"
						ref={(_elem) => this.keyword = _elem}
						type="text"
						onKeyUp={() => {
							this.setState({
								keyword: this.keyword.value
							});
						}}
						placeholder="Search keyword" />
					<button type="submit" className="btn btn-default">Search</button>
				</form>
				<CustomHighlightText
					highlightClassName="text-danger"
					text={doc}
					searchWordsResult={searchResult || []} />
				{/* Alternative way to do word searching without having to call the api. To see how this works, comment out line 76-79 and uncomment line 6, 81-84 */}
				{/* <Highlighter
					highlightClassName="text-danger"
					searchWords={searchWords}
					textToHighlight={doc} /> */}
			</div>
		);
	}
}

export default withRouter(Document);
