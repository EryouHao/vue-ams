/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assets', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    asset_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    asset_bill: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buy_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    asset_price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    asset_standard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_leavedate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    asset_submitdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    asset_usedirection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_leavenum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_organization: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_purchaser: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_attachnum: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    asset_attachamount: {
      type: "DOUBLE",
      allowNull: true
    },
    funds_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    asset_signature: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_imgurl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_orgid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    asset_state: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    asset_mark: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'assets'
  });
};
