import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import BaseRoutes from './../routes/Base';

class Middlewares {
    
    static get configuration () {
        var app = express()
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(bodyParser.json())
        app.use(cors())
        app.use(new BaseRoutes().routes)
        return app
    }    
}
Object.seal(Middlewares)
export default Middlewares