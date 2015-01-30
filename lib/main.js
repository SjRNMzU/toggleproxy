var { ToggleButton } = require("sdk/ui/button/toggle");
var prefs = require("sdk/preferences/service");

var button = ToggleButton({
    id: "toggleproxy",
    label: "Toggle Proxy",
    icon: {
        "16": "./16x16.png",
        "32": "./32x32.png",
        "48": "./48x48.png",
        "64": "./64x64.png",
        "128": "./128x128.png",
        "256": "./256x256.png"
    },
    onClick: handleClick,
    badge: "Tor",
    badgeColor: "#DD0000"
  });

//Save proxy settings into object
function setProxy(proxy){
    Object.keys(proxy).forEach(function(key, keyIndex, KeyArr){
        prefs.set("network.proxy.".concat(key), proxy[key]);
    });
}

//Read proxy settings into object from about:config
function getProxy(){
    var keys = prefs.keys("network.proxy");
    var proxy = {};
    keys.forEach(function(key, keyIndex){
        proxy[key.replace(/^network.proxy./g, "")] = prefs.get(key);
    });
    return proxy;
}

//togle network.proxy.type 
function toggleProxy(){
    /** network.proxy.type configs
        let PROXY_TYPE_NONE = 0;
        let PROXY_TYPE_MANUAL = 1;
        let PROXY_TYPE_SYSTEM = 5;
    */
    let proxySettings = getProxy();
    proxySettings.type = +(!proxySettings.type);
    setProxy(proxySettings);
    return proxySettings.type;
}

//Get current proxy status and set type accordingly
function init(){
    let proxyEnabled = getProxy().type;
    button.badgeColor = proxyEnabled ? "#00AA00" : "#DD0000"; // Red or Green
}

//Toggle button handler
function handleClick(state) {
    button.badgeColor = toggleProxy() ? "#00AA00" : "#DD0000"; // Red or Green
}

init();
