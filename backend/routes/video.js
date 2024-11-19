import express from "express";
import { recommendedVideos } from "../controllers/user.js";
import { protect } from "../middlewares/auth.js";
import {
  newVideo,
  getVideo,
  likeVideo,
  dislikeVideo,
  addComment,
  newView,
  searchVideo,
} from "../controllers/video.js";

const router = express.Router();

router.route("/").post(protect, newVideo);
router.route("/").get(recommendedVideos);
router.route("/search").get(protect, searchVideo);
router.route("/:id").get(protect, getVideo);
router.route("/:id/like").get(protect, likeVideo);
router.route("/:id/dislike").get(protect, dislikeVideo);
router.route("/:id/comment").post(protect, addComment);
router.route("/:id/view").get(protect, newView);

export default router;
