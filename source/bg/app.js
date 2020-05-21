let status = false;
let configValue = {};
let message = '';
import { setStorageData, getStorageData } from '../utils.js';




chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  let data = msg.data;
  switch (data.type) {
    case 'free': {
      let url = 'http://localhost:3000/fastest?country=' + data.country;
      fetch(url)
        .then(response => response.json())
        .then(result => {
          // let proxies = result.locations.filter(el => el.country_code === data.country)[0].nodes;
          // connect to first
          console.log(result);
          if (result.nodes[0].ip && result.nodes[0].scheme && result.nodes[0].port) {
            connect(result.nodes[0], result.country_name);
          }
        })
        .catch(err => console.log(err));
      break;
    }
    case 'personal': {
      console.log(data);
      if(data.pass && data.user){
        console.log(data.pass , data.user);
        chrome.webRequest.onAuthRequired.addListener(
          function(details, callbackFn) {
            callbackFn({
              authCredentials: {username: data.user, password: data.pass}
            });
          },
          {urls: ["<all_urls>"]},
          ['asyncBlocking']
        );
      }
      connect(data, data.ip);
      break;
    }
    case 'disconnect': {
      disconnect();
      break;
    }
    default: {
      break;
    }

  }
});

const connect = (proxy, countryName) => {
  console.log('try connect', proxy);
  let config = {
    mode: 'fixed_servers',
    rules: {
      singleProxy: {
        scheme: proxy.scheme,
        host: proxy.ip,
        port: +proxy.port
      }
    }
  };
  configValue = config;
  console.log(config);
  chrome.proxy.settings.set(
    {
      value: config,
      scope: 'regular'
    },
    function () {
    });

// setTimeout(()=> {
  chrome.proxy.settings.get(
    { 'incognito': false },
    function (config) {
      console.log('before if');

      if (config.levelOfControl === 'controlled_by_this_extension' && config.value.mode === configValue.mode && config.value.rules.singleProxy.host === config.value.rules.singleProxy.host) {
        console.log('after if');
        status = true;
        message = 'you are connected to ' + countryName;
        setStorageData({
          'status': {
            status: status,
            message: message
          }
        });
        getStorageData('status')
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    });
// },1000);

};
const disconnect = () => {
  console.log('try disconnect');
  chrome.proxy.settings.clear({}, function () {
  });
  chrome.proxy.settings.get(
    { 'incognito': false },
    function (config) {
      if (!(config.levelOfControl === 'controlled_by_this_extension' && config.value.mode === configValue.mode && config.value.rules.singleProxy.host === config.value.rules.singleProxy.host)) {
        console.log(' in if');
        status = false;
        message = 'you are disconnected';
        chrome.storage.local.set({
          'status': {
            status: status,
            message: message
          }
        });
      }
    });
  setTimeout(() => {
    getStorageData('status')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, 300);
};
