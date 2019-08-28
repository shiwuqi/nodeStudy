var MathRandom = function() {
  let num = "";
  for(let i = 0; i < 6; i++) {
    num += Math.floor(Math.random()*10);
  }
  return num;
}

module.exports = {
  MathRandom,
}