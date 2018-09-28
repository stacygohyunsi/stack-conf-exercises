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

	if (!accessToken.options.algorithm) {
		res.status(500).json({ err: 'options error: signature algorithm not found' });
	} else if (!accessToken.options.expiresIn) {
		res.status(500).json({ err: 'options error: jwt expiry not found' });
	} else {
		jwt.sign(accessToken.payload, accessToken.digitalSigningSecret, accessToken.options, (err, resultAccessToken) => {
		  let headerPayloadSig = jwt.decode(resultAccessToken, { complete: true });
		  res.json({ jwt: resultAccessToken, headerPayloadSig: headerPayloadSig });
		});
	}
});

module.exports = createRouter;