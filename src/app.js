const express = require("express")
const bodyparser = require('body-parser');
const router = require("./routes/routing");
const requestLogger = require("./utilities/requestlogger");
const errorLogger = require("./utilities/errorlogger");

const app = express();
app.use(bodyparser.json());

app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);

app.listen(3000);
console.log('listening to port 3000');