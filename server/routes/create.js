const express = require('express');
const { secrets } = require('../config');
const uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken');

const createRouter = express.Router();

//Exercise 2
//FILL THIS PART IN
createRouter.post('/createticket', (req, res) => {
	const accessToken = {
		payload: {
		},
		digitalSigningSecret: secrets.jwtSecret,
		options: {
				jwtid: uuidv1()
		}
	};

	
	if (accessToken.payload.sub === undefined || accessToken.payload.sub === '') {
		res.status(500).json({err: 'err: sub claim in jwt not found'});
	} else if (accessToken.payload.ans === undefined || accessToken.payload.ans === '') {
		res.status(500).json({err: 'err: ans claim in jwt not found'});
	} else {
		jwt.sign(accessToken.payload, accessToken.digitalSigningSecret, accessToken.options, (err, resultAccessToken) => {
			let headerPayloadSig = jwt.decode(resultAccessToken, {complete: true});
			res.json({jwt: resultAccessToken, headerPayloadSig: headerPayloadSig});
		});
	}
});

module.exports = createRouter;