import { Sequelize, Model, DataTypes } from "sequelize";
import Transaction from "./Transaction.model.js"

class Account extends Model {
    declare id: number;
    declare identifier: string;
    declare wallet: number
    declare isApplication: boolean

    buildRequest() {
        return {
            identifier: this.identifier,
            wallet: this.wallet,
            isApplication: this.isApplication
        }
    }
}

export function load(database: Sequelize) {
    Account.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wallet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 500
        },
        isApplication: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    
    }, {
        sequelize: database
    })
}

export function setRelations() {
    // Account.hasMany(Transaction, {as:'from', foreignKey: 'fromId'})
    // Account.hasMany(Transaction, {as:'to', foreignKey: 'toId'})
}

export default Account;