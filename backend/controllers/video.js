import { Op } from "sequelize";
import {
  User,
  Video,
  VideoLike,
  Comment,
  View,
  Subscription,
} from "../sequelize.js";

const newVideo = async (req, res) => {
  try {
    const video = await Video.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      ],
    });

    if (!video) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No video found for ID - ${req.params.id}`,
        });
    }

    const comments = await video.getComments({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "text", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      ],
    });

    const isLiked = await VideoLike.findOne({
      where: {
        [Op.and]: [
          { videoId: req.params.id },
          { userId: req.user.id },
          { like: 1 },
        ],
      },
    });

    const isDisliked = await VideoLike.findOne({
      where: {
        [Op.and]: [
          { videoId: req.params.id },
          { userId: req.user.id },
          { like: -1 },
        ],
      },
    });

    const commentsCount = await Comment.count({
      where: {
        videoId: req.params.id,
      },
    });

    const likesCount = await VideoLike.count({
      where: {
        [Op.and]: [{ videoId: req.params.id }, { like: 1 }],
      },
    });

    const dislikesCount = await VideoLike.count({
      where: {
        [Op.and]: [{ videoId: req.params.id }, { like: -1 }],
      },
    });

    const views = await View.count({
      where: {
        videoId: req.params.id,
      },
    });

    const isSubscribed = await Subscription.findOne({
      where: {
        subscriber: req.user.id,
        subscribeTo: video.userId,
      },
    });

    const isViewed = await View.findOne({
      where: {
        userId: req.user.id,
        videoId: video.id,
      },
    });

    const subscribersCount = await Subscription.count({
      where: { subscribeTo: video.userId },
    });

    const isVideoMine = req.user.id === video.userId;

    // likesCount, disLikesCount, views
    video.setDataValue("comments", comments);
    video.setDataValue("commentsCount", commentsCount);
    video.setDataValue("isLiked", !!isLiked);
    video.setDataValue("isDisliked", !!isDisliked);
    video.setDataValue("likesCount", likesCount);
    video.setDataValue("dislikesCount", dislikesCount);
    video.setDataValue("views", views);
    video.setDataValue("isVideoMine", isVideoMine);
    video.setDataValue("isSubscribed", !!isSubscribed);
    video.setDataValue("isViewed", !!isViewed);
    video.setDataValue("subscribersCount", subscribersCount);

    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No video found for ID - ${req.params.id}`,
        });
    }

    const liked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: 1,
      },
    });

    const disliked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: -1,
      },
    });

    if (liked) {
      await liked.destroy();
    } else if (disliked) {
      disliked.like = 1;
      await disliked.save();
    } else {
      await VideoLike.create({
        userId: req.user.id,
        videoId: req.params.id,
        like: 1,
      });
    }

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No video found for ID - ${req.params.id}`,
        });
    }

    const liked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: 1,
      },
    });

    const disliked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: -1,
      },
    });

    if (disliked) {
      await disliked.destroy();
    } else if (liked) {
      liked.like = -1;
      await liked.save();
    } else {
      await VideoLike.create({
        userId: req.user.id,
        videoId: req.params.id,
        like: -1,
      });
    }

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No video found for ID - ${req.params.id}`,
        });
    }

    const comment = await Comment.create({
      text: req.body.text,
      userId: req.user.id,
      videoId: req.params.id,
    });

    const User = {
      id: req.user.id,
      avatar: req.user.avatar,
      username: req.user.username,
    };

    comment.setDataValue("User", User);

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const newView = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No video found for ID - ${req.params.id}`,
        });
    }

    const viewed = await View.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
      },
    });

    if (viewed) {
      return res
        .status(400)
        .json({ success: false, message: "You already viewed this video" });
    }

    await View.create({
      userId: req.user.id,
      videoId: req.params.id,
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchVideo = async (req, res) => {
  try {
    if (!req.query.searchterm) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the searchterm" });
    }

    const videos = await Video.findAll({
      include: { model: User, attributes: ["id", "avatar", "username"] },
      where: {
        [Op.or]: {
          title: {
            [Op.substring]: req.query.searchterm,
          },
          description: {
            [Op.substring]: req.query.searchterm,
          },
        },
      },
    });

    if (!videos.length) {
      return res.status(200).json({ success: true, data: videos });
    }

    for (const video of videos) {
      const views = await View.count({ where: { videoId: video.id } });
      video.setDataValue("views", views);
    }

    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  newVideo,
  getVideo,
  likeVideo,
  dislikeVideo,
  addComment,
  newView,
  searchVideo,
};
