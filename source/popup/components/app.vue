<template>
  <div>
    <div class="main">
      <b-card no-body bg-variant="light">
        <b-tabs card>
          <b-tab title="Tab 1" active>
            <b-card-text>Tab contents 1</b-card-text>
          </b-tab>
          <b-tab title="Tab 2">
            <b-card-text>Tab contents 2</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>

</template>
<script>

  export default {
  props: {
  },
  data() {
    return {
      data: 'tut'
    };
  },
  methods: {},
  watch: {},
  components: {

  }
};
</script>
<style scoped>
.main {
  width: 333px;
}
</style>
