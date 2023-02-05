import express from 'express'
import { APIError } from '../lib/Error.js';

import currencyManager from '../lib/currencyManager.js';
import tokenManager from '../lib/tokenManager.js';

import Account from '../models/Account.model.js';
import Token from 'models/Token.model.js';

export const mount = '/api/v1/'
export const router = express.Router();

// Deal with any errors that are returned by functions
function handleApiError(req,res,error:APIError) {
    return res.status(error.statuscode).json({error: error.message})
}

router.use(express.json())

router.use(async (req, res, next) => {
    if(!req.headers.authorization) return res.status(400).json({error: "No authorization header provided"})
    req.headers.authorization = req.headers.authorization.replace("Bearer ", "");

    const token = await tokenManager.getToken(req.headers.authorization as string)
    if(!token) return res.status(401).send({error: "Invalid token"})
    req['token'] = token as Token
    next()
})

router.post('/userbalance', async (req, res) => {
    const token = req['token'] as Token;
    
    const {data, options} = req.body

    const account = await currencyManager.getUserBalance(data.identifier,token);
    if(account instanceof APIError) return handleApiError(req,res,account);

    return res.json({data: {balance: account} , options: options})
})

router.post('/account', async (req, res) => {
    const token = req['token'] as Token;
    
    const {data, options} = req.body

    const account = await currencyManager.getAccount(data.identifier,token);
    if(account instanceof APIError) return handleApiError(req,res,account);

    return res.json({data: (account as Account).buildRequest(), options: options})
})

router.post('/take', async (req, res) => {
    const token = req['token'] as Token;
    
    const {data, options} = req.body

    // check if this is a valid amount
    if(!data.amount) return res.status(400).json({error: "No amount provided"})
    if(data.amount < 0) return res.status(400).json({error: "Amount must be greater than 0"})

    const success = await currencyManager.takeBalance(data.identifier,data.amount,token);
    if(success instanceof APIError) return handleApiError(req,res,success);

    return res.json({data:(success as Account).buildRequest(), options: options})
})

router.post('/give', async (req, res) => {
    const token = req['token'] as Token;
    
    const {data, options} = req.body

    // check if this is a valid amount
    if(!data.amount) return res.status(400).json({error: "No amount provided"})
    if(data.amount < 0) return res.status(400).json({error: "Amount must be greater than 0"})

    const success = await currencyManager.giveBalance(data.identifier,data.amount,token);
    if(success instanceof APIError) return handleApiError(req,res,success);

    return res.json({data: (success as Account).buildRequest(), options: options})
})