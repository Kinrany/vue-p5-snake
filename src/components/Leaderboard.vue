<template>
  <div>
    <h3>Leaderboard</h3>
    <username-input 
      v-if="records.new" 
      :record="records.new"
      @finished="saveNewRecord">
    </username-input>
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
  props: {
    records: {
      type: Object,
      required: true
    }
  },
  computed: {
    topRecords() {
      return this.records.saved
        .slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }
  },
  methods: {
    saveNewRecord() {
      const newRecord = this.records.new;
      this.records.new = null;
      this.records.saved.push(newRecord);
    }
  }
};
</script>
