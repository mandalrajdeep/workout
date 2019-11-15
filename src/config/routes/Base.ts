import express from 'express';
import Workout from './Workout';

class BaseRoutes {
    static get routes() {
        const app = express();
        app.use('/allocations', new Workout().routes);
        return app;
    }
}
export = BaseRoutes
