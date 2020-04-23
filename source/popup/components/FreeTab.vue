<template>
    <div>
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
</template>

<script>
  export default {
    name: 'FreeTab',
    data() {
      return {
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
        let data = {type: 'free', country: this.selected};
        chrome.runtime.sendMessage({
          data: data
        }, () => {
        });
      },
      onReset() {

      }
    },
    computed: {
      validationCountry(){
        return this.selected!=null;
      },
      validFeedbackCountry() {
        if(this.validationCountry)
          return 'A good choice';
      },
      invalidFeedbackCountry() {
        if(!this.validationCountry)
          return 'Must make a choice'
      }
    }
  };
</script>

<style scoped>

</style>
