Ecosystem.prototype.mapLat = function (lat) {
  return (lat - this.chartSettings.offset.latitude[0]) / (this.chartSettings.offset.latitude[1] - this.chartSettings.offset.latitude[0]);
}

Ecosystem.prototype.mapLong = function (long) {
  return (long - this.chartSettings.offset.longitude[0]) / (this.chartSettings.offset.longitude[1] - this.chartSettings.offset.longitude[0]);
}
