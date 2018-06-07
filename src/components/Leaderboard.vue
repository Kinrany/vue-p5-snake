<template>
  <div>
    <h3>Leaderboard</h3>
    <span v-for="record of topRecords" :key="record.id">
      {{ record.name }} | Level: {{ record.level }} | Score: {{ record.score }} <br/>
    </span>
  </div>
</template>

<script>
export default {
  name: "v-leaderboard",
  computed: {
    topRecords() {
      return this.$store.state.savedRecords
        .slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }
  }
};
</script>
