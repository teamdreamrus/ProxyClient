<template>
    <div>
        <div v-if="!connected">
            <b-form @submit.prevent="onSubmit" @reset="onReset">
                <b-form-group
                        id="Country"
                        description=""
                        label="Country"
                        label-for="country"
                        :invalid-feedback="invalidFeedbackCountry"
                        :valid-feedback="validFeedbackCountry"
                        :state="validationCountry"
                >
                    <b-form-select :state="validationCountry" v-model="selected" :options="options"
                                   id="country"></b-form-select>
                </b-form-group>
                <button :disabled="!validationCountry" class="btn btn-success"
                        type="submit">Connect
                </button>

            </b-form>
        </div>
        <div v-if="connected">
            <button class="btn btn-danger"
                    type="button" @click="onReset">Disconnect
            </button>
        </div>
    </div>
</template>

<script>
  import { getStorageData } from '../../utils.js';

  export default {
    name: 'FreeTab',
    data() {
      return {
        connected: false,
        message: '',
        selected: null,
        options: [
          {
            value: null,
            text: 'Please select some country'
          },
          {
            value: 'RU',
            text: 'Russia'
          },
          {
            value: 'GB',
            text: 'United Kingdom'
          },
          {
            value: 'US',
            text: 'USA'
          },
          {
            value: 'NL',
            text: 'Netherlands'
          },
          {
            value: 'DE',
            text: 'Germany'
          },
          {
            value: 'FR',
            text: 'France'
          }

        ]
      };
    },
    methods: {
      onSubmit() {
        let data = {
          type: 'free',
          country: this.selected
        };
        chrome.runtime.sendMessage({
          data: data
        }, () => {
        });
        setTimeout(() => {
          getStorageData('status')
            .then(res => {
              console.log(res.status);
              this.connected = res.status.status;
              this.message = res.status.message;
            })
            .catch(err => console.log(err));
        }, 1000);
      },
      onReset() {
        let data = {
          type: 'disconnect'
        };
        chrome.runtime.sendMessage({
          data: data
        }, () => {
        });
        setTimeout(() => {
          getStorageData('status')
            .then(res => {
              console.log(res.status);
              this.connected = res.status.status;
              this.message = res.status.message;
            })
            .catch(err => console.log(err));
        }, 500);
      }
    },
    computed: {
      validationCountry() {
        return this.selected != null;
      },
      validFeedbackCountry() {
        if (this.validationCountry) {
          return 'A good choice';
        }
      },
      invalidFeedbackCountry() {
        if (!this.validationCountry) {
          return 'Must make a choice';
        }
      }
    },
    beforeCreate() {
      getStorageData('status')
        .then(res => {
          console.log(res.status);
          this.connected = res.status.status;
          this.message = res.status.message;
        })
        .catch(err => console.log(err));
    }
  };
</script>

<style scoped>

</style>
