export function secondsToMs(d) {
  d = Number(d);

  var m = Math.floor(d  / 60);
  var s = Math.floor(d  % 60);
  // slice romoves 0 (index -2) if there is 2 digits number of minutes or seconds
  return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}
