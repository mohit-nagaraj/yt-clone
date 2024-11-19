import { User, Video } from "../sequelize.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstname", "lastname", "username", "email"],
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    await User.destroy({
      where: { username: req.params.username },
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeVideo = async (req, res) => {
  try {
    await Video.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      attributes: ["id", "title", "description", "url", "thumbnail", "userId"],
    });

    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getUsers, removeUser, removeVideo, getVideos };
