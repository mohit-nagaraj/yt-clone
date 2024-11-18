import { Sequelize, DataTypes } from "sequelize";

const SubscriptionModel = (sequelize) =>
  sequelize.define("Subscription", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    subscriber: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

export default SubscriptionModel;
