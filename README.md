# Workout Sensor Management
An application to manage and monitor sensor activity used by participants during a live workout session.
## API Deliverables

```
[GET]/ => Starts a SocketIO client (Sensor paired with participant) 
```
```
[POST]/allocations => Start a Workout Session
```
```
[POST]/allocations/end => End a Workout Session
```
```
[POST]/allocations/lists => List all active participant-sensor tuples
```
## Description (includes Assumptions)
The *[GET] API* call returns a client webpage, which repicates a participant. As the webpage pops up, the participant is asked to enter their name. If the name is registered, a sensor will be assigned to him/her, and a socket connection is created.

If the participant has their own sensor, they will get that sensor only (if that sensor is in working condition). No one else gets these owned sensors under any circumstances.

If you reload the webpage, the socket gets diconnected, and this event is understood as the sensor becoming non functional. The participant will once again be asked to enter their name, and a new working sensor will be allocated. The discarded sensor will not be assigned to anyone now.

The *[POST] /allocations*  API will trigger the start of the workout. While as many users can connect before the workout has started, no new users will be able to join in after this (This anti-feature can easily be disabled in Socket.ts controller).

When the *[POST] /allocations/end* API is called, all connections are disconnected.

All connections, disconnections, start workout, end workout are communicated to everyone in the session, including sensor allotments.
	
## Running Instructions
### Environment Variables
> PORT=3000

### Development Mode
> npm install

> npm start

### Testing Mode
Start the server locally, and then start the test server in a seperate window. This runs on 3000 port.
 > npm run test
### Production Mode
The Dockerfile has been created, but not tested (time constratins)
> tsc

 > npm run deploy

## APIs
```
[GET]/  
```
```
[POST]/allocations
{
	id : number
}
```
```
[POST]/allocations/end 
{
	id : number
}
```
```
[POST]/allocations/lists
{
	id : number
}
```
Descriptions of these APIs are available at the top.
## Data Models
Data Models for participants and sensors are stored in memory, not in database. There are 200 registered users, and 999 registered sensors. The list of registered users is available in Users.md. Any name out this list will not work.

## Design
An in-memory hash table has been used to maintain live allocations. This can be extended to a redis-based cache system to support several worjout sessions at scale. Also, a stack has been used in the sensor allocation service for people without their own working sensors. Time complexities have been optimzed to *O(1)* for all kinds of reads and sensor allocations. 

## QnA

> Can you create multiple workout sessions?
No, but this can be easily implemented using session groups

> Can you start a workout with a specific set of users?
No, workout starts with all connected users at time of API call

> Can anyone join in?
No, only users who are registered

> What if sensors run out?
Currently there are 999 sensors, which is 5x participants. This case is otherwise not handled

## Known Bugs
- The test server will run properly only once. The total connection count isn't working properly with the test server, but works otherwise. To run again, once will have to re-start both servers again.
- Whenever you are done testing, restart the server (same bug as above)
- Multiple users with the same name (from list of registered) will be able to login, but this is a breach of security.
- All sensor data is reset on server reset.
- Multiple workouts are not supported, but the API will not return supporting messages.

