<template>
  <div>
    <v-game @game-over="setNewRecord"></v-game>
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
    records: {
      saved: [],
      new: null
    }
  }),
  methods: {
    setNewRecord(newRecord) {
      newRecord.name = `Game ${this.records.saved.length}`;
      this.records.new = newRecord;
    }
  }
};
</script>
