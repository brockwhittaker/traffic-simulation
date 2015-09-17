Ecosystem.prototype.addCar = function () {
  this.cars.push({
    "percentDriven": null,
    "speed": null,
    "driving": null,
    "location": {
      "x": null,
      "y": null
    }
  });
  return this;
}

Ecosystem.prototype.startDriving = function (c1, c2, speed, car) {
  this.routes[c1 + "-" + c2].drivers.unshift(car); // this implies a trip is beginning regardless of another ending

  car.c1 = c1;
  car.c2 = c2;
  car.percentDriven = 0;
  car.driving = true;
  car.timeDriving = 0;
  car.speed = speed;
  car.location = {
    x: c1.x,
    y: c1.y
  };
  return this;
}

Ecosystem.prototype.newRoute = function (car) {
  var c = this.cities,
      c2 = car.c2,
      c1 = car.c1,
      citiesKey = Object.keys(c[c2].neighbors),
      c3 = c[c2].neighbors[this.destinationByPopulation(c[c2].neighbors)].name,
      d = this.routes[c1 + "-" + c2].stats.driveTime;

  this.routes[c1 + "-" + c2].stats.driveTime = [d[0] * (d[1] - 1) / d[1] + car.timeDriving * (1 / d[1]), Math.min(this.chartSettings.speed.rollingAverage, d[1] + 1), this.routes[c1 + "-" + c2].stats.driveTime[2] + 1];

  this.routes[c1 + "-" + c2].drivers.pop(); // if newRoute is run it implied a trip ended on the route
  this.startDriving(c2, c3, this.carSettings.speed, car); // this get a random neighbor of c2

  return this;
}

Ecosystem.prototype.moveCar = function (car) {
  var c = this.cities, c2, citiesKey;

  if (car.percentDriven >= 1) {
    this.newRoute(car); // this get a random neighbor of c2
  } else {
    var x = c[car.c1].neighbors[car.c2].node.x - c[car.c1].x,
        y = c[car.c1].neighbors[car.c2].node.y - c[car.c1].y;

    car.percentDriven += (car.speed / c[car.c1].neighbors[car.c2].distance) / 20; // fps set at 20 AKA 50/1000ms
    car.location = {
      x: car.percentDriven * x + c[car.c1].x,
      y: car.percentDriven * y + c[car.c1].y
    };
    car.timeDriving += 1;
  }
  return this;
}

Ecosystem.prototype.destinationByPopulation = function (neighbors) {
  var t_pop = 0, k = Object.keys(neighbors), prop = [], rand = Math.random(), counter = 0, chosen, c_bool = false;
  for (var x = 0; x < k.length; x++) {
    t_pop += neighbors[k[x]].node.population;
  }
  for (var x = 0; x < k.length; x++) {
    if (x > 0)
      prop[x] = neighbors[k[x]].node.population / t_pop + prop[x - 1];
    else
      prop[x] = neighbors[k[x]].node.population / t_pop;
  }


  do {
    if (prop[counter] > rand) {
      chosen = k[counter];
      c_bool = true;
    } else {
      counter++;
    }
  } while (!c_bool);

  return chosen;
}

// TODO: Add varying number of lanes between roads for higher/lower traffic areas. DONE.
// TODO: Add directions to cities based on time.
// TODO: Instead of only routing to neighbors, route to new city dependent on US Population
