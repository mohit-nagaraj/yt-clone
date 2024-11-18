import { Sequelize, DataTypes } from "sequelize";

const ViewModel = (sequelize) =>
  sequelize.define("View", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  });

export default ViewModel;
