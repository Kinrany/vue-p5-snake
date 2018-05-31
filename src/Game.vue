<template>
  <div>
    <grid v-bind="{size: grid_size, head, tail}" v-on="{move}"></grid>
    <button @click="reset">Reset</button>
    <label v-if="gameIsOver" class="red">The game is over!</label>
  </div>
</template>

<script>
import Grid from "./Grid.vue";

const getDefaultData = () => ({
  grid_size: 10,
  head: { x: 2, y: 2 },
  tail: [],
  length: 5
});

export default {
  components: {
    grid: Grid
  },
  data: getDefaultData,
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
};
</script>
