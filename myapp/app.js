var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
	console.log('App is running on port:', port);
});
