'use strict';
if (!AGB) {
    var AGB = {};
}
AGB.Config = {
    id : "",
    beta : 0,
    version : "",
    pathSkin : ""
};
AGB.Core = {
    Log : function(text, multiplier) {
        if (AGB.Config.beta || multiplier) {
            window.console.log("AntiGameOriginX:  " + text);
        }
    },
    setTimeout : function(callback, delay) {
        return window.setTimeout(callback, delay);
    },
    clearTimeout : function(timerId) {
        if (timerId) {
            window.clearTimeout(timerId);
            timerId = null;
        }
    },
    resourceFile : function(url) {
        var xhr;
        if (url) {
            try {
                xhr = new XMLHttpRequest;
                xhr.open("GET", chrome.extension.getURL(url), false);
                xhr.overrideMimeType("text/plain");
                xhr.send(null);
                return xhr.responseText || "";
            } catch (e) {
                return "";
            }
        }
        return "";
    }
};
window.setTimeout(function() {
    if (AGB.Manager) {
        AGB.Manager.Start();
    }
}, 1000);
