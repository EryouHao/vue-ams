/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_psd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_account: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_state: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    right_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
