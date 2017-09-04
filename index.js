'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/sendmail', function(req, res) {
    var mailto = req.body.result && req.body.result.parameters && req.body.result.parameters.emailto ? req.body.result.parameters.emailto : "Whom should I send the email to"
	var subject = req.body.result && req.body.result.parameters && req.body.result.parameters.subject ? req.body.result.parameters.subject : "What the subject should be"
	var date = req.body.result && req.body.result.parameters && req.body.result.parameters.date ? req.body.result.parameters.date : "When"
	var content = req.body.result && req.body.result.parameters && req.body.result.parameters.Content ? req.body.result.parameters.Content : "What should the content of the mail be"
	
	var returntext = "Mail has been sent to" +mailto + "with subject" +subject + "on" +date + "and content is" +content
	var http = require("http");
	var post_data = '{"to":"vijayalakshmi.gopalakrishna@sap.com","subject":"okay","body":"9999"}'; 
    var options = {
		hostname: '10.52.104.158',
		port: 8080,
		path: '/sendmail/outlook',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	};
	var req = http.request(options, function(res) {
		console.log('Status: ' + res.statusCode);
		console.log('Headers: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (body) {
			console.log('Body: ' + body);
		});
	});
	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	req.write(post_data);
	req.end(); 
		  
    return res.json({
        speech: returntext,
        displayText: returntext,
        source: 'webhook-sendemail'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
