if (!AGO){
    var AGO = {};
}
AGO.versionOGameMax = "5.7.99";
if (window.navigator.userAgent.includes("Firefox")){
    AGO.isPhone = window.navigator.userAgent.includes("Mobile");
    AGO.isTablet = window.navigator.userAgent.includes("Tablet");
    AGO.isMobile = AGO.isPhone || AGO.isTablet;
    AGO.isFirefox = false;
}
AGO.isChrome = window.navigator.userAgent.includes("Chrome");
AGO.context = AGO.isFirefox ? this : 0;
AGO.Page = {
    Messages: function(a, b) {
        AGO.dummy = a + b;
    }
};
var PAGE = {},
    AGB = {
        messageFirefox: function(a, b, c, d) {
            c &&
            ((c.keyPlayer = AGO.App.keyPlayer),
                "function" === typeof d
                    ? API.Messages(
                    a,
                    b,
                    JSON.stringify(c),
                    function(a) {
                        d(JSON.parse(a));
                    },
                    "App" === a ? AGO.context : null
                    )
                    : API.Messages(
                    a,
                    b,
                    JSON.stringify(c),
                    null,
                    "App" === a ? AGO.context : null
                    ));
        },
        messageChrome: function(a, b, c, d) {
            c &&
            ((c.keyPlayer = AGO.App.keyPlayer),
                "function" === typeof d
                    ? chrome.runtime.sendMessage(
                    "",
                    {
                        page: a,
                        role: b,
                        para: c
                    },
                    null,
                    d
                    )
                    : chrome.runtime.sendMessage("", {
                        page: a,
                        role: b,
                        para: c
                    }));
        },
        Resource: function(a) {
            var b;
            if ((a = STR.check(a))) {
                if (AGO.isFirefox) return API.Resource(a);
                try {
                    return (
                        (b = new XMLHttpRequest()),
                            b.open("GET", chrome.extension.getURL(a), false),
                            b.overrideMimeType("text/plain"),
                            b.send(null),
                        b.responseText || ""
                    );
                } catch (c) {}
            }
            return "";
        },
        Log: function(a, b) {
            (AGO.App.beta || b) && console.log("AntiGameOrigin:  " + a);
        }
    };
