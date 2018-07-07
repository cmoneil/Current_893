/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('currents', {
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    artist: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    song: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    album: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'currents'
  });
};
