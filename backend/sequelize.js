import pg from "pg";
import { Sequelize, DataTypes } from "sequelize";
import UserModel from "./models/User.js";
import VideoModel from "./models/Video.js";
import VideoLikeModel from "./models/VideoLike.js";
import CommentModel from "./models/Comment.js";
import SubscriptionModel from "./models/Subscription.js";
import ViewModel from "./models/View.js";

pg.defaults.ssl = true;
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize);
const Video = VideoModel(sequelize);
const VideoLike = VideoLikeModel(sequelize);
const Comment = CommentModel(sequelize);
const Subscription = SubscriptionModel(sequelize);
const View = ViewModel(sequelize);

// video - user association
Video.belongsTo(User, { foreignKey: "userId" });

// likes association
User.belongsToMany(Video, { through: VideoLike, foreignKey: "userId" });
Video.belongsToMany(User, { through: VideoLike, foreignKey: "videoId" });

// comments association
User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User, { foreignKey: "userId" });

Video.hasMany(Comment, {
  foreignKey: "videoId",
});

// subscription association
User.hasMany(Subscription, {
  foreignKey: "subscribeTo",
});

// views association
User.belongsToMany(Video, { through: View, foreignKey: "userId" });
Video.belongsToMany(User, { through: View, foreignKey: "videoId" });

export { User, Video, VideoLike, Comment, Subscription, View };
