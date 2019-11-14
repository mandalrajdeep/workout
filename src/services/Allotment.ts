import Availability from './Availability';
import Participant from './Participant';

class Allotment {
    public static instance
    private map
    private availability
    private participants
    private numUsers

    private constructor() {
        this.map = {}
        this.availability = Availability.getInstance();
        this.participants = Participant.getInstance();
        this.numUsers = 0;
    }

    public static getInstance() {
        if (!Allotment.instance) {
            Allotment.instance = new Allotment();
        }
        return Allotment.instance;
    }

    private isUsernameValid(username) {
        if (!this.participants.exists(username)) {
            throw Error('User Does Not Exist');
        }
    }

    public getAllotmentCount() {
        return this.numUsers;
    }

    public allocate(username) {
        try {
            this.isUsernameValid(username);
            const sensor = this.availability.getAvailable();
            this.map[username] = sensor;
            this.numUsers++;
            return sensor;
        } catch (err) {
            throw err;
        }
    }

    public reallocate(username) {
        try {
            this.isUsernameValid(username);
            if (!this.map[username]) {
                throw Error('Cannot Add During Workout');
            }
            this.availability.removeDead(this.map[username]);
            this.allocate(username);
        } catch (err) {
            throw err;
        }
    }

    public deallocate(username) {
        try {
            this.isUsernameValid(username);
            delete this.map[username];
            this.numUsers--;
        } catch (err) {
            throw err;
        }
    }
};

export default Allotment;
