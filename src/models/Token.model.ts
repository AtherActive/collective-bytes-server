import { IPermissions } from "lib/interfaces.js";
import { Sequelize, Model, DataTypes } from "sequelize";
import Transaction from "./Transaction.model.js"

class Token extends Model {
    declare id: number;
    declare token: string;
    declare ownerDiscordId: number;
    declare permissions: string|IPermissions

    buildRequest() {
        return {
            ownerDiscordId: this.ownerDiscordId,
            permissions: this.permissions
        }
    }
}

export function load(database: Sequelize) {
    Token.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerDiscordId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.JSON,
            allowNull: false
        }
    
    }, {
        sequelize: database
    })
}

export function setRelations() {
}

export default Token;