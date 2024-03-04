const dotEnv = require("dotenv");
const connectToDatbase = require("./src/database/connect");

dotEnv.config();
connectToDatbase();

require("./module/express");



// require('./module/http')