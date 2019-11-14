import express from 'express'
import AssetController from '../../controllers/AssetController'
let router = express.Router()

class AssetRoute {
    private _assetController: AssetController
    
    constructor () {
        this._assetController = new AssetController()  
    }
    get routes () {
        router.put('/assignDealer', this._assetController.assignDealer.bind(this._assetController))
        router.get('/oneAsset', this._assetController.listOneAsset.bind(this._assetController))
        router.get('/all', this._assetController.listAllAsset.bind(this._assetController))
        router.get('/assetByDealer', this._assetController.listAssetByDealer.bind(this._assetController))
        router.get('/assetOfOneDealer/:id', this._assetController.listAssetOfOneDealer.bind(this._assetController))
        router.get('/getRegisteredDevices', this._assetController.getRegisteredDevicesVIN.bind(this._assetController))
        router.get('/getAvailableDevices', this._assetController.getAvailableDevices.bind(this._assetController))
        return router
    }
}

Object.seal(AssetRoute)
export = AssetRoute