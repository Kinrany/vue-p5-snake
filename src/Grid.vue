<template>
  <p5 v-bind="{draw, setup}" @key-pressed="keyPressed"></p5>
</template>

<script>
import VueP5 from 'vue-p5';

export default {
  components: {
    p5: VueP5
  },
  props: ["size", "head", "tail"],
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(200, 200);
    },
    draw(sketch) {
      sketch.background("darkgreen");

      // draw grid
      sketch.stroke("black");
      sketch.strokeWeight(2);
      for (let i = 0; i <= this.size; ++i) {
        // i-th diagonal junction
        let { x, y } = this.gridToCanvas(sketch, { x: i, y: i });

        sketch.line(x, 0, x, sketch.height);
        sketch.line(0, y, sketch.width, y);
      }

      // draw tail
      this.tail.forEach(part => {
        let { x, y } = this.gridToCanvas(sketch, part, { x: 0.5, y: 0.5 });
        sketch.fill("lightblue");
        sketch.ellipse(x, y, 10, 10);
      });

      // draw head
      let { x, y } = this.gridToCanvas(sketch, this.head, { x: 0.5, y: 0.5 });
      sketch.fill("blue");
      sketch.ellipse(x, y, 10, 10);
    },
    keyPressed(keyCode) {
      const keys = {
        87: { x: 0, y: -1 }, // 'w' key
        65: { x: -1, y: 0 }, // 'a' key
        83: { x: 0, y: 1 }, // 's' key
        68: { x: 1, y: 0 } // 'd' key
      };
      if (keyCode in keys) {
        this.$emit("move", keys[keyCode]);
      }
    },
    gridToCanvas(
      { width, height },
      { x: posX, y: posY },
      { x: offsetX = 0, y: offsetY = 0 } = {}
    ) {
      return {
        x: (posX + offsetX) * width / this.size,
        y: (posY + offsetY) * height / this.size
      };
    }
  }
};
</script>