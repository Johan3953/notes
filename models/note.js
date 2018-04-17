module.exports = function(sequelize, DataTypes) {
  
  var note = sequelize.define("note", {
      beerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      beerType: {
          type: DataTypes.STRING
      },
      rating: {
          type: DataTypes.INTEGER
      },
      notes: {
          type: DataTypes.STRING
      }, 
      UserId: {
          type:DataTypes.INTEGER
      }
  },
  {
      // User notes
      classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a note can't be made
          note.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return note;
};