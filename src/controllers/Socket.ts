import AllocationService from './../services/Allotment';
import WorkoutController from './Workout';

class Socket {
    public static instance;

    private static workout
    private static allocations

    private constructor() {
        Socket.workout = WorkoutController.getInstance();
        Socket.allocations = AllocationService.getInstance();
    }

    public static onConnect(socket) {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        socket.on('new message', Socket.onMessage);
        socket.on('add user', Socket.onAddUser);
        socket.on('disconnect', Socket.onDisconnect);
    }

    private static onAddUser (username) {
        if (Socket.workout.isOn()) {
            Socket.allocations.reallocate(socket.username);
        } else {
            Socket.allocations.allocate(socket.username);
        }


    }

    private static onMessage(data) {

    } 

    private static onDisconnect() {

    }
};

export default Socket;


io.on('connection', (socket) => {
    var addedUser = false;
  
    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });
  
    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
      console.log('user', username)
      if (addedUser) return;
  
      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers, 
        data : 'Hello World'
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });
  
    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
      if (addedUser) {
        --numUsers;
  
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });
  