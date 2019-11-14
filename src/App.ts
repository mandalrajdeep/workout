import express from 'express'
import Middlewares from './config/middleware/base/BaseMiddleware'


class App {
    public app : express.Application
    private port : any
    constructor () {
        this.app = express()
        this.port = parseInt(<string>process.env.PORT, 10) || 6003
        this.init()
    }
    private init () {
        this.app.set('port', this.port)
        this.app.use(Middlewares.configuration)
        this.app.listen(this.port, () => {
            console.log('App Running on ', this.port)
        })
    }
}

export default App