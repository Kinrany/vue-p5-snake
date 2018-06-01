<template>
  <div>
    <grid v-bind="{size: grid_size, head, tail}" v-on="{turn}"></grid>
    <button @click="reset">Reset</button>
    <label v-if="gameIsOver" class="red">The game is over!</label>
  </div>
</template>

<script>
import Grid from "./Grid.vue";

const getDefaultData = () => ({
  grid_size: 10,
  head: { x: 2, y: 2 },
  direction: { x: 1, y: 0 },
  tail: [],
  length: 5,
  deathByWall: false,
  deathByTail: false
});

export default {
  components: {
    grid: Grid
  },
  data: getDefaultData,
  computed: {
    gameIsOver() {
      return this.deathByWall || this.deathByTail;
    }
  },
  methods: {
    turn({ x, y }) {
      if (this.gameIsOver) {
        return;
      }

      if (this.tail.length > 0) {
        const first_tail_part = this.tail.slice(-1)[0];

        const new_head = {
          x: this.head.x + x,
          y: this.head.y + y
        };

        if (
          new_head.x === first_tail_part.x &&
          new_head.y === first_tail_part.y
        ) {
          return;
        }
      }

      this.direction = { x, y };
    },
    move({ x, y }) {
      if (this.gameIsOver) {
        return;
      }

      const new_head = {
        x: this.head.x + x,
        y: this.head.y + y
      };

      // game over if bumped into a wall
      if (
        new_head.x < 0 ||
        new_head.x >= this.grid_size ||
        new_head.y < 0 ||
        new_head.y >= this.grid_size
      ) {
        this.deathByWall = true;
        return;
      }

      // actually move
      this.tail.push(this.head);
      this.tail = this.tail.slice(-this.length);
      this.head = new_head;

      // game over if ate own tail
      if (this.tail.find(({ x, y }) => x == this.head.x && y == this.head.y)) {
        this.deathByTail = true;
      }
    },
    update() {
      this.move(this.direction);
    },
    reset() {
      Object.assign(this.$data, getDefaultData());
    }
  },
  mounted() {
    setInterval(this.update, 100);
  }
};
</script>
