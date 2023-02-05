import { Sequelize, Model, DataTypes } from "sequelize";
import Account from "./Account.model.js";

class Transaction extends Model {
    declare id: number;
    declare discordId: string;
    declare wallet: number
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
    console.log('tran')
    Transaction.belongsTo(Account, {as:"from"})
    Transaction.belongsTo(Account, {as:"to"})
}

export default Transaction;