const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    healthy: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    howto: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
