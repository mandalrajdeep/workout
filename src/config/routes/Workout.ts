import express from 'express';
import WorkoutController from '../../controllers/Workout';

const router = express.Router();

class WorkRoute {
    private workoutController: WorkoutController

    constructor() {
        this.workoutController = WorkoutController.getInstance();
    }

    get routes() {
        router.post('/list', this.workoutController.fetch.bind(this.workoutController));
        router.post('/', this.workoutController.start.bind(this.workoutController));
        router.post('/end', this.workoutController.end.bind(this.workoutController));
        return router;
    }
}

Object.seal(WorkRoute);
export = WorkRoute
