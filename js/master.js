earth.citiesGraph(); // add the graph for dijsktra's algorithm
earth.formRouteHTML(document.getElementById('city-stats')); // add the lower HTML shell

earth.addSpecialCar().setSpecialPath("Phoenix").startDrivingSpecial();

var interval = setInterval(function () {
  routeKeys = Object.keys(earth.routes);
  if (counter < 100) { // each car really represents 100 cars
    for (var x = 0; x < 40; x++) {
      rand = earth.routes[routeKeys[Math.floor(Math.random() * routeKeys.length)]];
      earth.addCar();
      earth.startDriving(rand.c1, rand.c2, 60, earth.cars[earth.cars.length - 1]);
    }
  }
  earth.changeNumLanes();
  earth.drawOnInterval();
  if (counter % 2) {
    earth.printRouteSpeeds();
  }

  counter++;
}, 50);
