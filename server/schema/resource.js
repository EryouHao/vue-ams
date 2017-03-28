/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resource', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type_num: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storage_place: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'resource'
  });
};
