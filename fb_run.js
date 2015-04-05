var api = require("./facebook");

api.endpoint = 'https://graph.facebook.com';
api.token = 'abcdfiruweferug';

api.get('/campaigns').then(function (results) {
	console.log("get " + JSON.stringify(results));
}, function (error) {
	console.log("get " + JSON.stringify(error));
});

api.post('/campaigns', {
	'name': 'Some campaign',
  	'budget': 500
}).then(function (results) {
	console.log("post " + JSON.stringify(results));
}, function (error) {
	console.log("post " + JSON.stringify(error));
});

api.put('/campaigns/123', {
  'budget': 1000
}).then(function (results) {
	console.log("put " + JSON.stringify(results));
}, function (error) {
	console.log("put " + JSON.stringify(error));
});

api.delete('/campaigns/123').then(function (results) {
	console.log("delete " + JSON.stringify(results));
}, function (error) {
	console.log("delete " + JSON.stringify(error));
});