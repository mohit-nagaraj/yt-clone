import express from "express";
import {
  getUsers,
  removeUser,
  getVideos,
  removeVideo,
} from "../controllers/admin.js";
import { admin, protect } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.route("/users").get(protect, admin, getUsers);
adminRouter.route("/videos").get(protect, admin, getVideos);
adminRouter.route("/users/:username").delete(protect, admin, removeUser);
adminRouter.route("/videos/:id").delete(protect, admin, removeVideo);

export default adminRouter;
