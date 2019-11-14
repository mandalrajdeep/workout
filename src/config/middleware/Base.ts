import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import LoginRoute from './../../routes/LoginRoute'
import BaseRoutes from './../../routes/base/BaseRoutes'
import TokenValidator from './../TokenValidator'
import SecureConnection from './../SecureConnection'
import ResetRoute from '../../routes/ResetRoute'
import ForgotPassRoute from '../../routes/ForgotPassRoute'

class MiddlewaresBase {
    
    static get configuration () {
         var app = express()
         app.use(bodyParser.json())
         app.use(cors())
         app.use(SecureConnection.isSecure)
         app.use(new ResetRoute().routes)
         app.use(new ForgotPassRoute().routes)
         app.use(new LoginRoute().routes)
         app.use(TokenValidator.validate)
         app.use(new BaseRoutes().routes)
         
         return app
    }    
}
Object.seal(MiddlewaresBase)
export = MiddlewaresBase