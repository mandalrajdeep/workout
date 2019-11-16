import Availability from './Availability';
import Participant from './Participant';

class Allotment {
    public static instance

    private map

    private availability

    private participants

    public constructor() {
        this.map = {};
        this.availability = new Availability();
        this.participants = new Participant();
        Allotment.instance = this;
    }

    private isUsernameValid(username) {
        if (!this.participants.exists(username)) {
            throw Error('User Does Not Exist');
        }
    }

    public static getInstance() {
        return Allotment.instance;
    }

    public allocations() {
        return this.map;
    }

    public allocate(username) {
        this.isUsernameValid(username);
        const sensor = this.availability.ownsWorkingSensor(username)
            ? this.availability.getOwnedBy(username)
            : this.availability.getAvailable();
        this.map[username] = sensor;
        return sensor;
    }

    public reallocate(username) {
        this.isUsernameValid(username);
        if (!this.map[username]) {
            throw Error('Cannot Add During Workout');
        }
        return this.allocate(username);
    }

    public deallocate(username) {
        this.isUsernameValid(username);
        this.availability.release(username, this.map[username]);
        delete this.map[username];
    }
}

export default Allotment;
