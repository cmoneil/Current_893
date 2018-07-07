/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playlists', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    top893_rank: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'currents',
        key: 'rank'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'playlists'
  });
};
