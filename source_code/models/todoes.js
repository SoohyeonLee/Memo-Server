'use strict';

module.exports = (sequelize, DataTypes) => {
    var todo = sequelize.define('todoes',{
        todo_id:{
            type:DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull:false,
            autoIncrement: true,
        },
        user_id:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        category_name:{
            type:DataTypes.STRING(20),
            allowNull:true,
        },
        todo_text:{
            type:DataTypes.STRING(200),
            allowNull:false,
        },
        todo_create_time:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        todo_update_time:{
            type:DataTypes.DATE,
            allowNull:true,
        },
        todo_target_time:{
            type:DataTypes.DATE,
            allowNull:true,
        },
        todo_check:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:'0',
        },
    }, {timestamps: false , paranoid: false,})

    todo.associate = function(models) {
        todo.belongsTo(models.users, {foreignKey: 'user_id'});
        todo.belongsTo(models.categories, {foreignKey: 'category_name'});
    };

    return todo;
}; 