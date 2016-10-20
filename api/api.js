import express from 'express';
import http from 'http';
import SocketIo from 'socket.io';

const app = express();
const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
	const runnable = app.listen(config.apiPort, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
		console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
	});

	io.on('connection', (socket) => {
		socket.emit('news', {msg: `'Hello World!' from server`});

		socket.on('history', () => {
			for (let index = 0; index < bufferSize; index++) {
				const msgNo = (messageIndex + index) % bufferSize;
				const msg = messageBuffer[msgNo];
				if (msg) {
					socket.emit('msg', msg);
				}
			}
		});

		socket.on('msg', (data) => {
			data.id = messageIndex;
			messageBuffer[messageIndex % bufferSize] = data;
			messageIndex++;
			io.emit('msg', data);
		});
	});
	io.listen(runnable);
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}

// error handlers
// catch unauthorised errors
app.use((err, req, res) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({
			message: `${err.name}: ${err.message}`
		});
	}
});
