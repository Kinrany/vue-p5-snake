<template>
  <div>
    Level: {{ snakeLevel }} <br/>
    Score: {{ score }}
    <grid v-bind="{size: grid_size, head, tail, food}" v-on="{turn}"></grid>
    <button @click="reset">Restart</button>
    <label v-if="gameIsOver" class="red">The game is over!</label>
  </div>
</template>

<script>
import Grid from "./Grid.vue";
import getRandomInt from "./getRandomInt.js";
import Vector2 from "./Vector2.js";

const getDefaultData = () => ({
  grid_size: 30,
  head: new Vector2(10, 10),
  direction: null,
  tail: [],
  gameIsOver: false,
  food: [],
  score: 0
});

export default {
  components: {
    grid: Grid
  },
  data: getDefaultData,
  computed: {
    gameStarted() {
      return this.direction !== null;
    },
    gameRunning() {
      return this.gameStarted && !this.gameIsOver;
    },
    snakeLevel() {
      return Math.floor(1 + Math.log(1 + this.score) / Math.log(Math.PI));
    },
    length() {
      return 10 + this.score + this.snakeLevel * 4;
    },
    record() {
      return {
        name: "username",
        level: this.snakeLevel,
        score: this.score
      };
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
      const new_head = this.head.add(direction);

      // game over if bumped into a wall
      {
        if (!new_head.isBetween(new Vector2(0), new Vector2(this.grid_size))) {
          4;
          this.onGameOver();
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
          this.onGameOver();
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
    onGameOver() {
      this.gameIsOver = true;
      this.$emit("game-over", this.record);
    },
    spawnFood() {
      while (this.food.length < this.snakeLevel) {
        this.food.push(
          new Vector2(
            getRandomInt(0, this.grid_size),
            getRandomInt(0, this.grid_size)
          )
        );
      }
    },
    update() {
      if (this.gameRunning) {
        this.move(this.direction);
      }
      this.spawnFood();
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

<style scoped>
.red {
  color: red;
}
</style>
