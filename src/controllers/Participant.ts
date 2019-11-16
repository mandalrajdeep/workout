import People from '../data/Participant';

class Participant {
    private participants

    public constructor() {
        this.participants = People;
    }

    public exists(username) {
        for (let i = 0; i < this.participants.length; i += 1) {
            if (this.participants[i].participant === username) {
                return true;
            }
        }
        return false;
    }
}

export default Participant;
