import Sensors from '../data/Sensor';

class Availability {
    private list
    public static instance

    private constructor() {
        this.list = Sensors.forEach((sensor) => {
           this.list.push(sensor); 
           if (sensor.owner === 'gym' && sensor.allotable) {
               this.list.push(sensor.sensor_id);
           }
        });
    }

    public static getInstance() {
        if (!Availability.instance) {
            Availability.instance = new Availability();
        }
        return Availability.instance;
    }

    public removeDead(sensorId) {
        const index = this.list.indexOf(sensorId);
        if (index > -1) {
            this.list.splice(index, 1); 
            return true;
        }
        throw Error('Sensor Not Found');
    } 

    public getAvailable() {
        if (this.list.size() > 0) {
            return this.list.pop();
        }
        throw Error('No Sensor Left');
    }
};

export default Availability;
