<template>
  <div>
    <h2>{{data}}</h2>
  </div>

</template>
<script>
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)
import {
  sample
} from 'lodash';
import { sendContentMessage, setStorageData, getStorageData } from '../../utils';
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
   
  },
  asyncComputed: {
  }
};
</script>
<style lang="less">
  
</style>
