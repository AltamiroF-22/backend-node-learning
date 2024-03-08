require("./src/data/database");
const express = require("express");
const dotEnv = require("dotenv");
const connectToDatbase = require("./src/data/database");
connectToDatbase();

const app = express();
dotEnv.config();

const pictureRouter = require("./src/routes/pictures");

app.use('/pictures', pictureRouter)

const PORT = 8080;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
