import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import BaseRoutes from '../routes/Base';

class Middlewares {
    static get configuration() {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use(BaseRoutes.routes);
        return app;
    }
}
Object.seal(Middlewares);
export default Middlewares;
