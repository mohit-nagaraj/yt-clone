import express from "express";
import {
  getUsers,
  removeUser,
  getVideos,
  removeVideo,
} from "../controllers/admin.js";
import { admin, protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/users").get(protect, admin, getUsers);
router.route("/videos").get(protect, admin, getVideos);
router.route("/users/:username").delete(protect, admin, removeUser);
router.route("/videos/:id").delete(protect, admin, removeVideo);

export default router;
