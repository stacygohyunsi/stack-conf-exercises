const express = require('express');
const { secrets } = require('../config');
const uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken');

const loginRouter = express.Router();

//Exercise 2
//FILL THIS PART IN
loginRouter.post('/signin', (req, res) => {
	const accessToken = {
		payload: {
				iss: 'stackconf-auth-service',
				aud: 'stackconf-api-service', 
				sub: 'Stacy', // Fill in your name here, 
				ans: 'I know!!'
		},
		digitalSigningSecret: secrets.jwtSecret,
		options: {
				jwtid: uuidv1(),
				algorithm: 'HS256',
				expiresIn: 60 * 60
		}
	};
	
	// if (accessToken.payload.sub === undefined) {
	// 	console.log('hi');
	// 	res.status(500).json('Not found');
	// }
	jwt.sign(accessToken.payload, accessToken.digitalSigningSecret, accessToken.options, (err, resultAccessToken) => {
		res.cookie('jwt', resultAccessToken, {domain:'localhost'});
		let headerPayloadSig = jwt.decode(resultAccessToken, {complete: true});
		res.json({jwt: resultAccessToken, headerPayloadSig: headerPayloadSig});
	});
});

module.exports = loginRouter;