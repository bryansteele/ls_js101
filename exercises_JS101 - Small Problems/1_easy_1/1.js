function isOdd(num) {
  return Math.abs(num) % 2 !== 0;
}

console.log(isOdd(2));
console.log(isOdd(5));
console.log(isOdd(-17));
console.log(isOdd(-8));
console.log(isOdd(0));
console.log(isOdd(7));