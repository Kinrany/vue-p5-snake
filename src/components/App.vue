<template>
  <div>
    <v-game @game-over="onGameOver"></v-game>
    <v-leaderboard></v-leaderboard>
  </div>
</template>

<script>
import Game from "./Game.vue";
import Leaderboard from "./Leaderboard.vue";

export default {
  components: {
    "v-game": Game,
    "v-leaderboard": Leaderboard
  },
  methods: {
    onGameOver(gameResult) {
      this.$store.commit("setGameResult", gameResult);
    }
  }
};
</script>
