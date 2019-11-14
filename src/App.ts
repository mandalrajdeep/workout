import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import Middlewares from './config/middleware/Base';
import AllotmentService from './services/Allotment';
import SocketController from './controllers/Socket';

class App {
    public static instance
    public app : express.Application
    public server : any
    public io : any
    private port : any
    private allotment : AllotmentService

    private constructor () {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = SocketIO.listen(this.server);
        this.allotment = AllotmentService.getInstance();
        this.port = parseInt(<string>process.env.PORT, 10) || 3000;
        this.init();
    }

    public static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    private init () {
        this.app.set('port', this.port);
        this.server.listen(this.port, () => {
            console.log('App Running on ', this.port);
        })
        this.app.use(Middlewares.configuration);
        this.io.on('connection', SocketController.onConnect);

    }
}


export default App
