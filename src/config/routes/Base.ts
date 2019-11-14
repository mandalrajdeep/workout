import express from 'express'
import UserRoute from './../UserRoute'
import OrgRoute from './../OrgRoute'
import AssetRoute from './../AssetRoute'
import CommandRoute from '../CommandRoutes'

class BaseRoutes {
    
    get routes() {
        var app = express()
        console.log('Base Request')
        app.use('/users', new UserRoute().routes)
        app.use('/orgs', new OrgRoute().routes)
        app.use('/assets', new AssetRoute().routes)
        app.use('/commands', new CommandRoute().routes)
        return app
    }
}
export = BaseRoutes