<template>
  <form @submit.prevent="submit">
    <input type="text" v-model="name"/>
    | Level: {{ gameResult.level }} | Score: {{ gameResult.score }}
  </form>
</template>

<script>
export default {
  data() {
    return { name: null };
  },
  computed: {
    gameResult() {
      return this.$store.state.gameResult;
    }
  },
  methods: {
    submit() {
      this.$store.commit("saveGameResultWithName", this.name);
    }
  },
  created() {
    this.name = `Game ${this.gameResult.id}`;
  }
};
</script>
