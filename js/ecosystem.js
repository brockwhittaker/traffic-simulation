var canvas, context;

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');
canvas.width = Math.min(window.innerWidth * 0.8, 2400);
canvas.height = canvas.width * 0.6;

function Ecosystem () {
  this.parameters = {};
  this.cars = [];
  this.specialCars = [];
  this.specialCarsPath;
  this.cities = {};
  this.routes = {};
  this.recursion = {};
  this.chartSettings = {
    "radius": 2,
    "carRadius": 1,
    "specialCarRadius": 4,
    "font": "400 6pt Roboto",
    "speedColor": {
      "30": "#7C1B1B",
      "40": "#B63A2A",
      "50": "#B6702A",
      "60": "#D1BB13",
      "70": "#5CB244"
    },
    "offset": {
      "latitude": [67, 33],
      "longitude": [-16, 48] // the ratio of total latitude to total longitude should be 1/2
      /*
      "latitude": [51, 24],
      "longitude": [-127, -65] // the ratio of total latitude to total longitude should be 1/2
      */
    },
    "speed": {
      "rollingAverage": 50,
      "addLaneThresh": 55,
      "removeLaneThresh": 70,
      "distanceWeight": 12
    }
  };
  this.carSettings = {
    speed: 75,
    multiplier: 500
  };

  this.createLandscape = function (canvas, width, height) {
    this.parameters.width = width;
    this.parameters.height = height;
    this.ratios = {
      "x": canvas.width / width,
      "y": canvas.height / height
    };
    return this;
  };
}
