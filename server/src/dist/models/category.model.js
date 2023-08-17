"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const Category = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
        category_id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    return Category;
};
exports.Category = Category;
