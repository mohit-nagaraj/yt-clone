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

const videoRouter = express.Router();

videoRouter.route("/").post(protect, newVideo);
videoRouter.route("/").get(recommendedVideos);
videoRouter.route("/search").get(protect, searchVideo);
videoRouter.route("/:id").get(protect, getVideo);
videoRouter.route("/:id/like").get(protect, likeVideo);
videoRouter.route("/:id/dislike").get(protect, dislikeVideo);
videoRouter.route("/:id/comment").post(protect, addComment);
videoRouter.route("/:id/view").get(protect, newView);

export default videoRouter;
