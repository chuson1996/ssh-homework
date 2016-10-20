import React, { Component, PropTypes } from 'react';

export default class CustomHighlightText extends Component {
	static propTypes = {
		text: PropTypes.string,
		highlightClassName: PropTypes.string,
		searchWordsResult: PropTypes.array
	};

	render() {
		const { text: textToHighlight,
			highlightClassName,
			searchWordsResult } = this.props;

		let chunks;
		if (searchWordsResult && searchWordsResult.length) {
			chunks = searchWordsResult.reduce((result, coor, index, arr) => {
				let _result = [...result];
				if (index === 0 && coor[0] !== 0) {
					_result = [..._result, {
						start: 0,
						end: coor[0] - 1
					}];
				}
				if (index !== 0) {
					_result = [..._result, {
						end: coor[0],
						start: arr[index - 1][1]
					}];
				}
				_result = [..._result, {
					start: coor[0],
					end: coor[1],
					highlight: true
				}];
				if (index === arr.length - 1) {
					_result = [..._result, {
						start: coor[1],
						end: textToHighlight.length
					}];
				}
				return _result;
			}, []);
		} else {
			chunks = [{
				start: 0,
				end: textToHighlight.length
			}];
		}

		return (
			<span>
				{chunks.map((chunk, index) => {
					const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

					if (chunk.highlight) {
						return (
							<mark
								className={highlightClassName}
								key={index}
							>
								{text}
							</mark>
						);
					}
					return (
						<span key={index}>{text}</span>
					);
				})}
			</span>
		);
	}
}
