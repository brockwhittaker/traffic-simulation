Ecosystem.prototype.addCity = function (x, y, name, population) {
  this.cities[name] = {
    "name": name,
    "x": x,
    "y": y,
    "population": population,
    "neighbors": {}
  };
  return this;
}

Ecosystem.prototype.addRoute = function (c1, c2, d) {
  this.cities[c1].neighbors[c2] = {
    "name": c2,
    "node": this.cities[c2],
    "distance": d
  };
  this.cities[c2].neighbors[c1] = {
    "name": c1,
    "node": this.cities[c1],
    "distance": d
  };
  this.routes[c1 + "-" + c2] = {
    "c1": c1,
    "c2": c2,
    "distance": d,
    "drivers": [],
    "stats": {
      "driveTime": [1, 1, 0],
      "lanes": 1,
      "laneSwitch": 0
    }
  }
  this.routes[c2 + "-" + c1] = {
    "c1": c2,
    "c2": c1,
    "distance": d,
    "drivers": [],
    "stats": {
      "driveTime": [0, 1, 0],
      "lanes": 1,
      "laneSwitch": 0
    }
  }
  return this;
}

Ecosystem.prototype.monitorRoute = function () {
  var r = this.routes;
  for (var x in r) {
    for (var y = 0; y < r[x].drivers.length; y++) {
      if (r[x].drivers[y + 1] != null || typeof r[x].drivers[y + 1] !== "undefined") {
        if (Math.abs(r[x].drivers[y + 1].percentDriven - r[x].drivers[y].percentDriven) < ((1 / r[x].distance * this.chartSettings.speed.distanceWeight) / r[x].stats.lanes)) {
          r[x].drivers[y].speed = r[x].drivers[y + 1].speed - 1;
        } else if (Math.abs(r[x].drivers[y + 1].percentDriven - r[x].drivers[y].percentDriven) > ((1 / r[x].distance * this.chartSettings.speed.distanceWeight) / r[x].stats.lanes) && r[x].drivers[y].speed < this.carSettings.speed) {
          r[x].drivers[y].speed += 5;
        }
      } else if (r[x].drivers[y].speed < this.carSettings.speed) {
        r[x].drivers[y].speed += 5;
      }

      if (r[x].drivers[y].speed < 1) {
        r[x].drivers[y].speed = 1;
      }
    }
  }
  return this;
}

Ecosystem.prototype.changeNumLanes = function () {
  var r = this.routes;
  for (var x in r) {
    if (r[x].distance / (r[x].stats.driveTime[0] / 20) < this.chartSettings.speed.addLaneThresh && r[x].stats.laneSwitch == 0) {
      r[x].stats.lanes++;
      r[x].stats.laneSwitch = 100;
    } else if ((r[x].distance / (r[x].stats.driveTime[0] / 20) > this.chartSettings.speed.removeLaneThresh && r[x].stats.lanes > 1) && r[x].stats.laneSwitch == 0) {
      r[x].stats.lanes--;
      r[x].stats.laneSwitch = 100;
    }
    if (r[x].stats.laneSwitch > 0) {
      r[x].stats.laneSwitch--;
    }
  }
}
