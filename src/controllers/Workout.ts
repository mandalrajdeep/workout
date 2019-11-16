import { Request, Response } from 'express';
import EventEmitter from 'events';
import Allotment from './Allotment';

class Workout {
    public static instance

    private event : EventEmitter

    private id : number

    private hasStarted : boolean

    private constructor() {
        this.event = new EventEmitter();
        this.id = 1;
        this.hasStarted = false;
    }

    public static getInstance() {
        if (!Workout.instance) {
            Workout.instance = new Workout();
        }
        return Workout.instance;
    }

    public emitter() {
        return this.event;
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
        this.event.emit('workout started');
        res.status(200).send({ message: 'Workout has started!' });
    }

    public fetch(req : Request, res: Response) {
        if (req.body.id !== this.id) {
            res.status(200).send({ message: 'Invalid Workout ID' });
        } else {
            const allotment = Allotment.getInstance();
            res.status(200).send({ workout : req.body.id, allocations : allotment.allocations() });    
        }
    }

    public end(req: Request, res: Response) {
        if (req.body.id !== this.id) {
            res.status(200).send({ message: 'Invalid Workout ID' });
        } else {
            this.hasStarted = false;
            this.event.emit('workout ended');
            res.status(200).send({ message: 'Workout has ended!' });
        }
    }
}

export default Workout;
