<template>
  <form @submit.prevent="submit">
    <input type="text" v-model="record.name"/>
    | Level: {{ record.level }} | Score: {{ record.score }}
  </form>
</template>

<script>
export default {
  props: ["record"],
  methods: {
    submit() {
      this.$emit("finished");
    }
  }
};
</script>
