const express = require('express');
var cors = require('cors');
const uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

let app = express();
app.use(cors());
app.use(cookieParser());

//Exercise 2
//FILL THIS PART IN
app.post('/signin', (req, res) => {
	const accessToken = {
		payload: {
				iss: 'service-a',
				// aud: 'service-b', 
				// sub: 'Stacy', // Fill in your name here, 
				// ans: 'A car'
		},
		digitalSigningSecret: 'donttellyou',
		options: {
				jwtid: uuidv1(),
				algorithm: 'HS256',
				expiresIn: 60
		}
	};
	
	if (accessToken.payload.sub === undefined) {
		console.log('hi');
    throw Error ('cannot divide by zero');
	}
	jwt.sign(accessToken.payload, accessToken.digitalSigningSecret, accessToken.options, (err, resultAccessToken) => {
		res.cookie('jwt', resultAccessToken, {domain:'localhost'});
		let headerPayloadSig = jwt.decode(resultAccessToken, {complete: true});
		res.json({jwt: resultAccessToken, headerPayloadSig: headerPayloadSig});
	});
});

app.listen(9000, function () {    
	console.log("Example app listening at 9000");
});
