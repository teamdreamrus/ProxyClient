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
// let url = 'https://www.proxy-list.download/api/v1/get?type=http&anon=elite';


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


//
// let proxySettings = {
//   mode: "fixed_servers",
//   rules: {
//     singleProxy: {
//       scheme: 'https',
//       host: '78.186.109.7',
//       port: 4145
//     }
//   }
// };
// chrome.proxy.settings.set(
//   {value: proxySettings, scope: 'regular'},
//   function() {});


//
// let configFree = {
//   country: 'GB',
//   type: 'https',
//   anon: 'elite'
// };
// let url = 'https://www.proxy-list.download/api/v1/get?type=https&anon=elite';
//
//
//
//
// const connect = (rules) => {
//   let proxySettings = {
//     mode: 'fixed_servers',
//     rules: rules
//   };
//
//   chrome.proxy.settings.set(
//     {
//       value: proxySettings,
//       scope: 'regular'
//     },
//     function () {});
//   chrome.proxy.settings.get(
//     {},
//     function (config) {
//       console.log(JSON.stringify(config));
//     });
// };
//
//
// const reloadData = (url) => {
//   console.log('reload');
//   fetch(url)
//     .then(response => response.text())
//     .then(result => {
//       if (result) {
//         let dataArray = result.split('\n');
//         console.log('set', dataArray[0]);
//         // chrome.storage.local.set({ 'data': dataArray[0] });
//         // connecting
//         let res = dataArray[0];
//         console.log(res);
//         if (res) {
//           console.log(res);
//           const ipPort = res.split(':');
//           const rules = {
//             singleProxy: {
//               scheme: configFree.type,
//               host: ipPort[0],
//               port: +ipPort[1]
//             }
//           };
//           console.log('rules', rules);
//           connect(rules);
//         }
//       }
//     })
//     .catch(error => console.log(error));
// };
//
//
//
//
//
// const changeCountry = (config) => {
//   url = url.split('&country=')[0] + '&country=' + config.country;
//   return true;
// };


chrome.runtime.onMessage.addListener((msg) => {
  let data = msg.data;
  switch (data.type) {
    case 'free': {
      let url = 'http://localhost:3000/getProxies';
      fetch(url)
        .then(response => response.json())
        .then(result => {
          let proxies = result.locations.filter(el => el.country_code === data.country)[0].nodes;
         // connect to first
          connect(proxies[0]);
        })
        .catch(err => console.log(err));
      break;
    }
    case 'personal': {
      console.log(data);
      connect(data);
      //connect to data
      break;
    }
    default: {
      break;
    }

  }
});

const connect = (proxy) => {
  console.log('try connect', proxy);


  var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: 'http',
        host: proxy.ip,
        port: +proxy.port
      }
    }
  };
  console.log(config);
  chrome.proxy.settings.set(
    {value: config, scope: 'regular'},
    function() {});



//  let proxySettings = {
//     mode: "fixed_servers",
//     rules: {
//       singleProxy: {
//         scheme: proxy.schema,
//         host: proxy.ip,
//         port: +proxy.port
//       }
//     }
//   };
// console.log(proxySettings);
//   chrome.proxy.settings.set(
//     {value: proxySettings, scope: 'regular'},
//     function() {});
//
setTimeout(()=> {
  chrome.proxy.settings.get(
    {'incognito': false},
    function(config) {console.log(config);});
},6000);

};
const disconnect = () => {
  console.log('try disconnect');
  chrome.proxy.settings.clear({}, function () {
  });
};
