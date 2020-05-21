<template>
  <div>
    <div class="main">
      <b-card no-body bg-variant="light">
        <b-tabs card>
          <b-tab title="Free" active>
            <b-card-text><free-tab></free-tab></b-card-text>
          </b-tab>
          <b-tab title="Personal">
            <b-card-text><personal-tab></personal-tab></b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<script>

  import FreeTab from './FreeTab.vue';
  import PersonalTab from './PersonalTab.vue';

  export default {
  props: {
  },
  data() {
    return {
      data: 'tut',

    };
  },
  methods: {},
  watch: {},
  components: {
    FreeTab: FreeTab,
    PersonalTab: PersonalTab
  }
};
</script>
<style scoped>
.main {
  width: 333px;
}
</style>
