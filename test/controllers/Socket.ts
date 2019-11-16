const should = require('should');
const io = require('socket.io-client');
const supertest = require('supertest');
const socketURL = 'http://0.0.0.0:3000';
const baseUrl = supertest("http://0.0.0.0:3000");
const chatUser1 = 'sophiesilly';
const chatUser2 = 'ellipticallocates';
const chatUser3 = 'Dana';
let sensors = [];



describe('Workout Server Testing' , () => {
    let numUsers = 0;
    const onDisconnect = () => {
        numUsers -= 1;
    }
    const onConnect = (client, user, callback) => {
        client.on('connect', () => {
            numUsers += 1;
            client.emit('add user', user);
            callback()
        })
    }
    describe('Socket Server', () => {
        const onLogin = (client, callback) => {
            client.on('login', (data) => {
                data.username.should.equal(data.username);
                sensors.push(data.sensor);
                callback();
            })
        }
        const onUserJoined = (client, callback) => {
            client.on('user joined', (data) => {
                data.username.should.equal(chatUser2);
                client.disconnect(onDisconnect);
                callback(data);
            });
        }
        it('Should broadcast new user to all users', function(done){
            const client1 = io.connect(socketURL);
            onConnect(client1, chatUser1, () => {
                const client2 = io.connect(socketURL);
                onConnect(client2, chatUser2, () => {
                    onLogin(client2, () => {
                        client2.disconnect(onDisconnect);
                    })
                })
            })
            onUserJoined(client1, (data) => {
                data.numUsers.should.equal(numUsers);
                done();
            }); 
        });
        it('Should assign a new sensor on reconnect', function(done){
            numUsers = 0;
            const client1 = io.connect(socketURL);
            onConnect(client1, chatUser1, () => {
                let client2 = io.connect(socketURL);
                onConnect(client2, chatUser2, () => {
                    client2.disconnect(onDisconnect);
                    client2 = io.connect(socketURL);
                    onConnect(client2, chatUser2, () => {
    
                    });
                });
                onLogin(client2, () => {});
            });
            onLogin(client1, () => {});
            onUserJoined(client1, (data) => {
                sensors.forEach(sensor => {
                    data.sensor.should.not.equal(sensor)
                })
                done();
            }); 
        });
    })
    describe('HTTP with Socket Server', () => {
        let numUsers = 0;
        const client1 = io.connect(socketURL);
        const client2 = io.connect(socketURL);
        const onWorkout = (client, callback) => {
            client.on('workout', (data) => {
                data.data.should.equal('Workout has started');
            })
            callback();
        }

        before(() => {
            onConnect(client1, chatUser1, () => {
                onWorkout(client1, () => {});
                onConnect(client2, chatUser2, () => {
                    onWorkout(client1, () => {});
                });
            });
        });
        it('Should broadcast workout message on [POST]/allocations', function(){

            return new Promise((resolve, reject) => {
                try {    
                    baseUrl
                        .post('/allocations')
                        .send({id : 101})
                        .set('Content-Type', 'application/x-www-form-urlencoded')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end((err, res) => {
                            res.status.should.equal(200);
                            resolve();
                        });
                } catch (e) {
                    console.error(e);
                }
            });
        });
    
    });
});


