import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { load as loadDocuments,
	isLoaded as areDocumentsLoaded } from 'redux/modules/documents';
import Table from 'react-bootstrap/lib/Table';
import {Link} from 'react-router';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const state = getState();
		const token = state.auth.data.token;
		const promises = [];
		if (!areDocumentsLoaded(state)) {
			promises.push(dispatch(loadDocuments(token)));
		}
		return Promise.all(promises);
	}
}])
@connect(
	(state) => ({
		documents: state.documents.data
	}),
	null
)
export default class Documents extends Component {
	static propTypes = {
		documents: PropTypes.array
	};

	render() {
		const {documents} = this.props;
		return (
			<Table striped bordered condensed hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Size</th>
					</tr>
				</thead>
				<tbody>
					{documents && documents.length && documents.map((doc) => (<tr key={doc.id}>
						<td>{doc.id}</td>
						<td><Link to={`/documents/${doc.id}`}>{doc.name}</Link></td>
						<td>{doc.size}</td>
					</tr>))}
				</tbody>
			</Table>
		);
	}
}
