import { Sequelize, Model, DataTypes } from "sequelize";
import Account from "./Account.model.js";

class Transaction extends Model {
    declare id: number;
    declare fromId: number;
    declare toId: number
}

export function load(database: Sequelize) {
    Transaction.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // from association (identifier)
        // to association (identifier)
        from: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    
    }, {
        sequelize: database
    })
}

export function setRelations() {
    // Transaction.belongsTo(Account, {as:"from"})
    // Transaction.belongsTo(Account, {as:"to"})
}

export default Transaction;