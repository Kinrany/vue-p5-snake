export default class Vector2 {
  constructor(x, y=x) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  add(that) {
    return new Vector2(
      this.x + that.x,
      this.y + that.y
    );
  }

  isEqual(that) {
    return this.x == that.x && this.y == that.y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  /**
   * Each coordinate is on [min, max) half-interval
   * @param {Vector2} min 
   * @param {Vector2} max 
   */
  isBetween(min, max) {
    return min.x <= this.x && this.x < max.x &&
      min.y <= this.y && this.y < max.y;
  }
}