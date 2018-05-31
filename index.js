const GameGrid = {
  template: "#game-grid",
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

const getDefaultData = () => ({
  grid_size: 10,
  head: { x: 2, y: 2 },
  tail: [],
  length: 5
});

new Vue({
  el: ".app",
  components: {
    "game-grid": GameGrid
  },
  data: getDefaultData(),
  computed: {
    gameIsOver() {
      return this.tail.find(({ x, y }) => x == this.head.x && y == this.head.y);
    }
  },
  methods: {
    move({ x, y }) {
      if (this.gameIsOver) {
        return;
      }

      const new_head = {
        x: this.head.x + x,
        y: this.head.y + y
      };

      if (
        new_head.x < 0 ||
        new_head.x >= this.grid_size ||
        new_head.y < 0 ||
        new_head.y >= this.grid_size
      ) {
        return;
      }

      this.tail.push(this.head);
      this.tail = this.tail.slice(-this.length);

      this.head = new_head;
    },
    reset() {
      Object.assign(this.$data, getDefaultData());
    }
  }
});
