import { Op } from "sequelize";
import { User, Subscription, Video } from "../sequelize.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({ success: true, data: token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "The email is not yet registered" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "The password does not match" });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({ success: true, data: token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "firstname",
        "lastname",
        "username",
        "email",
        "avatar",
        "cover",
        "channelDescription",
      ],
    });

    const subscriptions = await Subscription.findAll({
      where: { subscriber: req.user.id },
    });

    const userIds = subscriptions.map((sub) => sub.subscribeTo);

    const channels = await User.findAll({
      attributes: ["id", "avatar", "username"],
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });

    user.setDataValue("channels", channels);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { signup, login, me };
