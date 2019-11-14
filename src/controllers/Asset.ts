import { Request, Response } from 'express'
import MiddleWare from '../config/queueConnector/Middleware'
import IAssetController from './interfaces/AssetController'

class AssetController implements IAssetController {

    middleware
    constructor() {
        this.middleware = new MiddleWare();
    }

    async assignDealer(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: req.body, operation: 'assignDealer', class: 'asset' }
            let content = await this.middleware.send(JSON.stringify(data))
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
    }

    async listAllAsset(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: req.body, operation: 'listAllDistAsset', class: 'asset' }
            let content = await this.middleware.send(JSON.stringify(data))
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
    }


    async listOneAsset(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: req.body, operation: 'listOneAsset', class: 'asset' }
            let content = await this.middleware.send(JSON.stringify(data))
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
    }

    async listAssetByDealer(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: req.body, operation: 'listAssetByDealerDist', class: 'asset' }
            let content = await this.middleware.send(JSON.stringify(data))
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
       
    }

    async getRegisteredDevicesVIN(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: req.body, operation: 'listDistAssetsWthReg', class: 'asset' }
            let command = { loggedInUser: res.locals.user, query: req.body, operation: 'listCommands', class: 'command' }
            let content = await this.middleware.send(JSON.stringify(data))
            //need to send command also
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
       
            
            
    }

    async getAvailableDevices(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: req.body, operation: 'listDistAssetsWthNoReg', class: 'asset' }
            let content = await this.middleware.send(JSON.stringify(data))
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
    }

    async listAssetOfOneDealer(req: Request, res: Response) {
        try {
            let data = { loggedInUser: res.locals.user, query: {dealer : req.params.id}, operation: 'listAssetsOfOneDealer', class: 'asset' }
            let content = await this.middleware.send(JSON.stringify(data))
            res.status(200).send({ success: true, data: content })
        }
        catch (err) {
            res.status(200).send({ success: false, message: err.message })
        }
    }

}
export = AssetController    