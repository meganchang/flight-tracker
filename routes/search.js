var express = require('express');
var router = express.Router();
var request = require('request');

var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDhK0vgQ8LGSaBnyGFdDahRPtARtYZSBfU';

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('search', {
		title: 'Search'
	});
});

router.post('/', function(req, res) {
	var origin = req.body.origin;
	var destination = req.body.destination;
	var date = req.body.date;

	var requestBody = JSON.stringify({
		"request": {
			"passengers": {
				"adultCount": 1
			},
			"slice": [{
				"origin": origin,
				"destination": destination,
				"date": date
			}]
		}
	})
	var options = {
		url: url,
		method: 'POST',
		headers: {
			'content-type': 'application/JSON'
		},
		body: requestBody
	}

	request(options, function(err, response, body){
		if (err) {res.send(err);}
		else {
			res.send(body);
		}
	});
});

module.exports = router;