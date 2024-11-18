import { Sequelize, DataTypes } from "sequelize";

const CommentModel = (sequelize) =>
  sequelize.define("Comment", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

export default CommentModel;
