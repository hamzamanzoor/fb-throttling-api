var request = require('request');
var fs = require("fs");
var Q = require("q");
var RateLimiter = require('limiter').RateLimiter;

var limiter = new RateLimiter(600,600000);

exports.endpoint = '';
exports.token = '';

exports.get= function(url) {
	var deferred = Q.defer();
	var getURL=exports.endpoint + url + "?&access_token=" + exports.token;
	limiter.removeTokens(1, function() {
		request.get({url:getURL, json:true}, function (err, response, body) {
			if(err)
			{
				hasError(err,deferred);
			}
			else
			{
				deferred.resolve(body);
			}
		});
	});
	return deferred.promise;
};

exports.post= function(url, form) {
	var deferred = Q.defer();
	var postURL=exports.endpoint + url + "?&access_token=" + exports.token;
	limiter.removeTokens(1, function() {
		request({method: 'POST', url:postURL, form:form, json:true}, function (err, response, body) {
			if(err)
			{
				hasError(err,deferred);
			}
			else
			{
				deferred.resolve(body);
			}
		});
	});
	return deferred.promise;
};



exports.put= function(url, form) {
	var deferred = Q.defer();
	var putURL=exports.endpoint + url + "?&access_token=" + exports.token;
	limiter.removeTokens(1, function() {
		request({method: 'PUT', url:putURL, form:form, json:true}, function (err, response, body) {
			if(err)
			{
				hasError(err,deferred);
			}
			else
			{
				deferred.resolve(body);
			}
		});
	});
	return deferred.promise;
};


exports.delete= function(url) {
	var deferred = Q.defer();
	var delURL=exports.endpoint + url + "?&access_token=" + exports.token;
	limiter.removeTokens(1, function() {
		request.del(delURL, function (err, response, body) {
			if(err)
			{
				hasError(err,deferred);
			}
			else
			{
				deferred.resolve(body);
			}
		});
	});
	return deferred.promise;
};


function hasError(err, deferred) {
	fs.appendFileSync(
		"request_log.txt",
		new Date().toUTCString()
		+ " ----- "
		+ JSON.stringify(err) + "\n"
	);
	deferred.reject(err);
};