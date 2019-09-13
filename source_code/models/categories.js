'use strict';

module.exports = (sequelize, DataTypes) => {
    var category = sequelize.define('categories',{
        user_id:{
            type:DataTypes.STRING(45),
            primaryKey: true,
            allowNull:false,
        },
        category_name:{
            type:DataTypes.STRING(20),
            primaryKey: true,
            allowNull:false,
        },
    }, {timestamps: false , paranoid: false,})

    category.associate = function(models) {
        category.belongsTo(models.users, {foreignKey:'user_id'});
        category.hasMany(models.todoes);
    };

    return category;
};