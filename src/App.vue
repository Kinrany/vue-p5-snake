<template>
  <div>
    <v-game @game-over="addRecord"></v-game>
    <v-leaderboard :records="records"></v-leaderboard>
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
  data: () => ({
    records: []
  }),
  methods: {
    addRecord(record) {
      record.id = Math.random();
      this.records.push(record);
    }
  }
};
</script>
