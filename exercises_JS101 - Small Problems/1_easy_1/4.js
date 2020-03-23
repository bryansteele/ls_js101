const RLSYNC = require('readline-sync');
const SQUARE_METER_TO_FT = 10.7639; 

let length = Number(RLSYNC.question('Enter length of room: '));
console.log(length);

let width = Number(RLSYNC.question('Enter width of room: '));
console.log(width);

let measurement = RLSYNC.question("Enter (M) Meters or (F) Feet: ").toLowerCase();

if (measurement === 'm') {
  areaInMeters = length * width;
  console.log(`The area of the room is ${areaInMeters.toFixed(2)} square meters.`);
} else {
  areaInFeet = (length * width) * SQUARE_METER_TO_FT;
  console.log(`The area of the room is ${areaInFeet.toFixed(2)} square feet`);
}
