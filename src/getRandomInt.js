/** Get random integer number from [min, max) half-interval */
export default function getRandomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}