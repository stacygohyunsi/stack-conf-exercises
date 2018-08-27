const express = require('express');
var cors = require('cors');
const uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

let app = express();
app.use(cors());
app.use(cookieParser());

//Exercise 1
app.post('/verify', function (req, res) {
	let accessToken = req.headers.authorization.split(' ')[1];
	jwt.verify(accessToken, 'govtechstackconf', function(err, decoded) {
			if (err) {
					res.send('Oops, you are NOT authorised to view this page.');
			} else {
					res.send('Congrats, you are authorised to view this page.');
			}
	});
});


//Exercise 2
//FILL THIS PART IN
app.post('/signin', (req, res) => {
	const accessToken = {
		payload: {
				iss: 'service-a',
				aud: 'service-b', 
				sub: 'Your name' // Fill in your name here
		},
		digitalSigningSecret: 'donttellyou',
		options: {
				jwtid: uuidv1(),
				algorithm: 'HS256',
				expiresIn: 60
		}
	};
	
	jwt.sign(accessToken.payload, accessToken.digitalSigningSecret, accessToken.options, (err, accessToken) => {
		res.cookie('jwt', accessToken, {domain:'localhost'});
		res.json(accessToken);
	});
});


app.get('/showAnswer', (req, res) => {
	jwt.verify(req.cookies.jwt, 'donttellyou', function(err, decoded) {
		if (err) {
			res.json('Sorry, we dont have the right answer, try again?')
		} else {
			res.json(`Hi ${decoded.sub}, the answer is: It had a hard drive`);
		}
	});
});

app.listen(9000, function () {    
	console.log("Example app listening at 9000");
});
