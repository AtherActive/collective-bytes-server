import Token from "../models/Token.model";

export interface IDatabaseOptions {
    /**@param {string} username The username for this database. */
    username?: string;
    /**@param {string} password The password for this database. */
    password?: string;
    /**@param {string} database The database name. */
    database?: string;
    /**@param {string} host The host for this database. */
    host?: string;
    /**@param {number} port The port for this database. */
    port?: number;
    /**@param {Array<any>} models The models that should be loaded by this database. */
    models?: Array<any>
    /**@param {boolean} useMemoryDatabase Whether or not to use a memory database. This option disables every option EXCEPT `models`. */
    useMemoryDatabase?: boolean;
}

export interface IPermissions {
    /**@param {boolean} read Read permissions to the API. */
    read: boolean

    /**@param {ICappedPermission} take_capped Allow to take Currency at a cap */
    take_capped: ICappedPermission
    /**@param {ICappedPermission} give_capped Allow to give Currency at a cap */
    give_capped: ICappedPermission


    /**@param {boolean} take_uncapped Allow uncapped take access */
    take_uncapped: boolean
    /**@param {boolean} give_uncapped Allow uncapped give access */
    give_uncapped: boolean

    /**@param {boolean} set Allow set access (overwrite esentially) */
    set: boolean

    // token management
    view_tokens: boolean
    create_tokens: boolean
    delete_tokens: boolean

}

export interface ICappedPermission {
    cap: number,
    allowed: boolean
}