// let proxySettings = {};
// let url = "https://api.getproxylist.com/proxy?lastTested=600&protocol[]=socks4&protocol[]=socks5?allowsPost=1&allowsHttps=1";
//
// chrome.runtime.onMessage.addListener((msg) => {
//   console.log(msg);
//   if(msg.data === true){
//     $.getJSON(url).done(data => {
//       console.log(data)
//       proxySettings = {
//         mode: "fixed_servers",
//         rules: {
//           singleProxy: {
//             scheme: data.protocol,
//             host: data.ip,
//             port: data.port
//           }
//         }
//       };
//       chrome.proxy.settings.set(
//         {value: proxySettings, scope: 'regular'},
//         function() {});
//     });
//
//
//     chrome.proxy.settings.get(
//       {'incognito': false},
//       function(config) {console.log(JSON.stringify(config));});
//
//   }else{
//     chrome.proxy.settings.set(
//       {value: {"mode":"system"}, scope: 'regular'},
//       function() {});
//   }
// });
let configFree = {
  country: 'GB',
  type: 'https',
  anon: 'elite'
};
let url = 'https://www.proxy-list.download/api/v1/get?type=http';
// let url = 'https://www.proxy-list.download/api/v1/get?type=http&anon=elite';


// async function reloadData(url) {
//   const response = await fetch(url);
//
//   if (response.ok) { // если HTTP-статус в диапазоне 200-299
//     // получаем тело ответа (см. про этот метод ниже)
//     let text = await response.text();
//     console.log(text);
//   } else {
//     console.log("Ошибка HTTP: " + response.status);
//   }
// }
// reloadData(url);


const connect = (rules) => {
  proxySettings = {
    mode: 'fixed_servers',
    rules: rules
  };

chrome.proxy.settings.set(
  {
    value: proxySettings,
    scope: 'regular'
  },
  function (res) {
    console.log(res);
  });
};


const reloadData = (url) => {
  console.log('reload');
  fetch(url)
    .then(response => response.text())
    .then(result => {
      if (result) {
        let dataArray = result.split('\n');
        console.log('set', dataArray[0]);
        chrome.storage.local.set({ 'data': dataArray[0] });
        // connecting
      }
    })
    .catch(error => console.log(error));
};


// 'country[]=CA&country[]=US'


// setInterval(()=> {
//   reloadData(url);
// }, 10000);
//
// reloadData(url);
//
// setInterval(() => {
//   chrome.storage.local.get(['data'], (res) => {
//     console.log(res);
//   })
// }, 5000);


const changeCountry = (config) => {
  url = url.split('&country=')[0] + '&country=' + config.country;
  return true;
};


chrome.runtime.onMessage.addListener((msg) => {
  let data = msg.data;
  console.log(data);
  switch (data.type) {
    case 'free': {
      configFree.country = data.country;
      if (changeCountry(configFree)) {
        reloadData(url);

        chrome.storage.local.get(['data'], (res) => {
          console.log(res);
          if(res){
            console.log(res);
            const ipPort = res.data.split(':');
            const rules = {
              singleProxy: {
                scheme: configFree.type,
                host: ipPort[0],
                port: ipPort[1]
              }
            };
            console.log('rules', rules);
          }

        });

      }
      break;
    }
    case 'personal': {
      console.log(data.type);
      break;
    }
    default: {
      break;
    }

  }

});

