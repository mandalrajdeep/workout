import Allocation from './Allotment';
import Workout from './Workout';

class Socket {
    private workout

    private allocations

    private connections

    private total

    constructor() {
        this.workout = Workout.getInstance();
        this.allocations = new Allocation();
        this.connections = {};
        this.total = 0;
    }

    public onConnect(socket) {
        let userAdded = false;
        const listener = this.workout.emitter();
        listener.on('workout started', () => {
            socket.emit('workout', { data: 'Workout has started' });
        });

        listener.on('workout ended', () => {
            socket.emit('workout', { data: 'Workout has ended' });
            delete this.connections[socket.username];
            socket.disconnect();
        });

        socket.on('add user', (username) => {
            if (userAdded) return;

            /*
             * we store the username in the socket session for this client
             * if workout has started, no new users
             */

            socket.username = username;
            this.total += 1;
            userAdded = true;
            try {
                
                /*
                 * simply the if part can be left out
                 * if new users are to be allowed during a workout
                 */

                if (this.workout.isOn() && !this.connections[username]) {
                    socket.emit('ongoing workout', {
                        username: socket.username,
                    });
                } else {
                    this.addUser(socket, username);
                }
            } catch (err) {
                socket.emit('illegal user', {
                    username: socket.username,
                });
                socket.disconnect();
            }
        });
        socket.on('disconnect', () => {
            console.log('disconnect', this.total);
            this.total -= 1;
            socket.broadcast.emit('user left', {
                numUsers: this.total,
                username: socket.username,
            });
        });
    }

    private addUser(socket, username) {
        if (this.connections[username]) {
            socket.sensor = this.allocations.reallocate(username);
        } else {
            socket.sensor = this.allocations.allocate(username);
        }
        this.connections[username] = socket.id;
        socket.emit('login', {
            numUsers: this.total,
            username: socket.username,
            sensor: socket.sensor,
        });
        socket.broadcast.emit('user joined', {
            numUsers: this.total,
            username: socket.username,
            sensor: socket.sensor,
        });
    }
}

export default Socket;
