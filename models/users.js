/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    accesstoken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
  return Users;
};
