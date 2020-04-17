let proxySettings = {};
    let url = "https://api.getproxylist.com/proxy?lastTested=600&protocol[]=socks4&protocol[]=socks5?allowsPost=1&allowsHttps=1";



chrome.runtime.onMessage.addListener((msg) => {
    console.log(msg);
    if(msg.data === true){
          $.getJSON(url).done(data => {
        console.log(data)
              proxySettings = {
                  mode: "fixed_servers",
                  rules: {
                      singleProxy: {
                          scheme: data.protocol,
                          host: data.ip,
                          port: data.port
                      }
                  }
              };
              chrome.proxy.settings.set(
                  {value: proxySettings, scope: 'regular'},
                  function() {});
          });


        chrome.proxy.settings.get(
            {'incognito': false},
            function(config) {console.log(JSON.stringify(config));});

    }else{
        chrome.proxy.settings.set(
            {value: {"mode":"system"}, scope: 'regular'},
            function() {});
    }
});





