const express = require('express');
var cors = require('cors');
const { serverConfig } = require('./server/config');
const cookieParser = require('cookie-parser');
const loginRouter = require('./server/routes/login');

let app = express();

app.use(cors());
app.use(cookieParser());

app.use('/api', loginRouter);

app.listen(serverConfig.port, () => console.log(`Authorisation Server is listening on port ${serverConfig.port}!`));