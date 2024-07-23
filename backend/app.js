import express from "express";
import mainRouter from "./routes/index.js";

const app = express();

// MongoDB url
// mongodb+srv://ritesh123:ritesh123@cluster0.qrw27vn.mongodb.net/

app.use(express.json());
app.use(cors());

app.use("api/v1", mainRouter);

app.listen(3000, console.log("Server started on port 3000"));
