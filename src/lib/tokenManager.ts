import Account from "../models/Account.model.js";
import Token from "../models/Token.model.js";
import {v4 as uuidv4}from 'uuid'
import { APIError, PermissionError } from "./Error.js";
import { IPermissions } from "./interfaces.js";

class TokenManager {

    /**
     * Fetch the token if it exists. If it does not, return false.
     * @param token The string token received from the user.
     * @returns {Token|false} Either a token or false
     */
    async getToken(token:string):Promise<Token|false> {
        const tok:Token = await Token.findOne({where: {
            token: token
        }})
        if(!tok) return false;
        tok.permissions = JSON.parse(tok.permissions as string)
        return tok;
    }

    /**
     * Create a new token
     * @param {string} ownerId The owner of the token
     * @param {Ipermissions} permissions The permissions needed for the token
     * @param {Token} token The token of the user attempting to create a token
     * @returns Promise<Token|APIError> Either the token or an APIError
     */
    async createToken(ownerId:string, permissions:IPermissions, token:Token):Promise<Token|APIError> {
        if(!(token.permissions as IPermissions).create_tokens) return new PermissionError("create_tokens",token.token)

        const tok = await Token.create({
            ownerDiscordId: ownerId,
            token: uuidv4(),
            permissions: JSON.stringify(permissions)
        })

        return tok;
    }

    async getTokenUserAccount(token:Token):Promise<Account|APIError> {
        if(!(token.permissions as IPermissions).read) return new PermissionError("read",token.token);

        const acc = await Account.findOne({where: { identifier: token.token }})
        if(acc instanceof APIError) return acc;

        return acc;
    }

    
}


export default new TokenManager();