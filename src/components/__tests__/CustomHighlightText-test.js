import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { CustomHighlightText } from 'components';

describe('CustomHighlightText', () => {
	const renderer = renderIntoDocument(
		<CustomHighlightText
			highlightClassName="text-danger"
			searchWordsResult={[[2, 4], [22, 24]]}
			text={'I am the strongest. I am confident.'}/>
	);
	const dom = ReactDOM.findDOMNode(renderer);

	it('should render correctly', () => {
		return expect(renderer).to.be.ok;
	});

	it('should render with correct value', () => {
		const text = dom.getElementsByTagName('mark')[0].textContent;
		expect(text).to.equal('am');
	});

	it('should render the correct className', () => {
		const elem = dom.getElementsByTagName('mark')[0];
		expect(elem.className).to.include('text-danger');
	});
});
