import Token from "models/Token.model.js"

export class ModelError extends Error {
    constructor(message:string) {
        super(message)
        this.name = 'ModelError'
    }
}

export class DatabaseError extends Error {
    constructor(message:string) {
        super(message)
        this.name = 'DatabaseError'
    }
}

/**
 * Default API error class.
 */
export class APIError {
    constructor(public message, public statuscode:number){};
}

export class PermissionError extends APIError {
    constructor(permission:string, key:string) {
        const message = `Missing ${permission} on key ${key}`
        super(message,403)
    }
}

export class NotFoundError extends APIError {
    constructor(message:string) {
        super(message,404)
    }
}

export class ExceedingCapError extends APIError {
    constructor(amount:number,cap:number, token:Token) {
        const message = `Amount ${amount} exceeds cap ${cap} of token ${token.token}`
        super(message,403)
    }
}