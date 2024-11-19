import express from "express";
import { login, signup, me } from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/me").get(protect, me);

export default authRouter;