AGO.Init = {
    // 0: App not started yet
    // 1: App started
    // 2: App initiatied
    // 4: App readed
    // 5: App is running
    // 6: App interactive
    // 7: App ready
    // 8: App start completed
    status: 0,
    active: true,
    KeydownCache: [],
    timing: Date.now(),
    loop: 0,
    Messages: function(a, b, c) {
        if (AGO.Init.status || "Continue" === b)
            Array.isArray(a) &&
            (a = -1 < a.indexOf(AGO.App.Page) ? AGO.App.Page : ""),
                "Init" === a
                    ? "Timer" === b
                    ? window.setTimeout(AGO.Init.Timer, 0)
                    : "Content" === b
                        ? AGO.Init.Content(c)
                        : "Ready" === b
                            ? AGO.Init.Ready()
                            : "Tooltip" === b && AGO.Init.Tooltip(c)
                    : a &&
                    AGO[a] &&
                    "function" === typeof AGO[a].Messages &&
                    AGO[a].Messages(b, c);
    },
    Start: function() {
        AGO.Init.status = 0;
        if(document.location && document.location.href && document.documentElement) {
            AGB.message = AGO.isFirefox ? AGB.messageFirefox : AGB.messageChrome;
            AGO.App.Start();
            if(20 < AGO.Notify.problem) {
                document.addEventListener("DOMContentLoaded", AGO.Main.Run, false);
            }else if(AGO.App.mode) {
                AGO.Init.status = 1;
                AGO.Init.active = document.hasFocus();
                AGO.Observer.Start();
                if(AGO.App.reload) {
                    AGO.Observer.Head(function () {
                        AGO.App.Init();
                        AGO.Init.Init();
                    })
                }else {
                    AGO.Option.Start();
                    AGO.Styles.Start();
                    if(AGO.Option.is("O04")) {
                        document.title = AGO.App.title;
                    }
                    AGO.Observer.Head(function () {
                        AGO.App.Init();
                        AGO.Styles.Init();
                    });
                    AGO.Init.Init();
                }
            }
        }else{
            if(300 > ++AGO.Init.loop){
                window.setTimeout(AGO.Init.Start, AGO.Init.loop);
            }
        }
    },
    Init: function() {
        AGB.message(
            "App",
            "Start",
            {
                page: AGO.App.page,
                mode: AGO.App.mode,
                keyCom: AGO.App.keyCom,
                keyUni: AGO.App.keyUni,
                keyPlayer: AGO.App.keyPlayer,
                accountId: AGO.App.playerId,
                abbrCom: AGO.Uni.lang,
                abbrUni: AGO.Uni.abbr,
                urlUni: AGO.Uni.url,
                reload: AGO.App.reload
            },
            function(a) {
                AGO.Observer.Head(function() {
                    a &&
                    AGO.App.mode &&
                    1 === AGO.Init.status &&
                    ((AGO.Init.status = 2),
                        (AGO.App.reload = AGO.App.reload || a.reload),
                        (AGO.App.Page = a.Page),
                        (AGO.Background.Data = a.Background || {}),
                        AGO.Label.Init(a.Label),
                    3 <= AGO.App.mode &&
                    a.keyPlayer === AGO.App.keyPlayer &&
                    (OBJ.copy(a.App, AGO.App),
                        OBJ.copy(a.Uni, AGO.Uni),
                        AGO.Data.Init(),
                        AGO.Option.Init(a.Option),
                        AGO.Item.Init(a.Item),
                        AGO.Panel.Init(a.Panel),
                        AGO.DataBase.Init(a.DataBase),
                        AGO.Box.Init(a.Box),
                        AGO.Token.Init(a.Token),
                        AGO.Units.Init(a.Units),
                        AGO.Fleet.Init(a.Fleet),
                    AGO.App.reload && AGO.App.Save(),
                        (AGO.App.upgradeAvailable =
                            NMR.parseVersion(AGO.App.versionAGO) <
                            NMR.parseVersion(AGO.App.versionUpdate))),
                        (a = null),
                        AGO.Observer.Body(
                            AGO.Init.Read,
                            AGO.isChrome && 3 <= AGO.App.mode
                        ));
                });
            },
            AGO.context
        );
    },
    Read: function() {
        2 === AGO.Init.status &&
        (AGO[AGO.App.Page]
            ? ((AGO.Init.status = 4),
                (PAGE = AGO.Page = AGO[AGO.App.Page]),
            AGO.App.Ogame &&
            (AGO.Styles.Load(),
                AGO.Planets.Read(),
            AGO.Planets.status &&
            ((AGO.App.mode = 5),
                (AGO.App.OgameMain = true),
                AGO.Time.Read(),
                AGO.Units.Read(),
                AGO.Main.Read(),
            "function" === typeof PAGE.Read && PAGE.Read())),
                AGO.Init.Run())
            : 100 > ++AGO.Init.loop &&
            (AGB.Log(
                "Init - Read - waiting for page script - loaded " + AGO.App.Page,
                true
            ),
                window.setTimeout(AGO.Init.Read, AGO.Init.loop)));
    },
    Run: function() {
        4 === AGO.Init.status &&
        ((AGO.Init.status = 5),
        AGO.App.OgameMain &&
        (AGO.Units.Run(),
            AGO.Planets.Run(),
            AGO.Time.Run(),
            AGO.Events.Run(),
        "function" === typeof PAGE.Run && PAGE.Run(),
            AGO.Panel.Run(),
            AGO.Notify.Run(),
            AGO.Main.Run()),
            AGO.Observer.Interactive(AGO.Init.Interactive));
    },
    Interactive: function() {
        5 === AGO.Init.status &&
        ((AGO.Init.status = 6),
            AGO.Global.Interactive(),
        "function" === typeof PAGE.Interactive && PAGE.Interactive(),
            AGO.App.Ogame
                ? ((AGO.Observer.mutationObject = DOM.addObserver(
                document.body,
                {
                    childList: true
                },
                AGO.Observer.Mutation
                )),
                    AGO.Global.message({
                        role: "Ready"
                    }),
                AGO.App.OgameMain &&
                (AGO.App.reload && (AGO.Label.Update(), AGO.Units.Update()),
                    AGB.message("App", "Update", {
                        reload: AGO.App.reload
                    }),
                    AGO.Notify.set("Notify")))
                : window.setTimeout(AGO.Init.Ready, 20));
    },
    Ready: function() {
        6 === AGO.Init.status &&
        ((AGO.Init.status = 7),
        AGO.App.OgameMain && AGO.Events.Ready(),
        "function" === typeof PAGE.Ready && PAGE.Ready(),
        AGO.Option.is("U31") &&
        OBJ.iterateArray(AGO.Init.KeydownCache, AGO.Init.onKeydown),
        AGO.App.Ogame && (DOM.disableActiveElement(), DOM.disableAutocomplete()),
            window.setTimeout(AGO.Init.Complete, 1));
    },
    Complete: function() {
        7 === AGO.Init.status &&
        (!AGO.App.OgameMain || AGO.Units.status
            ? ((AGO.Init.status = 8),
            "function" === typeof PAGE.Complete && PAGE.Complete(),
            AGO.App.OgameMain &&
            (AGO.Main.Complete(),
            AGO.App.beta &&
            DOM.setStyleColor(
                "playerName",
                "id",
                AGO.App.reload ? "#FF9600" : "#008000"
            )))
            : 100 > ++AGO.Init.loop &&
            window.setTimeout(AGO.Init.Complete, AGO.Init.loop));
    },
    Refresh: function() {
        7 <= AGO.Init.status &&
        AGO.App.OgameMain &&
        AGB.message("App", "Refresh", {}, function(a) {
            AGO.Init.status &&
            a &&
            ((AGO.Background.Data = a.Background || {}),
                AGO.Option.Init(a.Option),
                AGO.Fleet.Init(a.Fleet),
                AGO.Box.Init(a.Box, true),
                AGO.Panel.Init(a.Panel, true));
        });
    },
    Content: function(a) {
        var b, c, d;
        5 < AGO.Init.status &&
        a &&
        a.page &&
        ((c = a.page),
            (b = AGO[OBJ.get(AGO.App.Overlay, c)])
                ? "function" === typeof b.Content &&
                (AGO.Init.activeOverlay ||
                ((d = document.querySelectorAll(
                    "body > .ui-dialog .ui-dialog-content"
                )),
                d.length &&
                (AGO.Init.activeOverlay = {
                    element: d[d.length - 1].id,
                    page: DOM.getAttribute(
                        d[d.length - 1],
                        null,
                        "data-page"
                    ).toLowerCase()
                })),
                AGO.Init.activeOverlay &&
                AGO.Init.activeOverlay.element &&
                c === AGO.Init.activeOverlay.page &&
                (d = document.getElementById(AGO.Init.activeOverlay.element)) &&
                b.Content(d, AGO.Init.activeOverlay.element, c, a.url, a.para))
                : (b = AGO[OBJ.get(AGO.App.Content, c)]) &&
                "function" === typeof b.Content &&
                b.Content(c, a.url, a.para, a.response));
    },
    Overlay: function(a, b) {
        var c, d;
        5 < AGO.Init.status &&
        a &&
        ((d = DOM.getAttribute(a, null, "data-page").toLowerCase()),
            (AGO.Init.activeOverlay = {
                element: a.id,
                page: d
            }),
            d
                ? (c = OBJ.get(AGO.App.Overlay, d)) &&
                AGO[c] &&
                "function" === typeof AGO[c].Overlay &&
                AGO[c].Overlay(a, a.id, d, b)
                : "function" === typeof PAGE.Dialog && PAGE.Dialog(a, a.id));
    },
    Tooltip: function(a) {
        AGO.Menu &&
        document.getElementById("ago_menu") &&
        "function" === typeof AGO.Menu.Tooltip
            ? AGO.Menu.Tooltip(a)
            : "function" === typeof PAGE.Tooltip && PAGE.Tooltip(a);
    },
    onKeydown: function(a) {
        var b, c, d, e;
        e = true;
        AGO.App.Ogame &&
        AGO.Init.activeOverlay &&
        ((b = document.querySelectorAll("body > .ui-dialog .ui-dialog-content")),
            b.length
                ? ((c = b[b.length - 1]),
                    (d = DOM.getAttribute(c, null, "data-page").toLowerCase()),
                    (AGO.Init.activeOverlay = {
                        element: c.id,
                        page: d
                    }))
                : (AGO.Init.activeOverlay = null));
        AGO.Init.activeOverlay
            ? (b = OBJ.get(AGO.App.Overlay, d)) &&
            AGO[b] &&
            "function" === typeof AGO[b].onKeydown &&
            (e = AGO[b].onKeydown(a, c))
            : (AGO.Menu && document.getElementById("ago_menu")
            ? (e = AGO.Menu.onKeydown(a))
            : "function" === typeof PAGE.onKeydown && (e = PAGE.onKeydown(a)),
            e && AGO.App.OgameMain && (e = AGO.Main.onKeydown(a)));
        if (false === e && !a.cached)
            try {
                a.preventDefault();
            } catch (g) {}
        return e;
    },
    onSwipe: function(a, b) {
        if (AGO.Init.touch && a)
            if (10 > b && "function" === typeof PAGE.onSwipe) PAGE.onSwipe(a, b);
            else if ("function" === typeof AGO.Main.onSwipe) AGO.Main.onSwipe(a, b);
    },
    Select: function() {
        var a, b;
        "getSelection" in window &&
        ((a = window.getSelection()), a.rangeCount && (b = a.toString()));
        !b &&
        document.activeElement &&
        ((a = document.activeElement),
        "TEXTAREA" === a.tagName ||
        ("INPUT" === a.tagName && "text" === a.type)) &&
        (b = (a.value || "").substring(a.selectionStart, a.selectionEnd));
        b &&
        5 <= b.length &&
        (!AGO.App.OgameMain || 60 > b.length) &&
        ((b = AGO.Task.parseTarget(b, 1)), b.coords || b.time) &&
        (AGO.App.OgameMain
            ? AGO.Option.is("I81") &&
            ((b = {
                action: "set",
                tab: "Target",
                token: 81,
                coords: b.coordstype || b.coords,
                time: b.time,
                marked: 1
            }),
                AGO.Init.Messages("Token", "Action", b))
            : ((b = STR.check(b.coordstype || b.coords) + "|" + STR.check(b.time)),
                AGB.message("Background", "Set", {
                    key: "Panel_Target",
                    value: b
                })));
    },
    Timer: function() {
        5 < AGO.Init.status &&
        AGO.App.OgameMain &&
        (AGO.Time.Display(),
            AGO.Planets.Timer(),
        1 === AGO.Acc.type && AGO.Units.Timer(),
        PAGE.Timer && PAGE.Timer(),
        AGO.Jumpgate && AGO.Jumpgate.Timer && AGO.Jumpgate.Timer(),
            AGO.Main.updateTitle());
    },
    Timing: function(a) {
        a
            ? AGB.Log(
            a +
            (Date.now() -
                AGO.Init.timing -
                (Date.now() - AGO.Init.timingRange)) +
            "   + " +
            (Date.now() - AGO.Init.timingRange) +
            " -- " +
            document.readyState
            )
            : (AGO.Init.timingRange = Date.now());
    },
    Location: function(a, b) {
        window.setTimeout(function() {
            document.location.href = AGO.Uni.path + (a || "overview");
        }, b || 300);
    },
    Valid: function(a, b) {
        var c;
        AGO.Init.status &&
        "function" === typeof a &&
        ((c = new XMLHttpRequest()),
            c.open("GET", AGO.Uni.url + "/game/index.php?page=fetchTechs&ajax=1", true),
            c.overrideMimeType("text/html"),
            (c.onerror = c.onload = function() {
                AGO.Init.status &&
                (200 === +c.status &&
                STR.check(c.responseText)[0] === String.fromCharCode(123)
                    ? a()
                    : "function" === typeof b && b());
            }),
            c.send(null));
    },
    Script: function(a) {
        var b, c;
        if (!AGO.Init.ogameScript) {
            b = DOM.queryAll("#box > script", document.getElementById("boxBG"));
            for (c = 0; c < b.length; c++)
                if (!b[c].src && -1 < (b[c].innerHTML || "").indexOf("var session")) {
                    AGO.Init.ogameScript = b[c];
                    break;
                }
            AGO.Init.ogameScript = AGO.Init.ogameScript || -1;
        }
        b = "";
        return OBJ.is(AGO.Init.ogameScript) &&
        ((b = AGO.Init.ogameScript.innerHTML || ""), "production" === a)
            ? ((a = b.indexOf("initAjaxResourcebox")),
                0 < a &&
                ((a = b.indexOf("{", a + 30)), (c = b.indexOf("function", a)), c > a)
                    ? ((c = b.lastIndexOf("}", b.lastIndexOf("}", c) - 1)),
                    b.slice(a, c + 1) || "")
                    : "")
            : b;
    }
};
AGO.Background = {
    Data: {},
    Get: function(a, b) {
        var c;
        c = a ? AGO.Background.Data[a] : "";
        return 6 === b ? STR.check(c) : +c || 0;
    },
    Set: function(a, b) {
        a &&
        ((AGO.Background.Data[a] = b),
            AGB.message("Background", "Set", {
                key: a,
                value: b
            }));
    }
};
AGO.Observer = {
    head: [null],
    body: [null],
    interactive: [null],
    mousedown: null,
    Start: function() {
        var nativeOnReadyStateChange;
        nativeOnReadyStateChange = document.onreadystatechange;
        document.onreadystatechange = function() {
            "interactive" === document.readyState &&
            (AGO.Observer.Call(AGO.Observer.body),
                AGO.Observer.Call(AGO.Observer.interactive));
            try {
                nativeOnReadyStateChange();
            } catch (b) {}
        };
        document.addEventListener("DOMContentLoaded", function overrideDOMContentLoad() {
                document.removeEventListener("DOMContentLoaded", overrideDOMContentLoad, false);
                AGO.Observer.Call(AGO.Observer.body);
                AGO.Observer.Call(AGO.Observer.interactive);
            }, false
        );
        window.addEventListener("blur", function() {
                AGO.Init.active = false;
            }, false
        );
        window.addEventListener("focus", function() {
                AGO.Init.active ||
                ((AGO.Init.active = true), 7 <= AGO.Init.status && AGO.Init.Refresh());
            }, false
        );
        window.addEventListener("beforeunload", function() {
                DOM.removeObserver(AGO.Observer.mutationObject);
                AGO.Init.status = 0;
            }, false
        );
        window.addEventListener("keydown", AGO.Observer.onKeydown, true);
        window.addEventListener("ago_global_send", function(a) {
                a = OBJ.parse(a ? a.detail : "");
                a.page && AGO.Init.Messages(a.page, a.role, a.data);
            }, false
        );
        if(AGO.isChrome) {
            chrome.runtime.onMessage.addListener(function (a) {
                if(a && a.player === AGO.App.keyPlayer) {
                    AGO.Init.Messages(a.page, a.role, a.data);
                }
            });
        }
        document.addEventListener(
            "mousedown",
            function(a) {
                var d;
                if (AGO.Observer.mousedown) {
                    a = a.target;
                    for (d = 0; 9 > d; d++)
                        if (a)
                            if (a.id === AGO.Observer.mousedown.id) break;
                            else a = a.parentNode;
                        else {
                            d = 9;
                            break;
                        }
                    9 === d &&
                    ((a = AGO.Observer.mousedown.action),
                        AGO.Observer.set("mousedown"),
                    "function" === typeof a && a());
                }
            },
            false
        );
        document.addEventListener(
            "mouseup",
            function(a) {
                a.keyCode ||
                a.altKey ||
                a.ctrlKey ||
                a.shiftKey ||
                a.metaKey ||
                AGO.Init.Select();
            },
            false
        );
        document.addEventListener(
            "touchstart",
            function(a) {
                var halfWidth, pageX;
                AGO.Observer.area = 0;
                a &&
                a.target &&
                1 === a.touches.length &&
                ((AGO.Observer.startX = AGO.Observer.pageX = pageX = a.touches[0].pageX),
                    (AGO.Observer.startY = AGO.Observer.pageY = a.touches[0].pageY),
                    (halfWidth = Math.floor((+document.body.clientWidth || 1) / 2)),
                    40 > a.touches[0].screenX ||
                    DOM.findParent(a.target, null, "ago_panel", 8)
                        ? (AGO.Observer.area = 12)
                        : (AGO.Observer.area =
                            pageX > halfWidth - 335 && pageX < halfWidth + 335
                                ? 950 > window.innerWidth
                                ? 0
                                : DOM.findParent(a.target, null, "inhalt", 9)
                                    ? 1
                                    : 0
                                : pageX > halfWidth + 330 &&
                                DOM.findParent(a.target, null, "planetList", 9)
                                ? 15
                                : pageX < halfWidth - 280 && DOM.findParent(a.target, null, "links", 9)
                                    ? 11
                                    : 0),
                AGO.Observer.area &&
                (window.setTimeout(function() {
                    10 > Math.abs(AGO.Observer.startX - AGO.Observer.pageX) &&
                    10 > Math.abs(AGO.Observer.startY - AGO.Observer.pageY) &&
                    (AGO.Observer.area = 0);
                }, 120),
                    window.clearTimeout(AGO.Observer.touchTimeout),
                    (AGO.Observer.touchTimeout = window.setTimeout(function() {
                        AGO.Observer.area = 0;
                    }, 1e3))));
            },
            false
        );
        document.addEventListener(
            "touchmove",
            function(a) {
                var pageDiffX, pageDiffY;
                AGO.Observer.area &&
                ((AGO.Observer.pageX = a.touches[0].pageX),
                    (AGO.Observer.pageY = a.touches[0].pageY),
                !window.scrollX || 0 < AGO.Observer.startX - AGO.Observer.pageX) &&
                ((pageDiffX = Math.abs(AGO.Observer.startX - AGO.Observer.pageX) + 1),
                    (pageDiffY = Math.abs(AGO.Observer.startY - AGO.Observer.pageY) + 1),
                    (pageDiffX = 1 === AGO.Observer.area && (3 < pageDiffX || 3 < pageDiffY) && 0.35 > pageDiffX / pageDiffY)
                        ? (AGO.Observer.area = 0)
                        : a.preventDefault());
            },
            false
        );
        document.addEventListener("touchend", AGO.Observer.onSwipe, false);
        document.addEventListener("touchcancel", AGO.Observer.onSwipe, false);
    },
    Head: function(headCallback) {
        function documentMutated(mutationsList) {
            var pageHeadLoaded;
            OBJ.iterate(mutationsList, function(e) {
                if("HTML" === mutationsList[e].target.nodeName && mutationsList[e].addedNodes.length && "BODY" === mutationsList[e].addedNodes[0].nodeName && mutationsList[e].addedNodes[0].childNodes.length) {
                    pageHeadLoaded = true
                }
            });
            if(pageHeadLoaded){
                AGO.Observer.Call(AGO.Observer.head)
            };
        }

        if(AGO.Init.status) {
            if(document.body || AGO.Observer.head[0] === true) {
                headCallback()
            }else {
                if(!AGO.Observer.head[0]) {
                    AGO.Observer.head[0] = DOM.addObserver(document, {childList: true, subtree: true}, documentMutated);
                }
                AGO.Observer.head.push(headCallback);
            }
        }
    },
    Body: function(a, b) {
        function c(a) {
            var b, c;
            for (b in a) {
                if (
                    a[b].target &&
                    "box" === a[b].target.id &&
                    "boxBG" === a[b].target.parentNode.id
                )
                    for (var f = 0; f < a[b].addedNodes.length; f++)
                        "SCRIPT" === a[b].addedNodes[f].nodeName &&
                        document.getElementById("rechts") &&
                        (c = true);
                if (c) {
                    AGO.Observer.Call(AGO.Observer.body);
                    break;
                }
            }
        }

        AGO.Init.status &&
        ("complete" === document.readyState ||
        "interactive" === document.readyState ||
        true === AGO.Observer.body[0]
            ? a()
            : (b &&
            !AGO.Observer.body[0] &&
            (AGO.Observer.body[0] = DOM.addObserver(
                document,
                {
                    childList: true,
                    subtree: true
                },
                c
            )),
                AGO.Observer.body.push(a)));
    },
    Interactive: function(a) {
        AGO.Init.status &&
        ("complete" === document.readyState ||
        "interactive" === document.readyState ||
        true === AGO.Observer.interactive[0]
            ? a()
            : AGO.Observer.interactive.push(a));
    },
    Call: function(callbacks) {
        var firstCallback, i;
        if (AGO.Init.status && callbacks && "object" === typeof callbacks && true !== callbacks[0]) {
            firstCallback = callbacks[0];
            callbacks[0] = true;
            if(firstCallback){
                DOM.removeObserver(firstCallback);
            }
            for (i = 1; i < callbacks.length; i++){
                if ("function" === typeof callbacks[i]){
                    callbacks[i]();
                }
            }
            callbacks.length = 1;
        }
    },
    set: function(a, b, c) {
        AGO.Observer[a] =
            b && c
                ? {
                    id: b,
                    action: c
                }
                : null;
    },
    onKeydown: function(a) {
        if (
            !(
                !a ||
                !a.keyCode ||
                a.altKey ||
                (a.ctrlKey && (37 > a.keyCode || 40 < a.keyCode))
            ) &&
            AGO.Option.is("U31")
        ) {
            112 <= a.keyCode &&
            123 >= a.keyCode &&
            AGO.Option.is("U32") &&
            (a.stopPropagation(), a.preventDefault());
            if (7 > AGO.Init.status)
                return (
                    AGO.Init.KeydownCache.push({
                        cached: true,
                        keyCode: a.keyCode,
                        shiftKey: a.shiftKey,
                        ctrlKey: a.ctrlKey
                    }),
                        false
                );
            a.target &&
            (a.inputType =
                "TEXTAREA" === a.target.nodeName
                    ? 12
                    : "INPUT" === a.target.nodeName && "text" === a.target.type
                    ? 11
                    : 0);
            return AGO.Init.onKeydown(a);
        }
        return true;
    },
    Mutation: function(a) {
        var b, c, d;
        for (c in a)
            if ("BODY" === a[c].target.nodeName && a[c].addedNodes)
                for (d = 0; d < a[c].addedNodes.length; d++)
                    if (
                        "DIV" === a[c].addedNodes[d].nodeName &&
                        ((b = a[c].addedNodes[d]), "dialog" === b.getAttribute("role"))
                    ) {
                        AGO.Init.Overlay(b.querySelector(".ui-dialog-content"));
                        return;
                    }
    },
    onSwipe: function() {
        var a, b, c, d;
        window.clearTimeout(AGO.Observer.touchTimeout);
        AGO.Init.touch &&
        AGO.Observer.area &&
        ((a = AGO.Observer.startY - AGO.Observer.pageY),
            (c = AGO.Observer.startX - AGO.Observer.pageX),
            (d = Math.abs(c || 1) / Math.abs(a || 1)),
            0.35 > d
                ? 1 < AGO.Observer.area &&
                (-100 >= a ? (b = "down") : 100 <= a && (b = "up"))
                : 3 < d
                ? ((a = 10 > AGO.Observer.area ? 80 : 40),
                    c <= -a ? (b = "right") : c >= a && (b = "left"))
                : 0.6 < d &&
                1.4 > d &&
                (-70 >= a ? (b = "diagDown") : 70 <= a && (b = "diagUp")),
            AGO.Init.onSwipe(b, AGO.Observer.area));
    }
};
AGO.Global = {
    Interactive: function() {
        AGO.App.Ogame &&
        AGO.Global.message({
            role: "Interactive",
            data: {
                commander: AGO.Option.is("commander"),
                galaxy: AGO.Acc.galaxy,
                page: AGO.App.page,
                timeStatus: AGO.Time.status,
                timeZoneDelta: AGO.Time.timeZoneDelta,
                U60: AGO.Option.is("U60"),
                U61: AGO.Option.isAnd("U60", "U61"),
                U62: AGO.Option.get("U62", 2),
                U65: AGO.Option.get("U65", 2),
                U66: AGO.Option.get("U66", 2),
                U67: AGO.Option.get("U67", 2),
                B21: AGO.Option.get("B21", 2),
                G30: AGO.Option.is("G30"),
                O51: AGO.Planets.improve,
                O53: AGO.Planets.enabled && AGO.Option.is("O53"),
                F00: AGO.Option.is("F00"),
                F02: AGO.Option.get("F02", 2)
            }
        });
    },
    message: function(a, b) {
        var c;
        if (
            a &&
            (window.dispatchEvent(
                new window.CustomEvent("ago_global", {
                    detail: JSON.stringify(a)
                })
            ),
            "getProperty" === a.role || b)
        ) {
            c = DOM.getAttribute(
                "ago_global_data",
                "id",
                "ago-data-" + (a.property || b)
            );
            try {
                return JSON.parse(c);
            } catch (d) {
                return "";
            }
        }
    }
};
AGO.App = {
    page: "",
    Page: "",
    pathSkin: "",
    title: "",
    mode: 0,
    beta: 0,
    versionOGame: "",
    versionOGameMax: AGO.versionOGameMax,
    Overlay: {
        jumpgatelayer: "Jumpgate",
        techtree: "Techtree",
        phalanx: "Phalanx",
        showmessage: "Showmessage",
        buddies: "Buddies",
        notices: "Notices",
        search: "Search"
    },
    Content: {
        resources: "Resources",
        station: "Station",
        traderoverview: "Trader",
        research: "Research",
        shipyard: "Shipyard",
        defense: "Defense",
        galaxycontent: "Galaxy",
        allianceoverview: "Alliance",
        alliancemanagement: "Alliance",
        alliancebroadcast: "Alliance",
        allianceapplications: "Alliance",
        premium: "Premium",
        shop: "Shop",
        eventlist: "Events",
        fetcheventbox: "Fleet",
        minifleet: "Fleet",
        tutorialmission: "Tutorial",
        messages: "Messages",
        highscorecontent: "Highscore"
    },
    Start: function() {
        var domain, subdomain;
        if(AGO.isFirefox) {
            AGO.App.pathSkin = "chrome://skin/content/";
            OBJ.copy(OBJ.parse(API.App()), AGO.App);
        }else {
            ((AGO.App.pathSkin = chrome.extension.getURL("/skin/")),
                (AGO.App.versionAGO = chrome.runtime.getManifest().version),
                (AGO.App.name = STR.check(chrome.runtime.getManifest().name)))
        }
        if(AGO.App.name.includes("Alpha")){
            AGO.App.beta = 3;
        }else if(AGO.App.name.includes("Beta")){
            AGO.App.beta = 1;
        }else{
            AGO.App.beta = 0;
        }
        AGO.Uni.domain = document.location.hostname.toLowerCase();
        AGO.Uni.url = "https://" + AGO.Uni.domain;
        domain = AGO.Uni.domain.split(".");
        if(document.location.href.match(/https:\/\/.+\.ogame.gameforge.com\/game\/index\.php\?+.*page=*/i)){
            AGO.App.page = STR.getParameter("page", document.location.href).toLowerCase();
            if(AGO.App.page == 'standalone'){
                AGO.App.page = 'empire';
            }
            if(0 === AGO.App.page.indexOf("fleet") && STR.getParameter("cp", document.location.href)){
                AGO.App.page = "fleet1";
            }
            AGO.Uni.path = document.location.href.split("?")[0] + "?page=";
            subdomain = (domain[0] || "").split("-");
            AGO.Uni.lang = (subdomain[1] || "EN").toUpperCase();
            AGO.Uni.number = NMR.parseIntAbs(subdomain[0]);
            if(AGO.Uni.number ) {
                AGO.App.mode = 3
                AGO.Uni.abbr = "UNI" + AGO.Uni.number
                AGO.App.keyCom = "AGO_" + AGO.Uni.lang
                AGO.App.keyUni = AGO.App.keyCom + "_" + AGO.Uni.abbr
                OBJ.copy(OBJ.parse(AGO.Data.getStorage(AGO.App.keyUni + "_App")), AGO.App)
                AGO.App.title = AGO.App.title || AGO.Uni.lang + " " + AGO.Uni.number
                if(!AGO.App.playerId || STR.getParameter("phpsessid", document.location.href.toLowerCase())){
                    AGO.App.login = AGO.App.reload = true
                }else{
                    AGO.App.keyPlayer = AGO.App.keyUni + "_" + AGO.App.playerId
                }
            }
            if(AGO.App.disabled){
                AGO.Notify.set("Problem", 21)
            }
            if(4 !== domain.length){
                AGO.Notify.set("Problem", 31)
            }
        }else {
            if(AGO.Uni.domain.includes("speedsim.net")) {
                AGO.App.page = "websim"
            }else if(AGO.Uni.domain.includes("osimulate.com")) {
                AGO.App.page = "osimulate"
            }else{
                AGO.App.page = ""
            }

            if(AGO.App.page) {
                AGO.Uni.lang = (STR.getParameter("uni", document.location.href).split("_")[0] || "EN").toUpperCase()
                AGO.App.keyCom = "AGO_" + AGO.Uni.lang
                AGO.App.mode = 2
            }
        }
    },
    Init: function() {
        var metaList, metaContent, i;
        metaList = document.head.getElementsByTagName("meta");
        for (i = 0; i < metaList.length; i++) {
            if (metaList[i].name) {
                metaContent = metaList[i].getAttribute("content")
                switch (metaList[i].name) {
                    case "ogame-player-name":
                        AGO.Acc.name = metaContent;
                        break;
                    case "ogame-planet-coordinates":
                        AGO.Acc.coords = metaContent;
                        break;
                    case "ogame-planet-type":
                        AGO.Acc.type = "moon" === metaContent ? 3 : 1;
                        break;
                    case "ogame-planet-id":
                        AGO.Acc.planetId = metaContent;
                        break;
                    case "ogame-planet-name":
                        AGO.Acc.planetName = metaContent;
                        break;
                    case "ogame-player-id":
                        AGO.Acc.playerId = metaContent;
                        break;
                    case "ogame-version":
                        AGO.App.versionOGame = metaContent;
                        break;
                    case "ogame-session":
                        AGO.Acc.session = metaContent;
                        break;
                    case "ogame-timestamp":
                        AGO.Acc.timestamp = +metaContent || 0;
                        break;
                    case "AntiGameOrigin":
                        AGO.App.twice = true;
                }
            }
        }
        AGO.App.init = true;
        AGO.App.mode = 3;

        if(AGO.App.twice){
            AGO.App.mode = 0;
        }else if(AGO.App.mode === 2){
            AGO.App.mode = 2;
        }else if(AGO.Acc.playerId && AGO.Acc.session){
            AGO.App.mode = 4;
        }

        if (AGO.App.mode >= 4)
            if (!AGO.App.login && AGO.App.playerId && AGO.App.playerId !== AGO.Acc.playerId) {
                AGO.Init.status = AGO.App.mode = 0;
                AGO.Data.setStorage(AGO.App.keyUni + "_App", "");
            }else {
                AGO.App.Ogame = true;
                OBJ.copy(AGO.Task.splitCoords(AGO.Acc.coords), AGO.Acc);
                AGO.Acc.coordstype = AGO.Acc.coords + ":" + AGO.Acc.type;
                AGO.App.keyPlayer = AGO.App.keyUni + "_" + AGO.Acc.playerId;
                AGO.App.OgameMobile = !DOM.hasClass(document.body, null, "no-touch");
                console.log(document.body);
                if (AGO.App.login || AGO.App.playerId !== AGO.Acc.playerId || AGO.App.session !== AGO.Acc.session) {
                    AGO.App.reload = true;
                    AGO.App.playerId = AGO.Acc.playerId;
                    AGO.App.Save();
                    AGB.Log("App - Login:   Com: " + AGO.Uni.lang + "   Uni: " + AGO.Uni.number + "   Player: " + AGO.Acc.playerId + "   Session: " + AGO.Acc.session, true);
                }
                metaList = document.createDocumentFragment();
                DOM.append(metaList, "meta", {
                    content: AGO.App.versionAGO,
                    name: "AntiGameOrigin",
                    id: "ago_global_data",
                    "ago-data-key": AGO.App.keyPlayer
                });
                DOM.append(metaList, "script", {
                    type: "text/javascript"
                }).textContent = AGB.Resource("js/global.js");
                document.head.appendChild(metaList);
            }
    },
    Save: function(data) {
        OBJ.copy(data, AGO.App);
        AGO.Data.setStorage(AGO.App.keyUni + "_App", {
            disabled: AGO.App.disabled,
            playerId: AGO.Acc.playerId,
            session: AGO.Acc.session,
            title: AGO.Uni.lang + " " + (AGO.Uni.name || AGO.Uni.number || "")
        });
    }
};
AGO.Uni = {
    status: 0,
    path: "",
    url: "",
    domain: "",
    lang: "",
    abbr: "",
    number: 0,
    name: "",
    speed: 1,
    speedFleet: 1,
    galaxies: 50,
    systems: 499,
    positions: 16,
    rapidFire: 1,
    acs: 1,
    defToTF: 0,
    debrisFactor: 0.3,
    repairFactor: 0.7,
    newbieProtectionLimit: 0,
    newbieProtectionHigh: 0,
    topScore: 0
};
AGO.Acc = {
    name: "",
    coords: "",
    type: 0,
    playerId: "",
    planetId: "",
    session: "",
    timestamp: 0
};
AGO.Data = {
    Init: function() {
        if(AGO.App.reload){
            AGO.Data.removeStorage(AGO.App.keyPlayer + "_Fleet_Current");
        }
    },
    Remove: function(data) {
        function b(a) {
            OBJ.iterate(window.localStorage, function(b) {
                b &&
                0 === b.indexOf(a || "AGO_") &&
                (window.localStorage.removeItem(b),
                    AGB.Log("Delete - localstorage  - " + b, true));
            });
        }

        AGB.Log("Delete - ############ - " + data, true);
        AGB.message("Data", "Remove", {mode: data}, function(c) {
                c &&
                (b("ago" === data ? "AGO_" : AGO.App.keyPlayer),
                    b(AGO.App.keyUni),
                    AGO.Init.Location("", 600));
            }
        );
    },
    setStorage: function(a, b) {
        if (a)
            try {
                window.localStorage[a] = OBJ.is(b) ? JSON.stringify(b) : b || "";
            } catch (c) {
                AGB.Log("Data - Error set localstorage", true);
            }
    },
    getStorage: function(a, b) {
        if (a)
            if (b)
                try {
                    return JSON.parse(window.localStorage[a] || "{}");
                } catch (c) {
                    return {};
                }
            else return window.localStorage[a] || "";
        return b ? {} : "";
    },
    removeStorage: function(a) {
        a && (window.localStorage[a] = "");
    }
};
window.top === window.self && AGO.Init.Start();
