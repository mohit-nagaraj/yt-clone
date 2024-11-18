import { Sequelize, DataTypes } from "sequelize";

const VideoLikeModel = (sequelize) =>
  sequelize.define("VideoLike", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

export default VideoLikeModel;
