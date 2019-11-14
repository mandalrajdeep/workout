import People from './../data/Participant';

class Participant {
    private participants 
    public static instance

    private constructor() {
        this.participants = People;
    }

    public static getInstance() {
        if (!Participant.instance) {
            Participant.instance = new Participant();
        }
        return Participant.instance;
    }

    public exists(username) {
        for (let i = 0; i < this.participants.size(); i++) {
            if (this.participants[i].participant == username) {
                return true;
            }
        }
        return false;
    }
};

export default Participant;


