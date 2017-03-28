/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dictionarys', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    org_nane: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fundname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cgzzxs: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'dictionarys'
  });
};
