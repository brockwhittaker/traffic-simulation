Ecosystem.prototype.formRouteHTML = function (elem) {
  var c = this.cities,
      r = this.routes,
      u_c = {},
      node,
      k = Object.keys(c).sort();
  for (var x = 0; x < k.length; x++) {
    node = document.createElement('div');
    node.className = "city-section";
    node.id = k[x].replace(/ /g, "_");
    node.innerHTML = "<h2>" + k[x] + "</h2>";
    node.innerHTML += "<p class='population-stat'>Population: " + c[k[x]].population + "M</p>"
    elem.appendChild(node);
  }
  for (var x in r) {
    var node = document.createElement('div');
    node.id = x.replace(/ /g, "_");
    node.className = "ind-route";

    elem.children[(x.split(/-/g)[0].replace(/ /g, "_"))].appendChild(node);
  }
  return elem;
}

Ecosystem.prototype.printRouteSpeeds = function () {
  var r = this.routes,
      HTML,
      sc = document.getElementById('special-car-stats');

  for (var x in r) {
    speedColor = this.chartSettings.speedColor[Math.floor((r[x].distance / (r[x].stats.driveTime[0] / 20)) / 10) * 10];

    if (!speedColor)
      speedColor = "#888";

    HTML = document.getElementById(x.replace(/ /g, "_"));
    HTML.innerHTML = "<h3>" + r[x].c2 + "</h3>";
    if ((r[x].distance / (r[x].stats.driveTime[0] / 20)).toFixed(2) > this.carSettings.speed)
      HTML.innerHTML += "<p>Speed: N/A</p>";
    else
      HTML.innerHTML += "<p>Speed: <span style='color: " + speedColor + "'>" + (r[x].distance / (r[x].stats.driveTime[0] / 20)).toFixed(2) + " MPH</span></p>";

    HTML.innerHTML += "<p>Cars/Mile: " + (r[x].drivers.length / r[x].distance * this.carSettings.multiplier).toFixed(2) + "</p>";
    HTML.innerHTML += "<p>Total Drivers: " + r[x].stats.driveTime[2] * this.carSettings.multiplier + "</p>";
    HTML.innerHTML += "<p>Total Lanes: " + r[x].stats.lanes + "</p>";
  }

  sc_speedColor = earth.specialCars[0].speed
  if (!speedColor)
    sc_speedColor = "#888";

  sc.innerHTML = "<p>Next Destination: " + this.specialCarsPath[this.specialCarsPath.length - 1] + "</p>";
  sc.innerHTML += "<p style='margin-bottom: 20px'>Current Speed: <span style='color: " + sc_speedColor + "'>" + this.specialCars[0].speed.toFixed(2) + " MPH</span></p>"
}
