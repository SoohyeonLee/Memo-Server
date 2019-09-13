'use strict';

module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('users',{
        user_id:{
            type:DataTypes.STRING(45),
            primaryKey: true,
            allowNull:false,
        },
        user_pwd:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        user_name:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
    }, {timestamps: false , paranoid: false,})

    user.associate = function(models) {
        user.hasMany(models.todoes);
        user.hasMany(models.categories);
    };

    return user;
}; 