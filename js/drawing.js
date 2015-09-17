Ecosystem.prototype.drawCities = function () {
  var c = this.cities;
  for (var x in c) {
    context.beginPath();
    context.arc(c[x].x * this.ratios.x, c[x].y * this.ratios.y, this.chartSettings.radius, 2 * Math.PI, false);
    context.font = this.chartSettings.font;
    context.fillText(c[x].name, c[x].x * this.ratios.x + 4, c[x].y * this.ratios.y)
    context.fillStyle = "#444";
    context.fill();
  }
  return this;
}

Ecosystem.prototype.drawRoutes = function () {
  var c = this.cities;
  var visited = "";
  for (var x in c) {
    visited += "," + x;
    for (var y in c[x].neighbors) {
      if (visited.indexOf(y) == -1) {
        context.beginPath();
        context.moveTo(c[x].x * this.ratios.x, c[x].y * this.ratios.y);
        context.lineTo(c[x].neighbors[y].node.x * this.ratios.x, c[x].neighbors[y].node.y * this.ratios.y);
        context.strokeStyle = "rgba(0,0,0,0.5)";
        context.lineWidth = "0.5";
        context.stroke();

        context.fillStyle = "#C47980";
        context.fillText(
          c[x].neighbors[y].distance,
          (c[x].x * this.ratios.x + c[x].neighbors[y].node.x * this.ratios.x) / 2,
          (c[x].y * this.ratios.y + c[x].neighbors[y].node.y * this.ratios.y) / 2
        );
      }
    }
  }
  return this;
}

Ecosystem.prototype.drawCars = function () {
  var cars = this.cars, $this = this;
  cars.map(function (i, o) {
    if (i.driving == true) {
      context.beginPath();
      context.arc(i.location.x * $this.ratios.x, i.location.y * $this.ratios.y, $this.chartSettings.carRadius, 2 * Math.PI, false);
      context.fillStyle = "orange";
      context.fill();
    }
  });

  return this;
}

Ecosystem.prototype.drawSpecialCar = function () {
  context.beginPath();
  context.arc(this.specialCars[0].location.x * this.ratios.x, this.specialCars[0].location.y * this.ratios.y, this.chartSettings.specialCarRadius, 2 * Math.PI, false);
  context.fillStyle = "#25909F";
  context.fill();

  return this;
}

Ecosystem.prototype.drawTitle = function () {
  context.fillStyle = "#444";
  context.textAlign = "center";
  context.font = "700 18pt Roboto"
  context.fillText("US Route Use Simulation", canvas.width / 2, 60);
  return this;
}

Ecosystem.prototype.refresh = function (canvas) {
  canvas.width = canvas.width;
  return this;
}

Ecosystem.prototype.drawOnInterval = function () {
  var $this = this;

  this.moveCarSpecial(earth.shortestPath("Phoenix", "New York City"), earth.specialCars[0]);

  this.cars.map(function (i, o) {
    $this.moveCar(i); // now map the cars
  });
  this
    .refresh(canvas) // refresh canvas first
    .drawCars()
    .monitorRoute()
    .drawCities() // then draw/label cities
    .drawRoutes() // then draw the routes
    .drawTitle()
    .drawSpecialCar()
    .setSpecialSpeed()
}
