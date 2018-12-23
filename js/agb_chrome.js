if (!AGB) var AGB = {};
AGB.Manager = {
    Start: function() {
        var strStatus;
        AGB.status = 1;
        AGB.Config.pathSkin = chrome.extension.getURL("/skin/");
        AGB.Config.id = chrome.runtime.id;
        AGB.Config.version = chrome.runtime.getManifest().version;
        AGB.Config.name = STR.check(chrome.runtime.getManifest().name);
        AGB.Config.beta =
            -1 < AGB.Config.name.indexOf("Alpha")
                ? 2
                : -1 < AGB.Config.name.indexOf("Beta")
                ? 1
                : 0;
        AGB.DataBase ? AGB.DataBase.Start(window) : (AGB.DataBase = {});
        AGB.Storage.Start(function() {
            strStatus = 1 < AGB.Config.beta ? "  - Development mode" : "";
            strStatus += AGB.Storage.status
                ? "  Storage Quota: local " +
                chrome.storage.local.QUOTA_BYTES +
                "  sync " +
                chrome.storage.local.QUOTA_BYTES
                : "  Something wrong with chrome.storage";
            AGB.Core.Log(
                "Start  Storage: " +
                AGB.Storage.status +
                "  DataBase: " +
                AGB.DataBase.status +
                (strStatus || ""),
                true
            );
        });
    },
    Check: function(tabId, changeInfo, tabObj) {
        if(OBJ.is(tabObj) && OBJ.is(changeInfo) && "loading" === changeInfo.status) {
            changeInfo = AGB.App.Check(tabObj.url);
            if(OBJ.is(changeInfo) && changeInfo.mode){
                AGB.Manager.Load(changeInfo, tabId);
            }
        }
    },
    Load: function(changeInfo, tabId) {
        1 === changeInfo.mode &&
        chrome.tabs.executeScript(tabId, {
            file: "js/coordinates.js",
            runAt: "document_start"
        });
    },
    loadScripts: function(pages, tabId) {
        if (OBJ.is(pages) && tabId)
            for (var i = 0; i < pages.length; i++)
                pages[i] &&
                chrome.tabs.executeScript(tabId, {
                    file: "js/" + pages[i] + ".js",
                    runAt: "document_start"
                });
    },
    message: function(player, pageParam, action, datas) {
        var playerKey;
        (playerKey = AGB.App.getPlayer(player)) &&
        chrome.tabs.query({ url: "https://*.ogame.gameforge.com/*" }, function(tabs) {
            for (var i = 0; i < tabs.length; i++)
                tabs[i] &&
                tabs[i].id &&
                chrome.tabs.sendMessage(tabs[i].id, {
                    player: playerKey,
                    page: pageParam,
                    role: action,
                    data: datas
                });
        });
    }
};
chrome.tabs.onUpdated.addListener(AGB.Manager.Check);
chrome.runtime.onMessage.addListener(function(message, sender, sendresponse) {
    sendresponse = "function" === typeof sendresponse ? sendresponse : null;
    if (
        (sender = "object" === typeof sender && sender.tab ? sender.tab.id : "") &&
        "object" === typeof message &&
        ("Log" === message.page
            ? window.console.log("AntiGameOrigin:  " + message.para)
            : "Storage" === message.page
                ? "Set" === message.role
                    ? AGB.Storage.Set(message.para)
                    : "Get" === message.role
                        ? AGB.Storage.Get(message.para, sendresponse)
                        : "Remove" === message.role
                            ? AGB.Storage.Remove(message.para)
                            : "RemoveFilter" === message.role && AGB.Storage.RemoveFilter(message.para, sendresponse)
                : "Update" === message.page
                    ? "Check" === message.role &&
                    chrome.runtime.requestUpdateCheck(function(c) {
                        AGB.Manager.message(message.para, "Menu", "Install", c);
                    })
                    : message.page &&
                    OBJ.is(AGB[message.page]) &&
                    "function" === typeof AGB[message.page].Messages &&
                    AGB[message.page].Messages(message.role, message.para, sendresponse, sender),
            sendresponse)
    )
        return true;
});
AGB.Storage = {
    status: 0,
    Start: function(startCompletedCallback) {
        var timestamp;
        AGB.Storage.status = 0;
        chrome.storage && chrome.storage.local
            ? ((timestamp = Math.floor(Date.now() / 1000)),
                chrome.storage.local.set({ App_Start: timestamp }, function() {
                    chrome.storage.local.get(["App_Start"], function(data) {
                        AGB.Storage.status = OBJ.is(data) && +data.App_Start === timestamp ? 1 : 0;
                        startCompletedCallback();
                    });
                }))
            : startCompletedCallback();
    },
    Set: function(a, c) {
        var b, d;
        OBJ.is(a) &&
        ((b = a.sync ? "sync" : "local"),
            a.key ? ((d = {}), (d[a.key] = a.data)) : (d = a.data),
        OBJ.is(d) &&
        Object.keys(d).length &&
        (c
            ? chrome.storage[b].set(d, function() {
                c(chrome.runtime.lastError ? -1 : 1);
            })
            : chrome.storage[b].set(d)));
    },
    Get: function(a, c) {
        var b;
        OBJ.is(a) && a.key && c
            ? ((b = a.sync ? "sync" : "local"),
                OBJ.is(a.key)
                    ? chrome.storage[b].get(Object.keys(a.key), c)
                    : chrome.storage[b].get(a.key, function(b) {
                        c(OBJ.is(b) ? b[a.key] || "" : "");
                    }))
            : c && c("");
    },
    Remove: function(a) {
        var c;
        OBJ.is(a) &&
        a.key &&
        ((c = a.sync ? "sync" : "local"),
            AGB.Core.Log("Delete - storage  - " + a.key, true),
            chrome.storage[c].remove(a.key));
    },
    List: function(a) {
        OBJ.is(a) &&
        (chrome.storage.local.get(null, function(c) {
            OBJ.iterate(c, function(b) {
                (a.filter && 0 !== STR.check(b).indexOf(a.filter)) ||
                AGB.Core.Log("List - storage  - " + b, true);
            });
        }),
            chrome.storage.sync.get(null, function(c) {
                OBJ.iterate(c, function(b) {
                    (a.filter && 0 !== STR.check(b).indexOf(a.filter)) ||
                    AGB.Core.Log("List - sync  - " + b, true);
                });
            }));
    },
    RemoveFilter: function(a) {
        OBJ.is(a) &&
        (chrome.storage.local.get(null, function(c) {
            OBJ.iterate(c, function(b) {
                (a.filter && 0 !== STR.check(b).indexOf(a.filter)) ||
                (AGB.Core.Log("Delete - storage  - " + b, true),
                    chrome.storage.local.remove(b));
            });
        }),
            chrome.storage.sync.get(null, function(c) {
                OBJ.iterate(c, function(b) {
                    (a.filter && 0 !== STR.check(b).indexOf(a.filter)) ||
                    (AGB.Core.Log("Delete - sync  - " + b, true),
                        chrome.storage.sync.remove(b));
                });
            }));
    },
    Sync: function(a) {}
};
