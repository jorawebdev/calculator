var request = require('request');
var fs = require('fs');

exports.index = function(req, res) {
  res.render('index', { title: 'Pocket Calculator'});
};

exports.power = function(req, res) {
	console.log(req.body);
	var result = Math.pow(Number(req.body.last_result), Number(req.body.current_result));
	res.send({result:result,last_operation:''});
};
exports.divide = function(req, res) {
	var result = Number(req.body.last_result) / Number(req.body.current_result);
	res.send({result:result,last_operation:''});
};
exports.multiply = function(req, res) {
	var result = Number(req.body.last_result) * Number(req.body.current_result);
	res.send({result:result,last_operation:''});
};
exports.minus = function(req, res) {
	var result = Number(req.body.last_result) - Number(req.body.current_result);
	res.send({result:result,last_operation:''});
};
exports.plus = function(req, res) {
	console.log(req.body, req.body.last_operation);
	var result = Number(req.body.last_result) + Number(req.body.current_result);
	console.log(result);
	res.send({result:result,last_operation:''});
};