import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
