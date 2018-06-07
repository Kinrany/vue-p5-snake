<template>
  <div>
    <h3>Leaderboard</h3>
    <username-input v-if="gameResult"></username-input>
    <span v-for="record of topRecords" :key="record.id">
      {{ record.name }} | Level: {{ record.level }} | Score: {{ record.score }} <br/>
    </span>
  </div>
</template>

<script>
import UsernameInput from "./LeaderboardUsernameInput.vue";

export default {
  name: "v-leaderboard",
  components: {
    "username-input": UsernameInput
  },
  computed: {
    gameResult() {
      return this.$store.state.gameResult;
    },
    topRecords() {
      return this.$store.state.savedRecords
        .slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }
  }
};
</script>
