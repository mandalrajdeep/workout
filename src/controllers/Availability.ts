import Sensors from '../data/Sensor';

class Availability {
    private list

    private owned

    private all

    public constructor() {
        this.list = [];
        this.owned = {};
        this.all = {};
        Sensors.forEach((sensor) => {
            if (sensor.owner === 'gym' && sensor.allotable) {
                this.list.push(sensor.sensor_id);
            } else if (sensor.allotable) {
                this.owned[sensor.owner] = sensor.sensor_id;
            }
            this.all[sensor.owner] = sensor.sensor_id;
        });
    }

    public release(username, sensor) {
        if (this.all[username] === sensor) {
            this.owned[username] = sensor;
        } else {
            this.list.push(sensor);
        }
    }

    /*
     * public removeDead(sensorId) {
     *     const index = this.list.indexOf(sensorId);
     *     if (index > -1) {
     *         this.list.splice(index, 1);
     *         return true;
     *     }
     *     console.log('sensot not found')
     *     throw Error('Sensor Not Found');
     * }
     */

    public ownsWorkingSensor(username) {
        if (this.owned[username]) {
            return true;
        }
        return false;
    }

    public getOwnedBy(username) {
        const sensor = this.owned[username];
        delete this.owned[username];
        return sensor;
    }

    public getAvailable() {
        if (this.list.length > 0) {
            return this.list.pop();
        }
        throw Error('No Sensor Left');
    }
}

export default Availability;
