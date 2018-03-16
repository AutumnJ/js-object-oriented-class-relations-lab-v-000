let driverId = 0;
let passengerId = 0;
let tripId = 0;
let store = {drivers:[], passengers:[], trips:[]};

class Driver {
  constructor (name) {
    this.id = ++driverId;
    this.name = name;
    //must occur w/in constructor so this represents instance constructed
    store.drivers.push(this);
  }

  //driver has many trips
  trips() {
    return store.trips.filter(trip => {
      return trip.driverId === this.id;
    });
  }

  //driver has many passengers through trips
  passengers() {
    //invoke method above to locate all trips for this driver instance
    return this.trips().map(trip => {
      //invoke the .passenger() method defined in the trip class to return an array of passengers
      return trip.passenger();
    });
  }


}

class Passenger {
  constructor (name) {
    this.id = ++passengerId;
    this.name = name;

    store.passengers.push(this);
  }

  //passenger has many trips
  trips() {
    return store.trips.filter(trip => {
      return trip.passengerId === this.id;
    });
  }

  //passenger has many drivers through trips
  drivers() {
    //invoke method above to locate all trips for this passenger instance
    return this.trips().map(trip => {
      //invoke the .driver() method defined in the trip class to return an array of drivers
      return trip.driver();
    });
  }

}

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId;
    this.driverId = driver.id
    this.passengerId = passenger.id

    store.trips.push(this);
  }

  //trip belongs to passenger
  passenger() {
    return store.passengers.find(passenger => {
      return passenger.id === this.passengerId;
    });
  }

  //trip belongs to driver
  driver() {
    return store.drivers.find(driver => {
      return driver.id === this.driverId;
    });
  }

}
