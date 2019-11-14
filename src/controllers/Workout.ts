import {Request, Response} from 'express';

class Workout {
    public static instance
    private id : number
    private hasStarted : boolean

    private constructor() {
        this.id = 1;
        this.hasStarted = false;
    }

    public static getInstance() {
        if (!Workout.instance) {
            Workout.instance = new Workout();
        }
        return Workout.instance;
    }

    public getWorkoutId() {
        return this.id;
    }

    public isOn() {
        return this.hasStarted;
    }

    public start(req: Request, res: Response) {
        this.id = req.body.id;
        this.hasStarted = true;
        res.status(200).send({message : 'Workout has started!'});
    }

    public end(req: Request, res: Response) {
        this.hasStarted = false;
        res.status(200).send({message : 'Workout has ended!'});
    }
};

export default Workout;
