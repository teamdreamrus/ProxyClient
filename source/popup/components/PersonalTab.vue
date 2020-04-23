<template>
    <div>
<b-form  @submit.prevent="onSubmit" @reset="onReset">
    <b-form-group
            id="Protocol"
            description=""
            label="Protocol"
            label-for="protocol"
            :invalid-feedback="invalidFeedbackProtocol"
            :valid-feedback="validFeedbackProtocol"
            :state="validationProtocol"
    >
        <b-form-select :state="validationProtocol" v-model="selected" :options="options" id="protocol"></b-form-select>
    </b-form-group>

    <b-form-group
            id="IP"
            description=""
            label="IP"
            label-for="ip"
            :invalid-feedback="invalidFeedbackIP"
            :valid-feedback="validFeedbackIP"
            :state="validationIP"
    >
        <b-form-input id="ip" v-model="ip" :state="validationIP" trim></b-form-input>
    </b-form-group>

    <b-form-group
            id="Port"
            description=""
            label="Port"
            label-for="port"
            :invalid-feedback="invalidFeedbackPort"
            :valid-feedback="validFeedbackPort"
            :state="validationPort"
    >
        <b-form-input id="port" v-model="port" :state="validationPort" trim></b-form-input>
    </b-form-group>

        <button :disabled="!(validationProtocol && validationIP && validationPort)" class="btn btn-success" type="submit">Connect</button>
    </b-form>
    </div>
</template>

<script>

  export default {
    name: 'PersonalTab',
    data() {
      return {
        ip: '127.0.0.1',
        port: '8888',
        selected: null,
        options: [
          { value: null, text: 'Please select some protocol' },
          { value: 'http', text: 'HTTP' },
          { value: 'https', text: 'HTTPS' },
          { value: 'socks4', text: 'SOCKS4' },
          { value: 'socks5', text: 'SOCKS5' }
        ]
      }
    },

    components: {
    },
    methods: {
      onSubmit() {
        console.log('submit');
        let data = {type: 'personal', ip: this.ip, port: this.port, schema: this.selected};
        chrome.runtime.sendMessage({
          data: data
        }, () => {
        });
      },
      onReset() {

      }
    },
    computed: {
      validationIP() {
        return this.ip.length > 8 && this.ip.length < 16
      },
      validFeedbackIP() {
        if(this.validationIP)
          return 'Looks Good';
      },
      invalidFeedbackIP() {
        if(!this.validationProtocol)
          return 'IP must be 9-15 characters long'
      },
      validationPort() {
        return this.port.length > 1;
      },
      validFeedbackPort() {
        if(this.validationPort)
          return 'Looks Good';
      },
      invalidFeedbackPort() {
        if(!this.validationPort)
          return 'impossible port'
      },
      validationProtocol(){
        return this.selected!=null;
      },
      validFeedbackProtocol() {
        if(this.validationProtocol)
           return 'A good choice';
      },
      invalidFeedbackProtocol() {
        if(!this.validationProtocol)
            return 'Must make a choice'
      }
    },
  };
</script>

<style scoped>

</style>
