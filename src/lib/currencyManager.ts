import Token from "../models/Token.model.js";
import Account from "../models/Account.model.js";
import { IPermissions } from "./interfaces";
import { APIError, ExceedingCapError, NotFoundError, PermissionError } from "./Error.js";
import Transaction from "../models/Transaction.model.js";
import tokenManager from "./tokenManager.js";

class CurrencyManager {

    /**
     * Get a user's balance. Only returns the number.
     * @param discordId The DiscordId of the user
     * @param token The Token object.
     * @returns Promise<number|APIError> Either the balance or an APIError
     */
    async getUserBalance(discordId:string,token:Token):Promise<number|APIError> {
        if(!(token.permissions as IPermissions).read) return new PermissionError("read",token.token);

        const acc = await this.getAccount(discordId,token);
        if(acc instanceof APIError) return acc;

        return acc.wallet;
    }

    /**
     * Get a user account
     * @param {string} identifier The identifier of the account
     * @returns {Promise<Account|APIError>} Either the account or an APIError
     */
    async getAccount(identifier:string,token:Token):Promise<Account|APIError> {
        if(!(token.permissions as IPermissions).read) return new PermissionError("read",token.token);

        const acc = await Account.findOne({where: {
            identifier: identifier
        }})

        if(!acc) return new NotFoundError(`Accuont '${identifier}' not found.`)
        return acc
    }

    /**
     * Take balance form a user. Returns true if successful, otherwise an APIError.
     * It will check if you got permission to take, and if so, if it is below the cap.
     *
     * @param {string} identifier The identifier of the account
     * @param {number} amount The amount to take
     * @param {Token} token The token object
     * @returns Promise<boolean|APIError> Either true or an APIError
     */
    async takeBalance(identifier:string,amount:number,token:Token):Promise<Account|APIError> {
        if((token.permissions as IPermissions).take_uncapped == false) {
            if((token.permissions as IPermissions).take_capped.cap < amount) return new ExceedingCapError(amount,(token.permissions as IPermissions).take_capped.cap,token);
            else return new PermissionError("take",token.token);
        }

        const acc = await this.getAccount(identifier,token);
        if(acc instanceof APIError) return acc;

        if(acc.wallet < amount) return new APIError("Insufficient funds.",405);
        acc.wallet -= amount;

        const tokenAccount = await tokenManager.getTokenUserAccount(token);
        if(tokenAccount instanceof APIError) return tokenAccount;

        const transaction = Transaction.create({
            amount: amount,
            to: identifier,
            from: tokenAccount.id,
        })
        await acc.save();

        return acc
    }

    /**
     * Give balance to a user. Returns true if successful, otherwise an APIError.
     * It will check if you got permission to take, and if so, if it is below the cap.
     *
     * @param {string} identifier The identifier of the account
     * @param {number} amount The amount to take
     * @param {Token} token The token object
     * @returns Promise<boolean|APIError> Either true or an APIError
     */
    async giveBalance(identifier:string,amount:number,token:Token):Promise<Account|APIError> {
        if((token.permissions as IPermissions).give_uncapped == false) {
            if((token.permissions as IPermissions).give_capped.cap < amount) return new ExceedingCapError(amount,(token.permissions as IPermissions).take_capped.cap,token);
            else return new PermissionError("take",token.token);
        }

        const acc = await this.getAccount(identifier,token);
        if(acc instanceof APIError) return acc;

        acc.wallet += amount;

        const tokenAccount = await tokenManager.getTokenUserAccount(token);
        if(tokenAccount instanceof APIError) return tokenAccount;
        if(!tokenAccount) return new APIError("Token account not found.",500);

        const transaction = await Transaction.create({
            amount: amount,
            to: identifier,
            from: tokenAccount.id,
        })
        await acc.save();

        return acc
    }

}

export default new CurrencyManager();