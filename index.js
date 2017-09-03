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
	
    return res.json({
        speech: retruntext,
        displayText: retruntext,
        source: 'webhook-sendemail'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
