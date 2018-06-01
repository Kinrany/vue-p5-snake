<template>
  <div>
    Score: {{ score }}
    <grid v-bind="{size: grid_size, head, tail, food}" v-on="{turn}"></grid>
    <button @click="reset">Reset</button>
    <label v-if="gameIsOver" class="red">The game is over!</label>
  </div>
</template>

<script>
import Grid from "./Grid.vue";
import getRandomInt from "./getRandomInt.js";
import Vector2 from "./Vector2.js";

const getDefaultData = () => ({
  grid_size: 50,
  head: new Vector2(5, 5),
  direction: new Vector2(1, 0),
  tail: [],
  deathByWall: false,
  deathByTail: false,
  food: [],
  score: 0
});

export default {
  components: {
    grid: Grid
  },
  data: getDefaultData,
  computed: {
    gameIsOver() {
      return this.deathByWall || this.deathByTail;
    },
    length() {
      return 10 + this.score;
    }
  },
  methods: {
    turn(direction) {
      if (this.gameIsOver) {
        return;
      }

      if (this.tail.length > 0) {
        const first_tail_part = this.tail.slice(-1)[0];
        const new_head = this.head.add(direction);
        if (new_head.isEqual(first_tail_part)) {
          return;
        }
      }

      this.direction = direction.clone();
    },
    move(direction) {
      if (this.gameIsOver) {
        return;
      }

      const new_head = this.head.add(direction);

      // game over if bumped into a wall
      {
        if (!new_head.isBetween(new Vector2(0), new Vector2(this.grid_size))) {
          this.deathByWall = true;
          return;
        }
      }

      // actually move
      {
        this.tail.push(this.head);
        this.tail = this.tail.slice(-this.length);
        this.head = new_head;
      }

      // game over if ate own tail
      {
        if (this.tail.find(part => part.isEqual(this.head))) {
          this.deathByTail = true;
          return;
        }
      }

      // eat food
      {
        let f;
        if ((f = this.food.find(f => f.isEqual(this.head)))) {
          this.score += 1;
          let index = this.food.indexOf(f);
          this.food.splice(index, 1);
        }
      }
    },
    spawnFood() {
      this.food.push(
        new Vector2(
          getRandomInt(0, this.grid_size),
          getRandomInt(0, this.grid_size)
        )
      );
    },
    update() {
      this.move(this.direction);
      if (this.food.length === 0) {
        this.spawnFood();
      }
    },
    reset() {
      Object.assign(this.$data, getDefaultData());
    }
  },
  mounted() {
    setInterval(this.update, 50);
  }
};
</script>
