import express from 'express'
import Workout from './Workout'

class BaseRoutes {
    
    get routes() {
        var app = express()
        app.use('/allocations', new Workout().routes)
        return app
    }
}
export = BaseRoutes