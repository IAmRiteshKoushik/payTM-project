const express = require("express");
const mainRouter = require("./routes/index.js");

const app = express();

// MongoDB url
// mongodb+srv://ritesh123:ritesh123@cluster0.qrw27vn.mongodb.net/

app.use(express.json());

app.use("api/v1", mainRouter);

app.listen(3000);
