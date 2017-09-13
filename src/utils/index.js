export const rgbToHex = (...args) => {
  return '#' + args.map((el) => {
    var n = ~~(el * 255);
    return n < 16 ? '0' + n.toString(16) : n.toString(16)
  }).join('');
}

export const getCurrentColor = (startColor, stepUpdatingColor, passedTime) => {
  return startColor.map((el, index) => {
    return el + stepUpdatingColor[index] * passedTime
  });
}

export const getStepUpdatingColor = (startColor, endColor, time) => {
  return [
    (endColor[0] - startColor[0]) / time,
    (endColor[1] - startColor[1]) / time,
    (endColor[2] - startColor[2]) / time
  ];
}