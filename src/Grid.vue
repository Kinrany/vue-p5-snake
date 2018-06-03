<template>
  <p5 @draw="draw"
      @setup="setup"
      @key-pressed="keyPressed"></p5>
</template>

<script>
import VueP5 from "vue-p5";
import Vector2 from "./Vector2.js";

export default {
  components: {
    p5: VueP5
  },
  props: ["size", "head", "tail", "food"],
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(400, 400);
    },
    draw(sketch) {
      sketch.background("darkgreen");

      // draw grid
      sketch.stroke("black");
      sketch.strokeWeight(0.1);
      for (let i = 0; i <= this.size; ++i) {
        // i-th diagonal junction
        const { topLeft: { x, y } } = this.gridToCanvas(sketch, new Vector2(i));
        sketch.line(x, 0, x, sketch.height);
        sketch.line(0, y, sketch.width, y);
      }

      // draw food
      sketch.strokeWeight(0.5);
      sketch.fill("yellow");
      this.food.forEach(f => {
        const cell = this.gridToCanvas(sketch, f);
        sketch.rect(cell.topLeft.x, cell.topLeft.y, cell.size.x, cell.size.y);
      });

      // draw tail
      sketch.strokeWeight(1);
      sketch.fill("lightblue");
      this.tail.forEach(part => {
        const cell = this.gridToCanvas(sketch, part);
        sketch.ellipse(cell.center.x, cell.center.y, cell.size.x, cell.size.y);
      });

      // draw head
      sketch.strokeWeight(1);
      sketch.fill("blue");
      const cell = this.gridToCanvas(sketch, this.head);
      sketch.ellipse(cell.center.x, cell.center.y, cell.size.x, cell.size.y);
    },
    keyPressed({keyCode}) {
      const keys = {
        87: new Vector2(0, -1), // 'w' key
        65: new Vector2(-1, 0), // 'a' key
        83: new Vector2(0, 1), // 's' key
        68: new Vector2(1, 0) // 'd' key
      };
      if (keyCode in keys) {
        this.$emit("turn", keys[keyCode]);
      }
    },
    gridToCanvas({ width, height }, position) {
      const topLeft = position;
      const center = position.add(new Vector2(0.5));
      const bottomRight = position.add(new Vector2(1));

      const toCanvas = ({ x, y }) =>
        new Vector2(x * width / this.size, y * height / this.size);

      return {
        topLeft: toCanvas(topLeft),
        center: toCanvas(center),
        bottomRight: toCanvas(bottomRight),
        size: new Vector2(width / this.size, height / this.size)
      };
    }
  }
};
</script>