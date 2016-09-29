import React, { Component } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import VideoThumbnail from './VideoThumbnail';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class Home extends Component {
	render() {
		const styles = require('./Home.scss');
		// require the logo image both from client and server
		// const logoImage = require('./logo.png');
		return (
			<div className={styles.home}>
				<Helmet title="Social Samurai"/>
				<h1 className={styles['homepage-title']}>My Roadmap</h1>
				<Grid>
					<Row>
						<Col xs={6} md={4}>
							<VideoThumbnail src="../../assets/handshake.png" description="Handshake"/>
						</Col>
						<Col xs={6} md={4}>
							<VideoThumbnail src="../../assets/hugging.png" description="Hugging"/>
						</Col>
						<Col xs={6} md={4}>
							<VideoThumbnail src="../../assets/shouting.png" description="Shouting"/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
