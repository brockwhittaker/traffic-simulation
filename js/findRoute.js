function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  }
  this.dequeue = function () {
    return this._nodes.shift().key;
  }
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }
  this.isEmpty = function () {
    return !this._nodes.length;
  }
}

/**
 * Pathfinding starts here
 */
function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  }

  this.shortestPath = function (start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path;

        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  }
}

Ecosystem.prototype.citiesGraph = function () {
  this.cityGraph = new Graph();
  var c = this.cities, n;

  for (var x in this.cities) {
    n = {}
    for (var y in this.cities[x].neighbors) {
      n[y] = this.cities[x].neighbors[y].distance;
    }
    this.cityGraph.addVertex(c[x].name, n);
  }
}

Ecosystem.prototype.shortestPath = function (c1, c2) {
  return this.cityGraph.shortestPath(c1, c2).concat([c1]).reverse();
}

/* --- special car section --- */
Ecosystem.prototype.addSpecialCar = function () {
  this.specialCars.push({
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

Ecosystem.prototype.setSpecialPath = function (c1) {
  var c = Object.keys(this.cities);
  do {
    this.specialCarsPath = earth.shortestPath(c1, c[Math.floor(Math.random() * c.length)]);
  } while (this.specialCarsPath.length == 1);
  return this;
}

Ecosystem.prototype.startDrivingSpecial = function () {
  var car = this.specialCars[0];

  car.c1 = this.specialCarsPath[0];
  car.c2 = this.specialCarsPath[1];
  car.percentDriven = 0;
  car.driving = true;
  car.timeDriving = 0;
  car.speed = this.carSettings.speed;
  car.location = {
    x: this.specialCarsPath[0].x,
    y: this.specialCarsPath[0].y
  };

  this.specialCarsPath.shift();
  if (this.specialCarsPath.length == 1) {
    this.setSpecialPath(this.specialCarsPath[0]);
  }
  return this;
}

Ecosystem.prototype.moveCarSpecial = function (path, car) {
  var c = this.cities, c2, citiesKey;

  if (car.percentDriven >= 1) {
    this.startDrivingSpecial(path, car);
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

Ecosystem.prototype.setSpecialSpeed = function () {
  var car = this.specialCars[0],
      p = this.specialCarsPath,
      r = this.routes;
  var s = r[p[0] + "-" + p[1]].distance / (r[p[0] + "-" + p[1]].stats.driveTime[0] / 20);

  if (r[p[0] + "-" + p[1]].distance / (r[p[0] + "-" + p[1]].stats.driveTime[0] / 20) > 75)
    car.speed = 75
  else
    car.speed = r[p[0] + "-" + p[1]].distance / (r[p[0] + "-" + p[1]].stats.driveTime[0] / 20)

  return this;
}
/* --------------------------- */

// earth.startDrivingSpecial(earth.shortestPath("Phoenix", "New York City"), earth.specialCars[0]);
