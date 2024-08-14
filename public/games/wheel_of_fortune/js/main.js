/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    var a =
        "undefined" !== typeof window && "undefined" !== typeof window.document ?
        window.document : {},
        c = "undefined" !== typeof module && module.exports,
        b = (function() {
            for (
                var g,
                    l = [
                        "requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(
                            " "
                        ),
                        "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(
                            " "
                        ),
                        "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(
                            " "
                        ),
                        "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(
                            " "
                        ),
                        "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(
                            " "
                        ),
                    ],
                    d = 0,
                    k = l.length,
                    f = {}; d < k; d++
            )
                if ((g = l[d]) && g[1] in a) {
                    for (d = 0; d < g.length; d++) f[l[0][d]] = g[d];
                    return f;
                }
            return !1;
        })(),
        e = { change: b.fullscreenchange, error: b.fullscreenerror },
        h = {
            request: function(g) {
                return new Promise(
                    function(l, d) {
                        var k = function() {
                            this.off("change", k);
                            l();
                        }.bind(this);
                        this.on("change", k);
                        g = g || a.documentElement;
                        Promise.resolve(g[b.requestFullscreen]())["catch"](d);
                    }.bind(this)
                );
            },
            exit: function() {
                return new Promise(
                    function(g, l) {
                        if (this.isFullscreen) {
                            var d = function() {
                                this.off("change", d);
                                g();
                            }.bind(this);
                            this.on("change", d);
                            Promise.resolve(a[b.exitFullscreen]())["catch"](l);
                        } else g();
                    }.bind(this)
                );
            },
            toggle: function(g) {
                return this.isFullscreen ? this.exit() : this.request(g);
            },
            onchange: function(g) {
                this.on("change", g);
            },
            onerror: function(g) {
                this.on("error", g);
            },
            on: function(g, l) {
                var d = e[g];
                d && a.addEventListener(d, l, !1);
            },
            off: function(g, l) {
                var d = e[g];
                d && a.removeEventListener(d, l, !1);
            },
            raw: b,
        };
    b
        ?
        (Object.defineProperties(h, {
                isFullscreen: {
                    get: function() {
                        return !!a[b.fullscreenElement];
                    },
                },
                element: {
                    enumerable: !0,
                    get: function() {
                        return a[b.fullscreenElement];
                    },
                },
                isEnabled: {
                    enumerable: !0,
                    get: function() {
                        return !!a[b.fullscreenEnabled];
                    },
                },
            }),
            c ? (module.exports = h) : (window.screenfull = h)) :
        c ?
        (module.exports = { isEnabled: !1 }) :
        (window.screenfull = { isEnabled: !1 });
})();

function buildIOSMeta() {
    for (
        var a = [{
                    name: "viewport",
                    content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
                },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-status-bar-style", content: "black" },
            ],
            c = 0; c < a.length; c++
    ) {
        var b = document.createElement("meta");
        b.name = a[c].name;
        b.content = a[c].content;
        var e = window.document.head.querySelector('meta[name="' + b.name + '"]');
        e && e.parentNode.removeChild(e);
        window.document.head.appendChild(b);
    }
}

function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se");
}

function buildIOSFullscreenPanel() {
    jQuery("body").append(
        '<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>'
    );
}

function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block");
}

function __iosResize() {
    window.scrollTo(0, 0);
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if ("iPhone" === platform.product)
        switch (window.devicePixelRatio) {
            case 2:
                switch (window.innerWidth) {
                    case 568:
                        320 !== window.innerHeight &&
                            jQuery(".xxx-game-iframe-full").addClass(
                                "xxx-game-iframe-iphone-se"
                            );
                        break;
                    case 667:
                        375 === window.innerHeight ?
                            hideIOSFullscreenPanel() :
                            showIOSFullscreenPanel();
                        break;
                    case 808:
                        414 === window.innerHeight ?
                            hideIOSFullscreenPanel() :
                            showIOSFullscreenPanel();
                        break;
                    default:
                        hideIOSFullscreenPanel();
                }
                break;
            case 3:
                switch (window.innerWidth) {
                    case 736:
                        414 === window.innerHeight ?
                            hideIOSFullscreenPanel() :
                            showIOSFullscreenPanel();
                        break;
                    case 724:
                        375 === window.innerHeight ?
                            hideIOSFullscreenPanel() :
                            showIOSFullscreenPanel();
                        break;
                    case 808:
                        414 === window.innerHeight ?
                            hideIOSFullscreenPanel() :
                            showIOSFullscreenPanel();
                        break;
                    default:
                        hideIOSFullscreenPanel();
                }
                break;
            default:
                hideIOSFullscreenPanel();
        }
}

function iosResize() {
    __iosResize();
    setTimeout(function() {
        __iosResize();
    }, 500);
}

function iosInIframe() {
    try {
        return window.self !== window.top;
    } catch (a) {
        return !0;
    }
}
$(document).ready(function() {
    platform &&
        "iPhone" === platform.product &&
        "safari" !== platform.name.toLowerCase() &&
        (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function() {
    platform &&
        "iPhone" === platform.product &&
        "safari" !== platform.name.toLowerCase() &&
        iosResize();
});
(function() {
    function a(n) {
        n = String(n);
        return n.charAt(0).toUpperCase() + n.slice(1);
    }

    function c(n, D) {
        var x = -1,
            y = n ? n.length : 0;
        if ("number" == typeof y && -1 < y && y <= C)
            for (; ++x < y;) D(n[x], x, n);
        else e(n, D);
    }

    function b(n) {
        n = String(n).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(n) ? n : a(n);
    }

    function e(n, D) {
        for (var x in n) E.call(n, x) && D(n[x], x, n);
    }

    function h(n) {
        return null == n ? a(n) : B.call(n).slice(8, -1);
    }

    function g(n, D) {
        var x = null != n ? typeof n[D] : "number";
        return (!/^(?:boolean|number|string|undefined)$/.test(x) &&
            ("object" == x ? !!n[D] : !0)
        );
    }

    function l(n) {
        return String(n).replace(/([ -])(?!$)/g, "$1?");
    }

    function d(n, D) {
        var x = null;
        c(n, function(y, A) {
            x = D(x, y, A, n);
        });
        return x;
    }

    function k(n) {
        function D(J) {
            return d(J, function(I, H) {
                var K = H.pattern || l(H);
                !I &&
                    (I =
                        RegExp("\\b" + K + " *\\d+[.\\w_]*", "i").exec(n) ||
                        RegExp("\\b" + K + " *\\w+-[\\w]*", "i").exec(n) ||
                        RegExp(
                            "\\b" + K + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
                            "i"
                        ).exec(n)) &&
                    ((I = String(
                            H.label && !RegExp(K, "i").test(H.label) ? H.label : I
                        ).split("/"))[1] &&
                        !/[\d.]+/.test(I[0]) &&
                        (I[0] += " " + I[1]),
                        (H = H.label || H),
                        (I = b(
                            I[0]
                            .replace(RegExp(K, "i"), H)
                            .replace(RegExp("; *(?:" + H + "[_-])?", "i"), " ")
                            .replace(RegExp("(" + H + ")[-_.]?(\\w)", "i"), "$1 $2")
                        )));
                return I;
            });
        }

        function x(J) {
            return d(J, function(I, H) {
                return (
                    I ||
                    (RegExp(
                        H + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
                        "i"
                    ).exec(n) || 0)[1] ||
                    null
                );
            });
        }
        var y = t,
            A = n && "object" == typeof n && "String" != h(n);
        A && ((y = n), (n = null));
        var P = y.navigator || {},
            v = P.userAgent || "";
        n || (n = v);
        var Z = A ?
            !!P.likeChrome :
            /\bChrome\b/.test(n) && !/internal|\n/i.test(B.toString()),
            aa = A ? "Object" : "ScriptBridgingProxyObject",
            U = A ? "Object" : "Environment",
            Q = A && y.java ? "JavaPackage" : h(y.java),
            ba = A ? "Object" : "RuntimeObject";
        U = (Q = /\bJava/.test(Q) && y.java) && h(y.environment) == U;
        var ca = Q ? "a" : "\u03b1",
            da = Q ? "b" : "\u03b2",
            V = y.document || {},
            N = y.operamini || y.opera,
            R = q.test((R = A && N ? N["[[Class]]"] : h(N))) ? R : (N = null),
            m,
            S = n;
        A = [];
        var T = null,
            O = n == v;
        v = O && N && "function" == typeof N.version && N.version();
        var F = (function(J) {
                return d(J, function(I, H) {
                    return (
                        I ||
                        (RegExp("\\b" + (H.pattern || l(H)) + "\\b", "i").exec(n) &&
                            (H.label || H))
                    );
                });
            })([
                { label: "EdgeHTML", pattern: "Edge" },
                "Trident",
                { label: "WebKit", pattern: "AppleWebKit" },
                "iCab",
                "Presto",
                "NetFront",
                "Tasman",
                "KHTML",
                "Gecko",
            ]),
            r = (function(J) {
                return d(J, function(I, H) {
                    return (
                        I ||
                        (RegExp("\\b" + (H.pattern || l(H)) + "\\b", "i").exec(n) &&
                            (H.label || H))
                    );
                });
            })([
                "Adobe AIR",
                "Arora",
                "Avant Browser",
                "Breach",
                "Camino",
                "Electron",
                "Epiphany",
                "Fennec",
                "Flock",
                "Galeon",
                "GreenBrowser",
                "iCab",
                "Iceweasel",
                "K-Meleon",
                "Konqueror",
                "Lunascape",
                "Maxthon",
                { label: "Microsoft Edge", pattern: "Edge" },
                "Midori",
                "Nook Browser",
                "PaleMoon",
                "PhantomJS",
                "Raven",
                "Rekonq",
                "RockMelt",
                { label: "Samsung Internet", pattern: "SamsungBrowser" },
                "SeaMonkey",
                { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
                "Sleipnir",
                "SlimBrowser",
                { label: "SRWare Iron", pattern: "Iron" },
                "Sunrise",
                "Swiftfox",
                "Waterfox",
                "WebPositive",
                "Opera Mini",
                { label: "Opera Mini", pattern: "OPiOS" },
                "Opera",
                { label: "Opera", pattern: "OPR" },
                "Chrome",
                { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
                { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
                { label: "Firefox for iOS", pattern: "FxiOS" },
                { label: "IE", pattern: "IEMobile" },
                { label: "IE", pattern: "MSIE" },
                "Safari",
            ]),
            G = D([
                { label: "BlackBerry", pattern: "BB10" },
                "BlackBerry",
                { label: "Galaxy S", pattern: "GT-I9000" },
                { label: "Galaxy S2", pattern: "GT-I9100" },
                { label: "Galaxy S3", pattern: "GT-I9300" },
                { label: "Galaxy S4", pattern: "GT-I9500" },
                { label: "Galaxy S5", pattern: "SM-G900" },
                { label: "Galaxy S6", pattern: "SM-G920" },
                { label: "Galaxy S6 Edge", pattern: "SM-G925" },
                { label: "Galaxy S7", pattern: "SM-G930" },
                { label: "Galaxy S7 Edge", pattern: "SM-G935" },
                "Google TV",
                "Lumia",
                "iPad",
                "iPod",
                "iPhone",
                "Kindle",
                { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
                "Nexus",
                "Nook",
                "PlayBook",
                "PlayStation Vita",
                "PlayStation",
                "TouchPad",
                "Transformer",
                { label: "Wii U", pattern: "WiiU" },
                "Wii",
                "Xbox One",
                { label: "Xbox 360", pattern: "Xbox" },
                "Xoom",
            ]),
            L = (function(J) {
                return d(J, function(I, H, K) {
                    return (
                        I ||
                        ((H[G] ||
                                H[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] ||
                                RegExp("\\b" + l(K) + "(?:\\b|\\w*\\d)", "i").exec(n)) &&
                            K)
                    );
                });
            })({
                Apple: { iPad: 1, iPhone: 1, iPod: 1 },
                Archos: {},
                Amazon: { Kindle: 1, "Kindle Fire": 1 },
                Asus: { Transformer: 1 },
                "Barnes & Noble": { Nook: 1 },
                BlackBerry: { PlayBook: 1 },
                Google: { "Google TV": 1, Nexus: 1 },
                HP: { TouchPad: 1 },
                HTC: {},
                LG: {},
                Microsoft: { Xbox: 1, "Xbox One": 1 },
                Motorola: { Xoom: 1 },
                Nintendo: { "Wii U": 1, Wii: 1 },
                Nokia: { Lumia: 1 },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1,
                },
                Sony: { PlayStation: 1, "PlayStation Vita": 1 },
            }),
            u = (function(J) {
                return d(J, function(I, H) {
                    var K = H.pattern || l(H);
                    if (!I &&
                        (I = RegExp("\\b" + K + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(n))
                    ) {
                        var M = I,
                            W = H.label || H,
                            X = {
                                "10.0": "10",
                                6.4: "10 Technical Preview",
                                6.3: "8.1",
                                6.2: "8",
                                6.1: "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                5.2: "Server 2003 / XP 64-bit",
                                5.1: "XP",
                                5.01: "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME",
                            };
                        K &&
                            W &&
                            /^Win/i.test(M) &&
                            !/^Windows Phone /i.test(M) &&
                            (X = X[/[\d.]+$/.exec(M)]) &&
                            (M = "Windows " + X);
                        M = String(M);
                        K && W && (M = M.replace(RegExp(K, "i"), W));
                        I = M = b(
                            M.replace(/ ce$/i, " CE")
                            .replace(/\bhpw/i, "web")
                            .replace(/\bMacintosh\b/, "Mac OS")
                            .replace(/_PowerPC\b/i, " OS")
                            .replace(/\b(OS X) [^ \d]+/i, "$1")
                            .replace(/\bMac (OS X)\b/, "$1")
                            .replace(/\/(\d)/, " $1")
                            .replace(/_/g, ".")
                            .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
                            .replace(/\bx86\.64\b/gi, "x86_64")
                            .replace(/\b(Windows Phone) OS\b/, "$1")
                            .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
                            .split(" on ")[0]
                        );
                    }
                    return I;
                });
            })([
                "Windows Phone",
                "Android",
                "CentOS",
                { label: "Chrome OS", pattern: "CrOS" },
                "Debian",
                "Fedora",
                "FreeBSD",
                "Gentoo",
                "Haiku",
                "Kubuntu",
                "Linux Mint",
                "OpenBSD",
                "Red Hat",
                "SuSE",
                "Ubuntu",
                "Xubuntu",
                "Cygwin",
                "Symbian OS",
                "hpwOS",
                "webOS ",
                "webOS",
                "Tablet OS",
                "Tizen",
                "Linux",
                "Mac OS X",
                "Macintosh",
                "Mac",
                "Windows 98;",
                "Windows ",
            ]);
        F && (F = [F]);
        L && !G && (G = D([L]));
        if ((m = /\bGoogle TV\b/.exec(G))) G = m[0];
        /\bSimulator\b/i.test(n) && (G = (G ? G + " " : "") + "Simulator");
        "Opera Mini" == r &&
            /\bOPiOS\b/.test(n) &&
            A.push("running in Turbo/Uncompressed mode");
        "IE" == r && /\blike iPhone OS\b/.test(n) ?
            ((m = k(n.replace(/like iPhone OS/, ""))),
                (L = m.manufacturer),
                (G = m.product)) :
            /^iP/.test(G) ?
            (r || (r = "Safari"),
                (u =
                    "iOS" +
                    ((m = / OS ([\d_]+)/i.exec(n)) ? " " + m[1].replace(/_/g, ".") : ""))) :
            "Konqueror" != r || /buntu/i.test(u) ?
            (L &&
                "Google" != L &&
                ((/Chrome/.test(r) && !/\bMobile Safari\b/i.test(n)) ||
                    /\bVita\b/.test(G))) ||
            (/\bAndroid\b/.test(u) && /^Chrome/.test(r) && /\bVersion\//i.test(n)) ?
            ((r = "Android Browser"), (u = /\bAndroid\b/.test(u) ? u : "Android")) :
            "Silk" == r ?
            (/\bMobi/i.test(n) || ((u = "Android"), A.unshift("desktop mode")),
                /Accelerated *= *true/i.test(n) && A.unshift("accelerated")) :
            "PaleMoon" == r && (m = /\bFirefox\/([\d.]+)\b/.exec(n)) ?
            A.push("identifying as Firefox " + m[1]) :
            "Firefox" == r && (m = /\b(Mobile|Tablet|TV)\b/i.exec(n)) ?
            (u || (u = "Firefox OS"), G || (G = m[1])) :
            !r ||
            (m = !/\bMinefield\b/i.test(n) && /\b(?:Firefox|Safari)\b/.exec(r)) ?
            (r &&
                !G &&
                /[\/,]|^[^(]+?\)/.test(n.slice(n.indexOf(m + "/") + 8)) &&
                (r = null),
                (m = G || L || u) &&
                (G || L || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(u)) &&
                (r =
                    /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(u) ? u : m) +
                    " Browser")) :
            "Electron" == r &&
            (m = (/\bChrome\/([\d.]+)\b/.exec(n) || 0)[1]) &&
            A.push("Chromium " + m) :
            (u = "Kubuntu");
        v ||
            (v = x([
                "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
                "Version",
                l(r),
                "(?:Firefox|Minefield|NetFront)",
            ]));
        if (
            (m =
                ("iCab" == F && 3 < parseFloat(v) && "WebKit") ||
                (/\bOpera\b/.test(r) && (/\bOPR\b/.test(n) ? "Blink" : "Presto")) ||
                (/\b(?:Midori|Nook|Safari)\b/i.test(n) &&
                    !/^(?:Trident|EdgeHTML)$/.test(F) &&
                    "WebKit") ||
                (!F && /\bMSIE\b/i.test(n) && ("Mac OS" == u ? "Tasman" : "Trident")) ||
                ("WebKit" == F && /\bPlayStation\b(?! Vita\b)/i.test(r) && "NetFront"))
        )
            F = [m];
        "IE" == r && (m = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(n) || 0)[1]) ?
            ((r += " Mobile"),
                (u = "Windows Phone " + (/\+$/.test(m) ? m : m + ".x")),
                A.unshift("desktop mode")) :
            /\bWPDesktop\b/i.test(n) ?
            ((r = "IE Mobile"),
                (u = "Windows Phone 8.x"),
                A.unshift("desktop mode"),
                v || (v = (/\brv:([\d.]+)/.exec(n) || 0)[1])) :
            "IE" != r &&
            "Trident" == F &&
            (m = /\brv:([\d.]+)/.exec(n)) &&
            (r && A.push("identifying as " + r + (v ? " " + v : "")),
                (r = "IE"),
                (v = m[1]));
        if (O) {
            if (g(y, "global"))
                if (
                    (Q &&
                        ((m = Q.lang.System),
                            (S = m.getProperty("os.arch")),
                            (u =
                                u ||
                                m.getProperty("os.name") + " " + m.getProperty("os.version"))),
                        U)
                ) {
                    try {
                        (v = y.require("ringo/engine").version.join(".")), (r = "RingoJS");
                    } catch (J) {
                        (m = y.system) &&
                        m.global.system == y.system &&
                            ((r = "Narwhal"), u || (u = m[0].os || null));
                    }
                    r || (r = "Rhino");
                } else
                    "object" == typeof y.process &&
                    !y.process.browser &&
                    (m = y.process) &&
                    ("object" == typeof m.versions &&
                        ("string" == typeof m.versions.electron ?
                            (A.push("Node " + m.versions.node),
                                (r = "Electron"),
                                (v = m.versions.electron)) :
                            "string" == typeof m.versions.nw &&
                            (A.push("Chromium " + v, "Node " + m.versions.node),
                                (r = "NW.js"),
                                (v = m.versions.nw))),
                        r ||
                        ((r = "Node.js"),
                            (S = m.arch),
                            (u = m.platform),
                            (v = (v = /[\d.]+/.exec(m.version)) ? v[0] : null)));
            else
                h((m = y.runtime)) == aa ?
                ((r = "Adobe AIR"), (u = m.flash.system.Capabilities.os)) :
                h((m = y.phantom)) == ba ?
                ((r = "PhantomJS"),
                    (v =
                        (m = m.version || null) &&
                        m.major + "." + m.minor + "." + m.patch)) :
                "number" == typeof V.documentMode &&
                (m = /\bTrident\/(\d+)/i.exec(n)) ?
                ((v = [v, V.documentMode]),
                    (m = +m[1] + 4) != v[1] &&
                    (A.push("IE " + v[1] + " mode"), F && (F[1] = ""), (v[1] = m)),
                    (v = "IE" == r ? String(v[1].toFixed(1)) : v[0])) :
                "number" == typeof V.documentMode &&
                /^(?:Chrome|Firefox)\b/.test(r) &&
                (A.push("masking as " + r + " " + v),
                    (r = "IE"),
                    (v = "11.0"),
                    (F = ["Trident"]),
                    (u = "Windows"));
            u = u && b(u);
        }
        v &&
            (m =
                /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(v) ||
                /(?:alpha|beta)(?: ?\d)?/i.exec(n + ";" + (O && P.appMinorVersion)) ||
                (/\bMinefield\b/i.test(n) && "a")) &&
            ((T = /b/i.test(m) ? "beta" : "alpha"),
                (v =
                    v.replace(RegExp(m + "\\+?$"), "") +
                    ("beta" == T ? da : ca) +
                    (/\d+\+?/.exec(m) || "")));
        if (
            "Fennec" == r ||
            ("Firefox" == r && /\b(?:Android|Firefox OS)\b/.test(u))
        )
            r = "Firefox Mobile";
        else if ("Maxthon" == r && v) v = v.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(G))
            "Xbox 360" == G && (u = null),
            "Xbox 360" == G && /\bIEMobile\b/.test(n) && A.unshift("mobile mode");
        else if (
            (!/^(?:Chrome|IE|Opera)$/.test(r) &&
                (!r || G || /Browser|Mobi/.test(r))) ||
            ("Windows CE" != u && !/Mobi/i.test(n))
        )
            if ("IE" == r && O)
                try {
                    null === y.external && A.unshift("platform preview");
                } catch (J) {
                    A.unshift("embedded");
                }
            else
                (/\bBlackBerry\b/.test(G) || /\bBB10\b/.test(n)) &&
                (m =
                    (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(n) ||
                        0)[1] || v) ?
                ((m = [m, /BB10/.test(n)]),
                    (u =
                        (m[1] ? ((G = null), (L = "BlackBerry")) : "Device Software") +
                        " " +
                        m[0]),
                    (v = null)) :
                this != e &&
                "Wii" != G &&
                ((O && N) ||
                    (/Opera/.test(r) && /\b(?:MSIE|Firefox)\b/i.test(n)) ||
                    ("Firefox" == r && /\bOS X (?:\d+\.){2,}/.test(u)) ||
                    ("IE" == r &&
                        ((u && !/^Win/.test(u) && 5.5 < v) ||
                            (/\bWindows XP\b/.test(u) && 8 < v) ||
                            (8 == v && !/\bTrident\b/.test(n))))) &&
                !q.test((m = k.call(e, n.replace(q, "") + ";"))) &&
                m.name &&
                ((m = "ing as " + m.name + ((m = m.version) ? " " + m : "")),
                    q.test(r) ?
                    (/\bIE\b/.test(m) && "Mac OS" == u && (u = null),
                        (m = "identify" + m)) :
                    ((m = "mask" + m),
                        (r = R ? b(R.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                        /\bIE\b/.test(m) && (u = null),
                        O || (v = null)),
                    (F = ["Presto"]),
                    A.push(m));
        else r += " Mobile";
        if ((m = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(n) || 0)[1])) {
            m = [parseFloat(m.replace(/\.(\d)$/, ".0$1")), m];
            if ("Safari" == r && "+" == m[1].slice(-1))
                (r = "WebKit Nightly"), (T = "alpha"), (v = m[1].slice(0, -1));
            else if (
                v == m[1] ||
                v == (m[2] = (/\bSafari\/([\d.]+\+?)/i.exec(n) || 0)[1])
            )
                v = null;
            m[1] = (/\bChrome\/([\d.]+)/i.exec(n) || 0)[1];
            537.36 == m[0] &&
                537.36 == m[2] &&
                28 <= parseFloat(m[1]) &&
                "WebKit" == F &&
                (F = ["Blink"]);
            O && (Z || m[1]) ?
                (F && (F[1] = "like Chrome"),
                    (m =
                        m[1] ||
                        ((m = m[0]),
                            530 > m ?
                            1 :
                            532 > m ?
                            2 :
                            532.05 > m ?
                            3 :
                            533 > m ?
                            4 :
                            534.03 > m ?
                            5 :
                            534.07 > m ?
                            6 :
                            534.1 > m ?
                            7 :
                            534.13 > m ?
                            8 :
                            534.16 > m ?
                            9 :
                            534.24 > m ?
                            10 :
                            534.3 > m ?
                            11 :
                            535.01 > m ?
                            12 :
                            535.02 > m ?
                            "13+" :
                            535.07 > m ?
                            15 :
                            535.11 > m ?
                            16 :
                            535.19 > m ?
                            17 :
                            536.05 > m ?
                            18 :
                            536.1 > m ?
                            19 :
                            537.01 > m ?
                            20 :
                            537.11 > m ?
                            "21+" :
                            537.13 > m ?
                            23 :
                            537.18 > m ?
                            24 :
                            537.24 > m ?
                            25 :
                            537.36 > m ?
                            26 :
                            "Blink" != F ?
                            "27" :
                            "28"))) :
                (F && (F[1] = "like Safari"),
                    (m =
                        ((m = m[0]),
                            400 > m ?
                            1 :
                            500 > m ?
                            2 :
                            526 > m ?
                            3 :
                            533 > m ?
                            4 :
                            534 > m ?
                            "4+" :
                            535 > m ?
                            5 :
                            537 > m ?
                            6 :
                            538 > m ?
                            7 :
                            601 > m ?
                            8 :
                            "8")));
            F &&
                (F[1] +=
                    " " + (m += "number" == typeof m ? ".x" : /[.+]/.test(m) ? "" : "+"));
            "Safari" == r && (!v || 45 < parseInt(v)) && (v = m);
        }
        "Opera" == r && (m = /\bzbov|zvav$/.exec(u)) ?
            ((r += " "),
                A.unshift("desktop mode"),
                "zvav" == m ? ((r += "Mini"), (v = null)) : (r += "Mobile"),
                (u = u.replace(RegExp(" *" + m + "$"), ""))) :
            "Safari" == r &&
            /\bChrome\b/.exec(F && F[1]) &&
            (A.unshift("desktop mode"),
                (r = "Chrome Mobile"),
                (v = null),
                /\bOS X\b/.test(u) ? ((L = "Apple"), (u = "iOS 4.3+")) : (u = null));
        v &&
            0 == v.indexOf((m = /[\d.]+$/.exec(u))) &&
            -1 < n.indexOf("/" + m + "-") &&
            (u = String(u.replace(m, "")).replace(/^ +| +$/g, ""));
        F &&
            !/\b(?:Avant|Nook)\b/.test(r) &&
            (/Browser|Lunascape|Maxthon/.test(r) ||
                ("Safari" != r && /^iOS/.test(u) && /\bSafari\b/.test(F[1])) ||
                (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
                        r
                    ) &&
                    F[1])) &&
            (m = F[F.length - 1]) &&
            A.push(m);
        A.length && (A = ["(" + A.join("; ") + ")"]);
        L && G && 0 > G.indexOf(L) && A.push("on " + L);
        G && A.push((/^on /.test(A[A.length - 1]) ? "" : "on ") + G);
        if (u) {
            var Y =
                (m = / ([\d.+]+)$/.exec(u)) &&
                "/" == u.charAt(u.length - m[0].length - 1);
            u = {
                architecture: 32,
                family: m && !Y ? u.replace(m[0], "") : u,
                version: m ? m[1] : null,
                toString: function() {
                    var J = this.version;
                    return (
                        this.family +
                        (J && !Y ? " " + J : "") +
                        (64 == this.architecture ? " 64-bit" : "")
                    );
                },
            };
        }
        (m = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(S)) && !/\bi686\b/i.test(S) ?
            (u &&
                ((u.architecture = 64),
                    (u.family = u.family.replace(RegExp(" *" + m), ""))),
                r &&
                (/\bWOW64\b/i.test(n) ||
                    (O &&
                        /\w(?:86|32)$/.test(P.cpuClass || P.platform) &&
                        !/\bWin64; x64\b/i.test(n))) &&
                A.unshift("32-bit")) :
            u &&
            /^OS X/.test(u.family) &&
            "Chrome" == r &&
            39 <= parseFloat(v) &&
            (u.architecture = 64);
        n || (n = null);
        y = {};
        y.description = n;
        y.layout = F && F[0];
        y.manufacturer = L;
        y.name = r;
        y.prerelease = T;
        y.product = G;
        y.ua = n;
        y.version = r && v;
        y.os = u || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null";
            },
        };
        y.parse = k;
        y.toString = function() {
            return this.description || "";
        };
        y.version && A.unshift(v);
        y.name && A.unshift(r);
        u &&
            r &&
            (u != String(u).split(" ")[0] || (u != r.split(" ")[0] && !G)) &&
            A.push(G ? "(" + u + ")" : "on " + u);
        A.length && (y.description = A.join(" "));
        return y;
    }
    var f = { function: !0, object: !0 },
        t = (f[typeof window] && window) || this,
        p = f[typeof exports] && exports;
    f = f[typeof module] && module && !module.nodeType && module;
    var w = p && f && "object" == typeof global && global;
    !w || (w.global !== w && w.window !== w && w.self !== w) || (t = w);
    var C = Math.pow(2, 53) - 1,
        q = /\bOpera/;
    w = Object.prototype;
    var E = w.hasOwnProperty,
        B = w.toString,
        z = k();
    "function" == typeof define && "object" == typeof define.amd && define.amd ?
        ((t.platform = z),
            define(function() {
                return z;
            })) :
        p && f ?
        e(z, function(n, D) {
            p[D] = n;
        }) :
        (t.platform = z);
}).call(this);
var s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX,
    s_iOffsetY,
    s_bFocus = !0;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile =
        /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
            a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
        );
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler();
});

function trace(a) {
    console.log(a);
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        e = b.documentElement;
    if (void 0 === window["inner" + a]) a = e["client" + a];
    else if (window["inner" + a] != e["client" + a]) {
        var h = b.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var g = b.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML =
            "<style>@media(" +
            c +
            ":" +
            e["client" + a] +
            "px){body#vpw-test-b div#vpw-test-d{" +
            c +
            ":7px!important}}</style>";
        h.appendChild(g);
        e.insertBefore(h, b.head);
        a = 7 == g["offset" + a] ? e["client" + a] : window["inner" + a];
        e.removeChild(h);
    } else a = window["inner" + a];
    return a;
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}

function isChrome() {
    return (
        /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    );
}

function getIOSWindowHeight() {
    return (
        (document.documentElement.clientWidth / window.innerWidth) *
        window.innerHeight
    );
}

function getHeightOfIOSToolbars() {
    var a =
        (0 === window.orientation ? screen.height : screen.width) -
        getIOSWindowHeight();
    return 1 < a ? a : 0;
}

function isIOS() {
    if (isIpad()) return !0;
    for (
        var a =
            "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(
                ";"
            ); a.length;

    )
        if (navigator.platform === a.pop()) return (s_bIsIphone = !0);
    return (s_bIsIphone = !1);
}

function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a &&
        navigator.userAgent.match(/Mac/) &&
        navigator.maxTouchPoints &&
        2 < navigator.maxTouchPoints ?
        !0 :
        a;
}

function isMobile() {
    return isIpad() ?
        !0 :
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ?
        !0 :
        !1;
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a =
            null !== platform.name && "safari" === platform.name.toLowerCase() ?
            getIOSWindowHeight() :
            getSize("Height");
        var c = getSize("Width");
        s_bFocus && _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
            e = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var h = a - b;
            b += h;
            e += (CANVAS_WIDTH / CANVAS_HEIGHT) * h;
        } else
            e < c &&
            ((h = c - e), (e += h), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * h));
        h = a / 2 - b / 2;
        var g = c / 2 - e / 2,
            l = CANVAS_WIDTH / e;
        if (g * l < -EDGEBOARD_X || h * l < -EDGEBOARD_Y)
            (b = Math.min(
                a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
                c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
            )),
            (e = Math.round(CANVAS_WIDTH * b)),
            (b = Math.round(CANVAS_HEIGHT * b)),
            (h = (a - b) / 2),
            (g = (c - e) / 2),
            (l = CANVAS_WIDTH / e);
        s_iOffsetX = -1 * g * l;
        s_iOffsetY = -1 * h * l;
        0 <= h && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface &&
            s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone && s_oStage ?
            ((canvas = document.getElementById("canvas")),
                (s_oStage.canvas.width = 2 * e),
                (s_oStage.canvas.height = 2 * b),
                (canvas.style.width = e + "px"),
                (canvas.style.height = b + "px"),
                (s_oStage.scaleX = s_oStage.scaleY =
                    2 * Math.min(e / CANVAS_WIDTH, b / CANVAS_HEIGHT))) :
            s_bMobile || isChrome() ?
            ($("#canvas").css("width", e + "px"),
                $("#canvas").css("height", b + "px")) :
            s_oStage &&
            ((s_oStage.canvas.width = e),
                (s_oStage.canvas.height = b),
                (s_iScaleFactor = Math.min(e / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
                (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
        0 > h || (h = (a - b) / 2);
        $("#canvas").css("top", h + "px");
        $("#canvas").css("left", g + "px");
        fullscreenHandler();
    }
}

function _checkOrientation(a, c) {
    s_bMobile &&
        ENABLE_CHECK_ORIENTATION &&
        (a > c ?
            "landscape" === $(".orientation-msg-container").attr("data-orientation") ?
            ($(".orientation-msg-container").css("display", "none"),
                s_oMain.startUpdate()) :
            ($(".orientation-msg-container").css("display", "block"),
                s_oMain.stopUpdate()) :
            "portrait" === $(".orientation-msg-container").attr("data-orientation") ?
            ($(".orientation-msg-container").css("display", "none"),
                s_oMain.startUpdate()) :
            ($(".orientation-msg-container").css("display", "block"),
                s_oMain.stopUpdate()));
}

function createBitmap(a, c, b) {
    var e = new createjs.Bitmap(a),
        h = new createjs.Shape();
    c && b ?
        h.graphics.beginFill("#fff").drawRect(0, 0, c, b) :
        h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    e.hitArea = h;
    return e;
}

function createSprite(a, c, b, e, h, g) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape();
    c.graphics.beginFill("#000000").drawRect(-b, -e, h, g);
    a.hitArea = c;
    return a;
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b));
}

function rotateVector2D(a, c) {
    var b = c.getX() * Math.cos(a) + c.getY() * Math.sin(a),
        e = c.getX() * -Math.sin(a) + c.getY() * Math.cos(a);
    c.set(b, e);
}

function tweenVectorsOnX(a, c, b) {
    return a + b * (c - a);
}

function shuffle(a) {
    for (var c = a.length, b, e; 0 !== c;)
        (e = Math.floor(Math.random() * c)),
        --c,
        (b = a[c]),
        (a[c] = a[e]),
        (a[e] = b);
    return a;
}

function bubbleSort(a) {
    do {
        var c = !1;
        for (var b = 0; b < a.length - 1; b++)
            a[b] > a[b + 1] &&
            ((c = a[b]), (a[b] = a[b + 1]), (a[b + 1] = c), (c = !0));
    } while (c);
}

function compare(a, c) {
    return a.index > c.index ? -1 : a.index < c.index ? 1 : 0;
}

function easeLinear(a, c, b, e) {
    return (b * a) / e + c;
}

function easeInQuad(a, c, b, e) {
    return b * (a /= e) * a + c;
}

function easeInSine(a, c, b, e) {
    return -b * Math.cos((a / e) * (Math.PI / 2)) + b + c;
}

function easeInCubic(a, c, b, e) {
    return b * (a /= e) * a * a + c;
}

function getTrajectoryPoint(a, c) {
    var b = new createjs.Point(),
        e = (1 - a) * (1 - a),
        h = a * a;
    b.x = e * c.start.x + 2 * (1 - a) * a * c.traj.x + h * c.end.x;
    b.y = e * c.start.y + 2 * (1 - a) * a * c.traj.y + h * c.end.y;
    return b;
}

function formatTime(a) {
    a /= 1e3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(1);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a;
}

function degreesToRadians(a) {
    return (a * Math.PI) / 180;
}

function checkRectCollision(a, c) {
    var b = getBounds(a, 0.9);
    var e = getBounds(c, 0.98);
    return calculateIntersection(b, e);
}

function calculateIntersection(a, c) {
    var b, e, h, g;
    var l = a.x + (b = a.width / 2);
    var d = a.y + (e = a.height / 2);
    var k = c.x + (h = c.width / 2);
    var f = c.y + (g = c.height / 2);
    l = Math.abs(l - k) - (b + h);
    d = Math.abs(d - f) - (e + g);
    return 0 > l && 0 > d ?
        ((l = Math.min(Math.min(a.width, c.width), -l)),
            (d = Math.min(Math.min(a.height, c.height), -d)), {
                x: Math.max(a.x, c.x),
                y: Math.max(a.y, c.y),
                width: l,
                height: d,
                rect1: a,
                rect2: c,
            }) :
        null;
}

function getBounds(a, c) {
    var b = { x: Infinity, y: Infinity, width: 0, height: 0 };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var e = a.children,
            h = e.length,
            g;
        for (g = 0; g < h; g++) {
            var l = getBounds(e[g], 1);
            l.x < b.x && (b.x = l.x);
            l.y < b.y && (b.y = l.y);
            l.x + l.width > b.x2 && (b.x2 = l.x + l.width);
            l.y + l.height > b.y2 && (b.y2 = l.y + l.height);
        }
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2;
    } else {
        if (a instanceof createjs.Bitmap) {
            h = a.sourceRect || a.image;
            g = h.width * c;
            var d = h.height * c;
        } else if (a instanceof createjs.Sprite)
            if (
                a.spriteSheet._frames &&
                a.spriteSheet._frames[a.currentFrame] &&
                a.spriteSheet._frames[a.currentFrame].image
            ) {
                h = a.spriteSheet.getFrame(a.currentFrame);
                g = h.rect.width;
                d = h.rect.height;
                e = h.regX;
                var k = h.regY;
            } else(b.x = a.x || 0), (b.y = a.y || 0);
        else(b.x = a.x || 0), (b.y = a.y || 0);
        e = e || 0;
        g = g || 0;
        k = k || 0;
        d = d || 0;
        b.regX = e;
        b.regY = k;
        h = a.localToGlobal(0 - e, 0 - k);
        l = a.localToGlobal(g - e, d - k);
        g = a.localToGlobal(g - e, 0 - k);
        e = a.localToGlobal(0 - e, d - k);
        b.x = Math.min(Math.min(Math.min(h.x, l.x), g.x), e.x);
        b.y = Math.min(Math.min(Math.min(h.y, l.y), g.y), e.y);
        b.width = Math.max(Math.max(Math.max(h.x, l.x), g.x), e.x) - b.x;
        b.height = Math.max(Math.max(Math.max(h.y, l.y), g.y), e.y) - b.y;
    }
    return b;
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1);
}

function shuffle(a) {
    for (var c = a.length, b, e; 0 < c;)
        (e = Math.floor(Math.random() * c)),
        c--,
        (b = a[c]),
        (a[c] = a[e]),
        (a[e] = b);
    return a;
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a);
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1);
    },
    onTouchMove: function(a) {
        this.moved = !0;
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(
                a.changedTouches[0].clientX,
                a.changedTouches[0].clientY
            );
            3 == a.nodeType && (a = a.parentNode);
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c);
        }
    },
};
(function() {
    function a(b) {
        var e = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden",
        };
        b = b || window.event;
        b.type in e ?
            (document.body.className = e[b.type]) :
            ((document.body.className = this[c] ? "hidden" : "visible"),
                s_bMultiplayer ||
                ("hidden" === document.body.className ?
                    (s_oMain.stopUpdate(), (s_bFocus = !1)) :
                    (s_oMain.startUpdate(), (s_bFocus = !0))));
    }
    var c = "hidden";
    c in document ?
        document.addEventListener("visibilitychange", a) :
        (c = "mozHidden") in document ?
        document.addEventListener("mozvisibilitychange", a) :
        (c = "webkitHidden") in document ?
        document.addEventListener("webkitvisibilitychange", a) :
        (c = "msHidden") in document ?
        document.addEventListener("msvisibilitychange", a) :
        "onfocusin" in document ?
        (document.onfocusin = document.onfocusout = a) :
        (window.onpageshow =
            window.onpagehide =
            window.onfocus =
            window.onblur =
            a);
})();

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
    for (
        var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++
    ) {
        var e = c[b].split("=");
        if (e[0] == a) return e[1];
    }
}

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ?
        (s_aSounds[a].play(),
            s_aSounds[a].volume(c),
            s_aSounds[a].loop(b),
            s_aSounds[a]) :
        null;
}

function stopSound(a) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, c) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(c);
}

function setMute(a, c) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(c);
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN &&
        !1 !== screenfull.isEnabled &&
        ((s_bFullscreen = screenfull.isFullscreen),
            null !== s_oInterface && s_oInterface.resetFullscreenBut(),
            null !== s_oMenu && s_oMenu.resetFullscreenBut());
}
if (screenfull.isEnabled)
    screenfull.on("change", function() {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut();
    });

function CSpriteLibrary() {
    var a = {},
        c,
        b,
        e,
        h,
        g,
        l;
    this.init = function(d, k, f) {
        c = {};
        e = b = 0;
        h = d;
        g = k;
        l = f;
    };
    this.addSprite = function(d, k) {
        if (!a.hasOwnProperty(d)) {
            var f = new Image();
            a[d] = c[d] = { szPath: k, oSprite: f, bLoaded: !1 };
            b++;
        }
    };
    this.getSprite = function(d) {
        return a.hasOwnProperty(d) ? a[d].oSprite : null;
    };
    this._onSpritesLoaded = function() {
        b = 0;
        g.call(l);
    };
    this._onSpriteLoaded = function() {
        h.call(l);
        ++e === b && this._onSpritesLoaded();
    };
    this.loadSprites = function() {
        for (var d in c)
            (c[d].oSprite.oSpriteLibrary = this),
            (c[d].oSprite.szKey = d),
            (c[d].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey);
            }),
            (c[d].oSprite.onerror = function(k) {
                var f = k.currentTarget;
                setTimeout(function() {
                    c[f.szKey].oSprite.src = c[f.szKey].szPath;
                }, 500);
            }),
            (c[d].oSprite.src = c[d].szPath);
    };
    this.setLoaded = function(d) {
        a[d].bLoaded = !0;
    };
    this.isLoaded = function(d) {
        return a[d].bLoaded;
    };
    this.getNumSprites = function() {
        return b;
    };
}
var CANVAS_WIDTH = 1920,
    CANVAS_HEIGHT = 1080,
    EDGEBOARD_X = 256,
    EDGEBOARD_Y = 84,
    FPS_TIME = 1e3 / 24,
    DISABLE_SOUND_MOBILE = !1,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    PRIMARY_FONT = "arialbold",
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    TIME_ANIM_IDLE,
    ANIM_IDLE1_TIMESPEED,
    ANIM_IDLE2_TIMESPEED,
    ANIM_IDLE3_TIMESPEED,
    ANIM_SPIN_TIMESPEED,
    TIME_ANIM_WIN,
    ANIM_WIN1_TIMESPEED,
    ANIM_WIN2_TIMESPEED,
    TIME_ANIM_LOSE,
    STATE_IDLE = 0,
    STATE_SPIN = 1,
    STATE_WIN = 2,
    STATE_LOSE = 3,
    LED_SPIN = 3,
    MIN_FAKE_SPIN = 3,
    WHEEL_SPIN_TIMESPEED = 2600,
    START_CREDIT,
    START_BET,
    BET_OFFSET,
    MAX_BET,
    WHEEL_SETTINGS,
    AD_SHOW_COUNTER = [],
    BANK_CASH,
    WIN_OCCURRENCE,
    ENABLE_FULLSCREEN,
    ENABLE_CHECK_ORIENTATION,
    SHOW_CREDITS,
    SEGMENT_ROT = 18;

function CPreloader() {
    var a, c, b, e, h, g, l, d, k;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./games/wheel_of_fortune/sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./games/wheel_of_fortune/sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        k = new createjs.Container();
        s_oStage.addChild(k);
    };
    this.unload = function() {
        k.removeAllChildren();
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady();
    };
    this.attachSprites = function() {
        var f = new createjs.Shape();
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(f);
        f = s_oSpriteLibrary.getSprite("200x200");
        l = createBitmap(f);
        l.regX = 0.5 * f.width;
        l.regY = 0.5 * f.height;
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT / 2 - 80;
        k.addChild(l);
        d = new createjs.Shape();
        d.graphics
            .beginFill("rgba(0,0,0,0.01)")
            .drawRoundRect(l.x - 100, l.y - 100, 200, 200, 10);
        k.addChild(d);
        l.mask = d;
        f = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(f);
        e.x = CANVAS_WIDTH / 2 - f.width / 2;
        e.y = CANVAS_HEIGHT / 2 + 70;
        k.addChild(e);
        a = f.width;
        c = f.height;
        h = new createjs.Shape();
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, 1, c);
        k.addChild(h);
        e.mask = h;
        b = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 120;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        k.addChild(b);
        g = new createjs.Shape();
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(g);
        createjs.Tween.get(g)
            .to({ alpha: 0 }, 500)
            .call(function() {
                createjs.Tween.removeTweens(g);
                k.removeChild(g);
            });
    };
    this.refreshLoader = function(f) {
        b.text = f + "%";
        100 === f &&
            (s_oMain._onRemovePreloader(), (b.visible = !1), (e.visible = !1));
        h.graphics.clear();
        f = Math.floor((f * a) / 100);
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, f, c);
    };
    this._init();
}

function CMain(a) {
    var c,
        b = 0,
        e = 0,
        h = STATE_LOADING,
        g,
        l;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_bMobile = isMobile();
        !1 === s_bMobile ?
            s_oStage.enableMouseOver(20) :
            createjs.Touch.enable(s_oStage, !0);
        s_iPrevTime = new Date().getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = 30;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary();

        g = new CPreloader;


    };
    this.preloaderReady = function() {
        this._loadImages();
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
        c = !0;
    };
    this.soundLoaded = function() {
        b++;
        if (g && g.refreshLoader) {
            g.refreshLoader(Math.floor((b / e) * 100));
        } else {
            console.error("g or g.refreshLoader is not defined.");
        }
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_over",
            loop: !1,
            volume: 1,
            ingamename: "game_over",
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click",
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel",
            loop: !0,
            volume: 1,
            ingamename: "reel",
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "start_reel",
            loop: !1,
            volume: 1,
            ingamename: "start_reel",
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !1,
            volume: 1,
            ingamename: "win",
        });
        e += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var k = 0; k < s_aSoundsInfo.length; k++)
            this.tryToLoadSound(s_aSoundsInfo[k], !1);
    };
    this.tryToLoadSound = function(k, f) {
        setTimeout(
            function() {
                s_aSounds[k.ingamename] = new Howl({
                    src: [k.path + k.filename + ".mp3"],
                    autoplay: !1,
                    preload: !0,
                    loop: k.loop,
                    volume: k.volume,
                    onload: s_oMain.soundLoaded,
                    onloaderror: function(t, p) {
                        for (var w = 0; w < s_aSoundsInfo.length; w++)
                            if (
                                0 < s_aSounds[s_aSoundsInfo[w].ingamename]._sounds.length &&
                                t === s_aSounds[s_aSoundsInfo[w].ingamename]._sounds[0]._id
                            ) {
                                s_oMain.tryToLoadSound(s_aSoundsInfo[w], !0);
                                break;
                            } else
                                document.querySelector("#block_game").style.display = "none";
                    },
                    onplayerror: function(t) {
                        for (var p = 0; p < s_aSoundsInfo.length; p++)
                            if (t === s_aSounds[s_aSoundsInfo[p].ingamename]._sounds[0]._id) {
                                s_aSounds[s_aSoundsInfo[p].ingamename].once(
                                    "unlock",
                                    function() {
                                        s_aSounds[s_aSoundsInfo[p].ingamename].play();
                                    }
                                );
                                break;
                            }
                    },
                });
            },
            f ? 200 : 0
        );
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./games/wheel_of_fortune/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./games/wheel_of_fortune/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./games/wheel_of_fortune/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./games/wheel_of_fortune/sprites/bg_game.png");
        s_oSpriteLibrary.addSprite("bg_help", "./games/wheel_of_fortune/sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("but_exit", "./games/wheel_of_fortune/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./games/wheel_of_fortune/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_spin", "./games/wheel_of_fortune/sprites/but_spin.png");
        s_oSpriteLibrary.addSprite("but_plus", "./games/wheel_of_fortune/sprites/but_plus.png");
        s_oSpriteLibrary.addSprite("wheel", "./games/wheel_of_fortune/sprites/wheel.png");
        s_oSpriteLibrary.addSprite("leds", "./games/wheel_of_fortune/sprites/leds.png");
        s_oSpriteLibrary.addSprite(
            "but_fullscreen",
            "./games/wheel_of_fortune/sprites/but_fullscreen.png"
        );
        s_oSpriteLibrary.addSprite("but_credits", "./games/wheel_of_fortune/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_credits", "./games/wheel_of_fortune/sprites/logo_credits.png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    this._onImagesLoaded = function() {
        b++;
        g.refreshLoader(Math.floor((b / e) * 100));
    };
    this._onAllImagesLoaded = function() {};
    this._onRemovePreloader = function() {
        g.unload();
        s_oMain.gotoMenu();
    };
    this.gotoMenu = function() {
        new CMenu();
        h = STATE_MENU;
    };
    this.gotoGame = function(k) {
        s_bEasyMode = k;
        l = new CGame(d);
        h = STATE_GAME;
        $(s_oMain).trigger("game_start");
    };
    this.gotoHelp = function() {
        new CHelp();
        h = STATE_HELP;
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
    };
    this.startUpdate = function() {
        s_iPrevTime = new Date().getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
        s_bAudioActive &&
            Howler.mute(!1);
    };
    this._update = function(k) {
        if (!1 !== c) {
            var f = new Date().getTime();
            s_iTimeElaps = f - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = f;
            1e3 <= s_iCntTime &&
                ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
            h === STATE_GAME && l.update();
            s_oStage.update(k);
        }
    };
    s_oMain = this;
    var d = a;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    ENABLE_FULLSCREEN = a.fullscreen;
    SHOW_CREDITS = a.show_credits;
    this.initContainer();
}
var s_bMobile,
    s_bEasyMode,
    s_bAudioActive = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer,
    s_oStage,
    s_oMain,
    s_oSpriteLibrary,
    s_oCanvas,
    s_bFullscreen = !1,
    s_aSounds,
    s_aSoundsInfo;

function CTextButton(a, c, b, e, h, g, l, d, k) {
    var f, t, p, w, C, q, E;
    this._init = function(B, z, n, D, x, y, A, P, v) {
        f = !1;
        t = [];
        p = [];
        q = new createjs.Container();
        q.x = B;
        q.y = z;
        q.cursor = "pointer";
        v.addChild(q);
        P
            ?
            ((E = createBitmap(n)), q.addChild(E), (q.regX = n.width / 2)) :
            ((B = new createjs.SpriteSheet({
                    images: [n],
                    frames: { width: n.width / 2, height: n.height },
                    animations: { state_true: [0], state_false: [1] },
                })),
                (E = createSprite(B, "state_false", 0, 0, n.width / 2, n.height)),
                q.addChild(E),
                new CTLText(
                    q,
                    20,
                    20,
                    n.width / 2 - 40,
                    n.height - 40,
                    A,
                    "center",
                    y,
                    x,
                    1,
                    10,
                    10,
                    D, !0, !0, !1, !1
                ),
                (q.regX = n.width / 4));
        q.regY = n.height / 2;
        this._initListener();
    };
    this.unload = function() {
        q.off("mousedown", w);
        q.off("pressup", C);
        k.removeChild(q);
    };
    this.setVisible = function(B) {
        q.visible = B;
    };
    this._initListener = function() {
        w = q.on("mousedown", this.buttonDown);
        C = q.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(B, z, n) {
        t[B] = z;
        p[B] = n;
    };
    this.buttonRelease = function() {
        f ||
            ((q.scaleX = 1),
                (q.scaleY = 1),
                playSound("click", 1, !1),
                t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(p[ON_MOUSE_UP]));
    };
    this.buttonDown = function() {
        f ||
            ((q.scaleX = 0.9),
                (q.scaleY = 0.9),
                t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN]));
    };
    this.enable = function() {
        f = !1;
        d || E.gotoAndStop("state_true");
    };
    this.disable = function() {
        f = !0;
        d || E.gotoAndStop("state_false");
    };
    this.setPosition = function(B, z) {
        q.x = B;
        q.y = z;
    };
    this.setX = function(B) {
        q.x = B;
    };
    this.setY = function(B) {
        q.y = B;
    };
    this.getButtonImage = function() {
        return q;
    };
    this.getX = function() {
        return q.x;
    };
    this.getY = function() {
        return q.y;
    };
    this._init(a, c, b, e, h, g, l, d, k);
    return this;
}

function CToggle(a, c, b, e, h) {
    var g, l, d, k, f, t;
    this._init = function(w, C, q, E) {
        l = [];
        d = [];
        var B = new createjs.SpriteSheet({
            images: [q],
            frames: {
                width: q.width / 2,
                height: q.height,
                regX: q.width / 2 / 2,
                regY: q.height / 2,
            },
            animations: { state_true: [0], state_false: [1] },
        });
        g = E;
        t = createSprite(
            B,
            "state_" + g,
            q.width / 2 / 2,
            q.height / 2,
            q.width / 2,
            q.height
        );
        t.x = w;
        t.y = C;
        t.stop();
        t.cursor = "pointer";
        p.addChild(t);
        this._initListener();
    };
    this.unload = function() {
        t.off("mousedown", k);
        t.off("pressup", f);
        p.removeChild(t);
    };
    this._initListener = function() {
        k = t.on("mousedown", this.buttonDown);
        f = t.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(w, C, q) {
        l[w] = C;
        d[w] = q;
    };
    this.setActive = function(w) {
        g = w;
        t.gotoAndStop("state_" + g);
    };
    this.buttonRelease = function() {
        t.scaleX = 1;
        t.scaleY = 1;
        playSound("click", 1, !1);
        g = !g;
        t.gotoAndStop("state_" + g);
        l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(d[ON_MOUSE_UP], g);
    };
    this.buttonDown = function() {
        t.scaleX = 0.9;
        t.scaleY = 0.9;
        l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN]);
    };
    this.setPosition = function(w, C) {
        t.x = w;
        t.y = C;
    };
    var p = h;
    this._init(a, c, b, e);
}

function CGfxButton(a, c, b) {
    var e, h, g, l, d;
    this._init = function(k, f, t) {
        e = [];
        h = [];
        d = createBitmap(t);
        d.x = k;
        d.y = f;
        d.regX = t.width / 2;
        d.regY = t.height / 2;
        d.cursor = "pointer";
        s_oStage.addChild(d);
        this._initListener();
    };
    this.unload = function() {
        d.off("mousedown", g);
        d.off("pressup", l);
        s_oStage.removeChild(d);
    };
    this.setVisible = function(k) {
        d.visible = k;
    };
    this._initListener = function() {
        g = d.on("mousedown", this.buttonDown);
        l = d.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(k, f, t) {
        e[k] = f;
        h[k] = t;
    };
    this.buttonRelease = function() {
        d.scaleX = 1;
        d.scaleY = 1;
        playSound("click", 1, !1);
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(h[ON_MOUSE_UP]);
    };
    this.buttonDown = function() {
        d.scaleX = 0.9;
        d.scaleY = 0.9;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]);
    };
    this.setPosition = function(k, f) {
        d.x = k;
        d.y = f;
    };
    this.setX = function(k) {
        d.x = k;
    };
    this.setY = function(k) {
        d.y = k;
    };
    this.getButtonImage = function() {
        return d;
    };
    this.getX = function() {
        return d.x;
    };
    this.getY = function() {
        return d.y;
    };
    this._init(a, c, b);
    return this;
}

function CMenu() {
    var a,
        c,
        b,
        e,
        h,
        g,
        l = null,
        d = null,
        k,
        f,
        t,
        p,
        w,
        C;
    this._init = function() {
        f = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(f);
        var q = s_oSpriteLibrary.getSprite("but_play");
        t = new CTextButton(
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT - 190,
            q,
            TEXT_PLAY,
            PRIMARY_FONT,
            "#ffffff",
            70, !1,
            s_oStage
        );
        t.enable();
        t.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        q = s_oSpriteLibrary.getSprite("but_credits");
        SHOW_CREDITS
            ?
            ((a = CANVAS_WIDTH - q.height / 2 - 10),
                (c = q.height / 2 + 10),
                (C = new CGfxButton(a, c, q, s_oStage)),
                C.addEventListener(ON_MOUSE_UP, this._onCredits, this),
                (q = s_oSpriteLibrary.getSprite("audio_icon")),
                (h = a - q.width / 2 - 10)) :
            ((q = s_oSpriteLibrary.getSprite("audio_icon")),
                (h = CANVAS_WIDTH - q.height / 2 - 10));
        g = q.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            (w = new CToggle(h, g, q, s_bAudioActive, s_oStage)),
            w.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        q = window.document;
        var E = q.documentElement;
        l =
            E.requestFullscreen ||
            E.mozRequestFullScreen ||
            E.webkitRequestFullScreen ||
            E.msRequestFullscreen;
        d =
            q.exitFullscreen ||
            q.mozCancelFullScreen ||
            q.webkitExitFullscreen ||
            q.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (l = !1);
        l &&
            screenfull.isEnabled &&
            ((q = s_oSpriteLibrary.getSprite("but_fullscreen")),
                (b = q.width / 4 + 10),
                (e = q.height / 2 + 10),
                (k = new CToggle(b, e, q, s_bFullscreen, s_oStage)),
                k.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        p = new createjs.Shape();
        p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(p);
        createjs.Tween.get(p)
            .to({ alpha: 0 }, 1e3)
            .call(function() {
                p.visible = !1;
            });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.unload = function() {
        t.unload();
        t = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) w.unload(), (w = null);
        SHOW_CREDITS && (C.unload(), (C = null));
        l && screenfull.isEnabled && k.unload();
        s_oStage.removeChild(f);
        s_oMenu = f = null;
    };
    this.refreshButtonPos = function(q, E) {
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
        w.setPosition(h - q, E + g);
        SHOW_CREDITS && C.setPosition(a - q, E + c);
        l && screenfull.isEnabled && k.setPosition(b + q, e + E);
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this.resetFullscreenBut = function() {
        l && screenfull.isEnabled && k.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen
            ?
            d.call(window.document) :
            l.call(window.document.documentElement);
        sizeHandler();
    };
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
    };
    this._onCredits = function() {
        new CCreditsPanel();
    };
    s_oMenu = this;
    this._init();
}
var s_oMenu = null;

function CGame(a) {
    var c,
        b,
        e,
        h,
        g,
        l,
        d,
        k,
        f,
        t,
        p,
        w,
        C,
        q = null,
        E,
        B;
    this._init = function() {
        l = 1;
        e = b = 0;
        d = START_BET;
        k = START_CREDIT;
        f = -1;
        g = STATE_IDLE;
        t = 0;
        p = BANK_CASH;
        w = [];
        for (var z = 0, n = 0; n < WHEEL_SETTINGS.length; n++)
            z += WHEEL_SETTINGS[n].win_occurence;
        100 !== z ?
            ((z = createBitmap(s_oSpriteLibrary.getSprite("msg_box"))),
                s_oStage.addChild(z),
                (z = new createjs.Text(TEXT_ALERT, "50px " + PRIMARY_FONT, "#ffffff")),
                (z.x = CANVAS_WIDTH / 2),
                (z.y = CANVAS_HEIGHT / 2 - 200),
                (z.textAlign = "center"),
                (z.textBaseline = "middle"),
                (z.lineWidth = 900),
                s_oStage.addChild(z)) :
            ((c = !0),
                (E = new CWheel(1198, 540)),
                (z = createBitmap(s_oSpriteLibrary.getSprite("bg_game"))),
                s_oStage.addChild(z),
                (B = new CLeds(1198, 540)),
                (h = B.getState()),
                (C = new CInterface()),
                new CHelpPanel(),
                this._initProbability(),
                k < START_BET && this.gameOver());
    };
    this._initProbability = function() {
        for (var z = [], n = 0; n < WHEEL_SETTINGS.length; n++)
            z[n] = WHEEL_SETTINGS[n].win_occurence;
        for (n = 0; n < z.length; n++)
            for (var D = 0; D < z[n]; D++) w.push(n);
    };
    this.modifyBonus = function(z) {
        d = "plus" === z ? d + BET_OFFSET : d - BET_OFFSET;
        d = parseFloat(d.toFixed(2));
        if (d > MAX_BET)(d -= BET_OFFSET), (l = 1);
        else if (d < START_BET)(d += BET_OFFSET), (l = 1);
        else if (d > k) {
            d -= BET_OFFSET;
            return;
        }
        l = d / START_BET;
        l = l.toFixed(2);
        C.refreshBet(d);
        console.log("_iCurBet " + d);
        E.clearText();
        E.setText(l);
    };
    this.tryShowAd = function() {
        t++;
        t === AD_SHOW_COUNTER &&
            ((t = 0), $(s_oMain).trigger("show_interlevel_ad"));
    };
    this.spinWheel = function() {
        C.disableSpin(!0);
        g = STATE_SPIN;
        e = 0;
        this.setNewRound();
        C.refreshMoney(0);
        k -= d;
        p += d;
        k = parseFloat(k.toFixed(2));
        p = parseFloat(p.toFixed(2));
        C.refreshCredit(k);
        for (var z, n = [], D = 0; D < w.length; D++)
            (z = WHEEL_SETTINGS[w[D]].prize * l),
            z <= p && n.push({ prize: z, index: D });
        n = n[Math.floor(Math.random() * n.length)].index;
        f = w[n];
        z = MIN_FAKE_SPIN + Math.floor(3 * Math.random());
        D = SEGMENT_ROT - 3;
        D = -D / 2 + Math.random() * D;
        n = (360 - E.getDegree() + w[n] * SEGMENT_ROT + D) % 360;
        n = 360 * z + n;
        E.clearText();
        E.setText(l);
        E.spin(n, z);
        $(s_oMain).trigger("bet_placed", d);
    };
    this.setNewRound = function() {
        0 > f || (C.refreshCredit(k), C.clearMoneyPanel(), (f = -1));
    };
    this.releaseWheel = function() {
        this.tryShowAd();
        C.disableSpin(!1);
        C.refreshMoney(WHEEL_SETTINGS[f].prize * l);
        k += WHEEL_SETTINGS[f].prize * l;
        p -= WHEEL_SETTINGS[f].prize * l;
        $(s_oMain).trigger("save_score", [k]);
        C.refreshCredit(k);
        C.animWin();
        k < START_BET && this.gameOver();
        l > k / START_BET &&
            ((l = Math.floor(k / START_BET)), (d = l * START_BET), C.refreshBet(d));
        0 >= WHEEL_SETTINGS[f].prize ?
            ((g = STATE_LOSE), playSound("game_over", 1, !1)) :
            ((g = STATE_WIN), playSound("win", 1, !1));
    };
    this.getCurColor = function() {
        return E.getColor();
    };
    this.unload = function() {
        stopSound("reel");
        c = !1;
        C.unload();
        null !== q && q.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };
    this.onExit = function() {
        $(s_oMain).trigger("save_score", [k]);
        $(s_oMain).trigger("share_event", k);
        this.unload();
        s_oMain.gotoMenu();
    };
    this.gameOver = function() {
        q = CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        q.show();
    };
    this._animLedIdle = function() {
        b += s_iTimeElaps;
        if (b > TIME_ANIM_IDLE) {
            b = 0;
            for (var z = Math.floor(Math.random() * B.getNumAnim()); z === h;)
                z = Math.floor(Math.random() * B.getNumAnim());
            B.changeAnim(z);
            h = z;
        }
    };
    this._animLedSpin = function() {
        B.changeAnim(LED_SPIN);
        g = -1;
    };
    this._animLedWin = function() {
        0 === e ?
            (B.changeAnim(4 + Math.round(Math.random())),
                B.setWinColor(this.getCurColor())) :
            e > TIME_ANIM_WIN &&
            ((b = TIME_ANIM_IDLE), (g = STATE_IDLE), this.setNewRound(), (e = 0));
        e += s_iTimeElaps;
    };
    this._animLedLose = function() {
        0 === e ?
            (B.changeAnim(6), B.setWinColor(this.getCurColor())) :
            e > TIME_ANIM_LOSE &&
            ((b = TIME_ANIM_IDLE), (g = STATE_IDLE), this.setNewRound(), (e = 0));
        e += s_iTimeElaps;
    };
    this.update = function() {
        if (c)
            switch ((B.update(), g)) {
                case STATE_IDLE:
                    this._animLedIdle();
                    break;
                case STATE_SPIN:
                    this._animLedSpin();
                    break;
                case STATE_WIN:
                    this._animLedWin();
                    break;
                case STATE_LOSE:
                    this._animLedLose();
            }
    };
    s_oGame = this;
    WHEEL_SETTINGS = a.wheel_settings;
    START_CREDIT = a.start_credit;
    START_BET = a.start_bet;
    BET_OFFSET = a.bet_offset;
    MAX_BET = a.max_bet;
    TIME_ANIM_IDLE = a.anim_idle_change_frequency;
    ANIM_IDLE1_TIMESPEED = a.led_anim_idle1_timespeed;
    ANIM_IDLE2_TIMESPEED = a.led_anim_idle2_timespeed;
    ANIM_IDLE3_TIMESPEED = a.led_anim_idle3_timespeed;
    ANIM_SPIN_TIMESPEED = a.led_anim_spin_timespeed;
    TIME_ANIM_WIN = a.led_anim_win_duration;
    ANIM_WIN1_TIMESPEED = a.led_anim_win1_timespeed;
    ANIM_WIN2_TIMESPEED = a.led_anim_win2_timespeed;
    TIME_ANIM_LOSE = a.led_anim_lose_duration;
    AD_SHOW_COUNTER = a.ad_show_counter;
    BANK_CASH = a.bank_cash;
    ENABLE_FULLSCREEN = a.fullscreen;
    this._init();
}
var s_oGame;

function CVector2(a, c) {
    var b, e;
    this._init = function(h, g) {
        b = h;
        e = g;
    };
    this.add = function(h, g) {
        b += h;
        e += g;
    };
    this.addV = function(h) {
        b += h.getX();
        e += h.getY();
    };
    this.scalarDivision = function(h) {
        b /= h;
        e /= h;
    };
    this.subV = function(h) {
        b -= h.getX();
        e -= h.getY();
    };
    this.scalarProduct = function(h) {
        b *= h;
        e *= h;
    };
    this.invert = function() {
        b *= -1;
        e *= -1;
    };
    this.dotProduct = function(h) {
        return b * h.getX() + e * h.getY();
    };
    this.set = function(h, g) {
        b = h;
        e = g;
    };
    this.setV = function(h) {
        b = h.getX();
        e = h.getY();
    };
    this.length = function() {
        return Math.sqrt(b * b + e * e);
    };
    this.length2 = function() {
        return b * b + e * e;
    };
    this.normalize = function() {
        var h = this.length();
        0 < h && ((b /= h), (e /= h));
    };
    this.getNormalize = function(h) {
        this.length();
        h.set(b, e);
        h.normalize();
    };
    this.rot90CCW = function() {
        var h = b;
        b = -e;
        e = h;
    };
    this.rot90CW = function() {
        var h = b;
        b = e;
        e = -h;
    };
    this.getRotCCW = function(h) {
        h.set(b, e);
        h.rot90CCW();
    };
    this.getRotCW = function(h) {
        h.set(b, e);
        h.rot90CW();
    };
    this.ceil = function() {
        b = Math.ceil(b);
        e = Math.ceil(e);
    };
    this.round = function() {
        b = Math.round(b);
        e = Math.round(e);
    };
    this.toString = function() {
        return "Vector2: " + b + ", " + e;
    };
    this.print = function() {
        trace("Vector2: " + b + ", " + e);
    };
    this.getX = function() {
        return b;
    };
    this.getY = function() {
        return e;
    };
    this._init(a, c);
}

function CFormatText(a, c, b, e) {
    var h, g, l, d;
    this._init = function(k, f, t, p) {
        h = 0;
        d = new createjs.Container();
        d.x = k;
        d.y = f;
        p.addChild(d);
        k = 85;
        f = k / 20;
        for (p = 0; p < t.length; p++) {
            var w = k + "px";
            g = new createjs.Text();
            g.text = t[p];
            g.font = w + " " + PRIMARY_FONT;
            g.color = "#000000";
            g.textAlign = "left";
            g.textBaseline = "middle";
            g.x = h + 2;
            g.y = 6;
            d.addChild(g);
            l = new createjs.Text();
            l.text = t[p];
            l.font = w + " " + PRIMARY_FONT;
            l.color = "#ffffff";
            l.textAlign = "left";
            l.textBaseline = "middle";
            l.x = h;
            l.y = 4;
            d.addChild(l);
            h += l.getMeasuredWidth() + f;
            k -= 9;
        }
        d.cache(
            0, -d.getBounds().height / 2,
            d.getBounds().width,
            d.getBounds().height
        );
    };
    this.unload = function() {
        e.removeChild(d);
    };
    this.rotateText = function(k) {
        d.rotation = k;
    };
    this._init(a, c, b, e);
}

function CInterface() {
    var a,
        c,
        b,
        e,
        h,
        g,
        l = null,
        d = null,
        k,
        f,
        t,
        p,
        w,
        C,
        q,
        E,
        B,
        z,
        n,
        D;
    this._init = function() {
        n = this;
        q = 0;
        var x = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH - x.height / 2 - 10;
        e = x.height / 2 + 10;
        t = new CGfxButton(b, e, x, !0);
        t.addEventListener(ON_MOUSE_UP, this._onExit, this);
        a = CANVAS_WIDTH - x.width / 2 - 100;
        c = x.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            (x = s_oSpriteLibrary.getSprite("audio_icon")),
            (f = new CToggle(a, c, x, s_bAudioActive, s_oStage)),
            f.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        x = window.document;
        var y = x.documentElement;
        l =
            y.requestFullscreen ||
            y.mozRequestFullScreen ||
            y.webkitRequestFullScreen ||
            y.msRequestFullscreen;
        d =
            x.exitFullscreen ||
            x.mozCancelFullScreen ||
            x.webkitExitFullscreen ||
            x.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (l = !1);
        l &&
            screenfull.isEnabled &&
            ((x = s_oSpriteLibrary.getSprite("but_fullscreen")),
                (h = x.width / 4 + 10),
                (g = x.height / 2 + 10),
                (k = new CToggle(h, g, x, s_bFullscreen, s_oStage)),
                k.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        x = s_oSpriteLibrary.getSprite("but_spin");
        p = new CTextButton(
            500,
            CANVAS_HEIGHT - 190,
            x,
            TEXT_SPIN,
            PRIMARY_FONT,
            "#ffffff",
            70, !1,
            s_oStage
        );
        p.enable();
        p.addEventListener(ON_MOUSE_UP, this._onButSpinRelease, this);
        x = s_oSpriteLibrary.getSprite("but_plus");
        w = new CTextButton(
            650,
            CANVAS_HEIGHT - 320,
            x,
            TEXT_PLUS,
            PRIMARY_FONT,
            "#ffffff",
            70, !1,
            s_oStage
        );
        w.enable();
        w.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
        x = s_oSpriteLibrary.getSprite("but_plus");
        C = new CTextButton(
            350,
            CANVAS_HEIGHT - 320,
            x,
            TEXT_MIN,
            PRIMARY_FONT,
            "#ffffff",
            70, !1,
            s_oStage
        );
        C.enable();
        C.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
        new CTLText(
            s_oStage,
            282,
            132,
            450,
            100,
            140,
            "center",
            "#000000",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_CREDITS, !0, !0, !1, !1
        );
        new CTLText(
            s_oStage,
            280,
            130,
            450,
            100,
            140,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_CREDITS, !0, !0, !1, !1
        );
        E = new CTLText(
            s_oStage,
            310,
            284,
            370,
            90,
            100,
            "left",
            "#fff",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_CURRENCY + START_CREDIT.toFixed(2), !0, !0, !1, !1
        );
        B = new CTLText(
            s_oStage,
            310,
            486,
            326,
            110,
            100,
            "left",
            "#fff",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_CURRENCY + "0.00", !0, !0, !1, !1
        );
        D = new CTLText(
            s_oStage,
            310,
            486,
            326,
            110,
            100,
            "left",
            "yellow",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_CURRENCY + "0.00", !0, !0, !1, !1
        );
        D.setAlpha(q);
        z = new CTLText(
            s_oStage,
            410,
            730,
            180,
            60,
            70,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_CURRENCY + START_BET, !0, !0, !1, !1
        );
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) f.unload(), (f = null);
        t.unload();
        p.unload();
        l && screenfull.isEnabled && k.unload();
        s_oInterface = null;
    };
    this.refreshCredit = function(x) {
        E.refreshText(TEXT_CURRENCY + x.toFixed(2));
    };
    this.clearMoneyPanel = function() {
        D.setAlpha(0);
        createjs.Tween.removeTweens(D.getText());
    };
    this.refreshMoney = function(x) {
        B.refreshText(TEXT_CURRENCY + x.toFixed(2));
        D.refreshText(TEXT_CURRENCY + x.toFixed(2));
    };
    this.refreshBet = function(x) {
        z.refreshText(TEXT_CURRENCY + x);
    };
    this.animWin = function() {
        q = 1 === q ? 0 : 1;
        createjs.Tween.get(D.getText())
            .to({ alpha: q }, 150, createjs.Ease.cubicOut)
            .call(function() {
                n.animWin();
            });
    };
    this._onButSpinRelease = function() {
        s_oGame.spinWheel();
    };
    this._onButPlusRelease = function() {
        s_oGame.modifyBonus("plus");
    };
    this._onButMinRelease = function() {
        s_oGame.modifyBonus("min");
    };
    this.disableSpin = function(x) {
        !0 === x ?
            (p.disable(), w.disable(), C.disable()) :
            (p.enable(), w.enable(), C.enable());
    };
    this.refreshButtonPos = function(x, y) {
        t.setPosition(b - x, y + e);
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
        f.setPosition(a - x, y + c);
        l && screenfull.isEnabled && k.setPosition(h + x, g + y);
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this.resetFullscreenBut = function() {
        l && screenfull.isEnabled && k.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen
            ?
            d.call(window.document) :
            l.call(window.document.documentElement);
        sizeHandler();
    };
    this._onExit = function() {
        $(s_oMain).trigger("end_session");
        s_oGame.onExit();
    };
    s_oInterface = this;
    this._init();
    return this;
}
var s_oInterface = null;

function CHelpPanel() {
    var a, c;
    this._init = function() {
        c = new createjs.Container();
        c.alpha = 0;
        s_oStage.addChild(c);
        var e = this;
        a = createBitmap(s_oSpriteLibrary.getSprite("bg_help"));
        c.addChild(a);
        new CTLText(
            c,
            CANVAS_WIDTH / 2 - 98,
            CANVAS_HEIGHT / 2 - 312,
            600,
            280,
            70,
            "center",
            "#000000",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_HELP1, !0, !0, !0, !1
        );
        new CTLText(
            c,
            CANVAS_WIDTH / 2 - 100,
            CANVAS_HEIGHT / 2 - 310,
            600,
            280,
            70,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_HELP1, !0, !0, !0, !1
        );
        new CTLText(
            c,
            CANVAS_WIDTH / 2 - 498,
            CANVAS_HEIGHT / 2 + 102,
            600,
            180,
            70,
            "center",
            "#000000",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_HELP2, !0, !0, !0, !1
        );
        new CTLText(
            c,
            CANVAS_WIDTH / 2 - 500,
            CANVAS_HEIGHT / 2 + 100,
            600,
            180,
            70,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            2,
            2,
            TEXT_HELP2, !0, !0, !0, !1
        );
        createjs.Tween.get(c).to({ alpha: 1 }, 700);
        c.on("pressup", function() {
            e._onExitHelp();
        });
    };
    this.unload = function() {
        s_oStage.removeChild(c);
        var e = this;
        c.off("pressup", function() {
            e._onExitHelp();
        });
    };
    this._onExitHelp = function() {
        b.unload();
    };
    var b = this;
    this._init();
}

function CEndPanel(a) {
    var c, b, e, h;
    this._init = function(g) {
        b = new createjs.Container();
        b.alpha = 0;
        b.visible = !1;
        s_oStage.addChild(b);
        c = createBitmap(g);
        b.addChild(c);
        e = new CTLText(
            b,
            CANVAS_WIDTH / 2 - 398,
            222,
            800,
            600,
            70,
            "center",
            "#000",
            PRIMARY_FONT,
            1,
            20,
            20,
            "", !0, !0, !0, !1
        );
        h = new CTLText(
            b,
            CANVAS_WIDTH / 2 - 400,
            220,
            800,
            600,
            70,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            20,
            20,
            "", !0, !0, !0, !1
        );
    };
    this.unload = function() {
        b.off("mousedown", this._onExit);
    };
    this._initListener = function() {
        b.on("mousedown", this._onExit);
    };
    this.show = function() {
        playSound("game_over", 1, !1);
        $(s_oMain).trigger("show_interlevel_ad");
        e.refreshText(TEXT_GAMEOVER);
        h.refreshText(TEXT_GAMEOVER);
        b.visible = !0;
        var g = this;
        createjs.Tween.get(b)
            .to({ alpha: 1 }, 500)
            .call(function() {
                g._initListener();
            });
    };
    this._onExit = function() {
        b.off("mousedown", this._onExit);
        s_oStage.removeChild(b);
        $(s_oMain).trigger("end_session");
        s_oGame.onExit();
    };
    this._init(a);
    return this;
}

function CWheel(a, c) {
    var b, e, h, g, l;
    this._init = function(d, k) {
        b = [];
        e = [];
        h = [];
        for (var f = 0; f < WHEEL_SETTINGS.length; f++)
            h[f] = WHEEL_SETTINGS[f].prize;
        this._initColors();
        f = s_oSpriteLibrary.getSprite("wheel");
        l = new createjs.Container();
        l.x = d;
        l.y = k;
        s_oStage.addChild(l);
        g = createBitmap(f);
        g.regX = f.width / 2;
        g.regY = f.height / 2;
        l.addChild(g);
        g.cache(0, 0, f.width, f.height);
        this.setText(1);
    };
    this.unload = function() {
        s_oStage.removeChild(l);
    };
    this._initColors = function() {
        for (var d = 0; 9 > d; d++) e[0] = "violet";
        for (d = 351; 360 >= d; d++) e[d] = "violet";
        for (var k = 0; 4 > k; k++)
            for (d = 9 + k * SEGMENT_ROT * 5; d < 27 + k * SEGMENT_ROT * 5; d++)
                e[d] = "blue";
        for (k = 0; 4 > k; k++)
            for (d = 27 + k * SEGMENT_ROT * 5; d < 45 + k * SEGMENT_ROT * 5; d++)
                e[d] = "green";
        for (k = 0; 4 > k; k++)
            for (d = 45 + k * SEGMENT_ROT * 5; d < 63 + k * SEGMENT_ROT * 5; d++)
                e[d] = "yellow";
        for (k = 0; 4 > k; k++)
            for (d = 63 + k * SEGMENT_ROT * 5; d < 81 + k * SEGMENT_ROT * 5; d++)
                e[d] = "red";
        for (k = 0; 3 > k; k++)
            for (d = 81 + k * SEGMENT_ROT * 5; d <= 99 + k * SEGMENT_ROT * 5; d++)
                e[d] = "violet";
        for (d = 315; 333 >= d; d++) e[d] = "white";
    };
    this.setText = function(d) {
        for (
            var k = new CVector2(-355, 3),
                f = SEGMENT_ROT,
                t = (Math.PI * SEGMENT_ROT) / 180,
                p = 0; p < h.length; p++
        ) {
            var w = (h[p] * d).toFixed(2);
            b[p] = new CFormatText(k.getX(), k.getY(), TEXT_CURRENCY + w, l);
            b[p].rotateText(-f * p);
            rotateVector2D(t, k);
        }
    };
    this.clearText = function() {
        for (var d = 0; d < h.length; d++) b[d].unload();
    };
    this.spin = function(d, k) {
        playSound("start_reel", 1, !1);
        playSound("reel", 0.1, !0);
        createjs.Tween.get(l)
            .to({ rotation: l.rotation + d },
                WHEEL_SPIN_TIMESPEED * k,
                createjs.Ease.quartOut
            )
            .call(function() {
                l.rotation %= 360;
                s_oGame.releaseWheel();
                (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || stopSound("reel");
            });
    };
    this.getDegree = function() {
        return l.rotation;
    };
    this.getColor = function() {
        return e[Math.round(l.rotation)];
    };
    this._init(a, c);
}

function CLeds(a, c) {
    var b, e, h, g, l, d, k, f, t;
    this._init = function(p, w) {
        l = 3;
        h = Math.floor(Math.random() * l);
        g = 0;
        f = [];
        t = new createjs.Container();
        t.x = p;
        t.y = w;
        s_oStage.addChild(t);
        var C = {
            images: [s_oSpriteLibrary.getSprite("leds")],
            frames: { width: 90, height: 90, regX: 45, regY: 45 },
            animations: {
                off: [0],
                white: [1],
                green: [2],
                blue: [3],
                violet: [4],
                red: [5],
                yellow: [6],
            },
        };
        C = new createjs.SpriteSheet(C);
        for (
            var q = new CVector2(-427, 0),
                E = ((360 / WHEEL_SETTINGS.length) * Math.PI) / 180,
                B = 0; B < WHEEL_SETTINGS.length; B++
        )
            (f[B] = createSprite(C, "off", 0, 0, 90, 90)),
            (f[B].x = q.getX()),
            (f[B].y = q.getY()),
            rotateVector2D(E, q),
            t.addChild(f[B]);
        f[0].visible = !1;
    };
    this.unload = function() {
        s_oStage.removeChild(t);
    };
    this.setWinColor = function(p) {
        b = p;
    };
    this.getState = function() {
        return h;
    };
    this.getNumAnim = function() {
        return l;
    };
    this.changeAnim = function(p) {
        g = 0;
        h = p;
        for (p = 0; p < f.length; p++) f[p].gotoAndStop("off");
    };
    this.animIdle0 = function() {
        g += s_iTimeElaps;
        if (0 <= g && g < ANIM_IDLE1_TIMESPEED / 2)
            for (var p = 0; p < f.length; p++)
                0 === p % 2 ? f[p].gotoAndStop("white") : f[p].gotoAndStop("off");
        else if (g >= ANIM_IDLE1_TIMESPEED / 2 && g < ANIM_IDLE1_TIMESPEED)
            for (p = 0; p < f.length; p++)
                0 === p % 2 ? f[p].gotoAndStop("off") : f[p].gotoAndStop("white");
        else g = 0;
    };
    this.animIdle1 = function() {
        0 === g &&
            ((d = 0),
                f[d].gotoAndStop("white"),
                f[f.length / 4].gotoAndStop("white"),
                f[f.length / 2].gotoAndStop("white"),
                f[(3 * f.length) / 4].gotoAndStop("white"));
        g += s_iTimeElaps;
        g > ANIM_IDLE2_TIMESPEED &&
            (d === f.length / 4 && ((d = 0), (g = 1)),
                0 === d ?
                (f[f.length - 1].gotoAndStop("off"),
                    f[0].gotoAndStop("white"),
                    f[f.length / 4 - 1].gotoAndStop("off"),
                    f[f.length / 4].gotoAndStop("white"),
                    f[f.length / 2 - 1].gotoAndStop("off"),
                    f[f.length / 2].gotoAndStop("white"),
                    f[(3 * f.length) / 4 - 1].gotoAndStop("off"),
                    f[(3 * f.length) / 4].gotoAndStop("white")) :
                (f[d - 1].gotoAndStop("off"),
                    f[d].gotoAndStop("white"),
                    f[f.length / 4 + d - 1].gotoAndStop("off"),
                    f[f.length / 4 + d].gotoAndStop("white"),
                    f[f.length / 2 + d - 1].gotoAndStop("off"),
                    f[f.length / 2 + d].gotoAndStop("white"),
                    f[(3 * f.length) / 4 + d - 1].gotoAndStop("off"),
                    f[(3 * f.length) / 4 + d].gotoAndStop("white")),
                d++,
                (g = 1));
    };
    this.animIdle2 = function() {
        0 === g &&
            ((d = 0),
                (k = f.length / 2),
                f[d].gotoAndStop("white"),
                f[k].gotoAndStop("white"));
        g += s_iTimeElaps;
        g > ANIM_IDLE3_TIMESPEED &&
            (d === f.length / 2 && ((d = 0), (k = f.length / 2), (g = 1)),
                0 === d ?
                (f[f.length - 1].gotoAndStop("off"),
                    f[1].gotoAndStop("off"),
                    f[0].gotoAndStop("white"),
                    f[f.length / 2 + 1].gotoAndStop("off"),
                    f[f.length / 2 - 1].gotoAndStop("off"),
                    f[f.length / 2].gotoAndStop("white")) :
                (f[d - 1].gotoAndStop("off"),
                    f[d].gotoAndStop("white"),
                    1 !== d && f[f.length - d + 1].gotoAndStop("off"),
                    f[f.length - d].gotoAndStop("white"),
                    f[k + 1].gotoAndStop("off"),
                    f[k].gotoAndStop("white"),
                    f[f.length - k - 1].gotoAndStop("off"),
                    0 !== k && f[f.length - k].gotoAndStop("white")),
                d++,
                k--,
                (g = 1));
    };
    this.animSpin0 = function() {
        0 === g &&
            ((d = Math.floor(Math.random() * f.length)), f[d].gotoAndStop("white"));
        g += s_iTimeElaps;
        g > ANIM_SPIN_TIMESPEED &&
            (0 > d && ((d = f.length - 1), (g = 1)),
                d === f.length - 1 ?
                (f[0].gotoAndStop("off"), f[f.length - 1].gotoAndStop("white")) :
                (f[d + 1].gotoAndStop("off"), f[d].gotoAndStop("white")),
                d--,
                (g = 1));
    };
    this.animWin0 = function() {
        g += s_iTimeElaps;
        if (0 <= g && g < ANIM_WIN1_TIMESPEED / 2)
            for (var p = 0; p < f.length; p++)
                0 === p % 2 ? f[p].gotoAndStop(b) : f[p].gotoAndStop("off");
        else if (g >= ANIM_WIN1_TIMESPEED / 2 && g < ANIM_WIN1_TIMESPEED)
            for (p = 0; p < f.length; p++)
                0 === p % 2 ? f[p].gotoAndStop("off") : f[p].gotoAndStop(b);
        else g = 0;
    };
    this.animWin1 = function() {
        0 === g &&
            ((d = 0),
                (k = f.length / 2),
                (e = b),
                f[d].gotoAndStop(e),
                f[k].gotoAndStop(e));
        g += s_iTimeElaps;
        g > ANIM_WIN2_TIMESPEED &&
            (d > f.length / 4 &&
                ((d = 0), (k = f.length / 2), (g = 1), (e = e === b ? "off" : b)),
                0 === d ?
                (f[0].gotoAndStop(e), f[f.length / 2].gotoAndStop(e)) :
                d <= f.length / 4 &&
                (f[d].gotoAndStop(e),
                    f[f.length - d].gotoAndStop(e),
                    f[k].gotoAndStop(e),
                    0 !== k && f[f.length - k].gotoAndStop(e)),
                d++,
                k--,
                (g = 1));
    };
    this.animLose = function() {
        for (var p = 0; p < f.length; p++) f[p].gotoAndStop(b);
        h = -1;
    };
    this.update = function() {
        switch (h) {
            case 0:
                this.animIdle0();
                break;
            case 1:
                this.animIdle1();
                break;
            case 2:
                this.animIdle2();
                break;
            case 3:
                this.animSpin0();
                break;
            case 4:
                this.animWin0();
                break;
            case 5:
                this.animWin1();
                break;
            case 6:
                this.animLose();
        }
    };
    this._init(a, c);
}

function CCreditsPanel() {
    var a, c, b, e, h, g, l;
    this._init = function() {
        l = new createjs.Container();
        s_oStage.addChild(l);
        var d = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        l.addChild(d);
        d = s_oSpriteLibrary.getSprite("msg_box");
        b = createBitmap(d);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2;
        b.regX = d.width / 2;
        b.regY = d.height / 2;
        l.addChild(b);
        h = new createjs.Shape();
        h.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0.01;
        c = h.on("click", this._onLogoButRelease);
        l.addChild(h);
        d = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 570;
        e = new CGfxButton(a, 254, d, l);
        e.addEventListener(ON_MOUSE_UP, this.unload, this);
        d = s_oSpriteLibrary.getSprite("logo_credits");
        var k = createBitmap(d);
        k.regX = d.width / 2;
        k.regY = d.height / 2;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2;
        l.addChild(k);
        g = new createjs.Text(
            "",
            "35px " + PRIMARY_FONT,
            "#ffffff"
        );
        g.x = CANVAS_WIDTH / 2;
        g.y = 820;
        g.textAlign = "center";
        l.addChild(g);
    };
    this.unload = function() {
        h.off("click", c);
        e.unload();
        e = null;
        s_oStage.removeChild(l);
    };
    this._onLogoButRelease = function() {
        window.open("https://www.codethislab.com/", "_blank");
    };
    this._init();
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        var a = this._szMsg,
            c = 3 > a.length ? !1 : this._bEllipsis;
        c && (this._oText.text = this._szMsg);
        if (c || this._bMultiline) {
            var b = a.length - 2,
                e = this._iStartingFontSize;
            this.__refreshTextFont(e);
            for (
                var h = this._oText.getBounds(),
                    g = this._iEffectiveWidth - this._iOutline,
                    l = this._iEffectiveHeight - this._iOutline; h.height > l || h.width > g;

            ) {
                if (c && e < this._iMinTextSize) {
                    if (
                        (b--,
                            (this._oText.text = a.slice(0, b) + "..."),
                            this.__updateY(),
                            this.__verticalAlign(),
                            1 == b)
                    )
                        break;
                } else if (
                    (e--,
                        this.__refreshTextFont(e),
                        this.__updateY(),
                        this.__verticalAlign(),
                        e < this._iMinTextSize && !c)
                )
                    break;
                h = this._oText.getBounds();
            }
            this._iFontSize = e;
            this.__updateY();
            this.__verticalAlign();
            this.__updateStroke();
        } else this.__autofitLight();
    },
    __autofitLight: function() {
        this.__refreshTextFont(this._iStartingFontSize);
        var a = this._oText.getBounds();
        a =
            this._iEffectiveWidth - this._iOutline - a.width <
            this._iEffectiveHeight - this._iOutline - a.height ?
            Math.floor(
                this.__linearFunction(
                    this._iEffectiveWidth - this._iOutline,
                    a.width,
                    0,
                    this._iStartingFontSize,
                    0
                )
            ) :
            Math.floor(
                this.__linearFunction(
                    this._iEffectiveHeight - this._iOutline,
                    a.height,
                    0,
                    this._iStartingFontSize,
                    0
                )
            );
        a > this._iStartingFontSize ?
            (a = this._iStartingFontSize) :
            a < this._iMinTextSize && (a = this._iMinTextSize);
        this.__refreshTextFont(a);
        this._iFontSize = a;
        this.__updateY();
        this.__verticalAlign();
        this.__updateStroke();
    },
    __linearFunction: function(a, c, b, e, h) {
        return ((a - c) * (h - e)) / (b - c) + e;
    },
    __checkAutofit: function() {
        this._bFitText ?
            this.__autofit() :
            (this.__refreshTextFont(this._iStartingFontSize),
                this.__updateY(),
                this.__verticalAlign(),
                this.__updateStroke());
    },
    __refreshTextFont: function(a) {
        this._oText.font = a + "px " + this._szFont;
        this._oText.lineHeight = Math.round(a * this._fLineHeightFactor);
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV;
        }
    },
    __updateY: function() {
        this._oText.y = this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y +=
                    this._oText.lineHeight / 2 +
                    (this._iFontSize * this._fLineHeightFactor - this._iFontSize);
        }
    },
    __updateStroke: function() {
        this._oStroke &&
            ((this._oStroke.x = this._oText.x),
                (this._oStroke.y = this._oText.y),
                (this._oStroke.text = this._oText.text),
                (this._oStroke.font = this._oText.font),
                (this._oStroke.lineHeight = this._oText.lineHeight));
    },
    __updateOutline: function() {
        this._iOutline =
            this._oStroke && this._oStroke.outline > this._oText.outline ?
            this._oStroke.outline :
            this._oText.outline;
    },
    __updateHorizontalAlign: function() {
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._iWidth - this._iPaddingH;
        }
    },
    __setMsg: function(a) {
        this._szMsg = a;
        if ("" === this._szMsg || (!this._szMsg && 0 !== this._szMsg))
            this._szMsg = " ";
    },
    __createDebugShape: function() {
        this._oDebugShape = new createjs.Shape();
        this.__refreshDebugShape();
    },
    __refreshDebugShape: function() {
        this._oDebugShape.graphics.clear();
        this._oDebugShape.graphics
            .beginFill("rgba(255,130,0,0.5)")
            .drawRect(0, 0, this._iWidth, this._iHeight)
            .moveTo(this._iPaddingH, this._iHeight - this._iPaddingV)
            .lineTo(this._iWidth - this._iPaddingH, this._iHeight - this._iPaddingV)
            .lineTo(this._iWidth - this._iPaddingH, this._iPaddingV)
            .lineTo(this._iPaddingH, this._iPaddingV)
            .closePath()
            .beginFill("rgba(255,0,0,0.5)")
            .drawRect(
                this._iPaddingH,
                this._iPaddingV,
                this._iEffectiveWidth,
                this._iEffectiveHeight
            );
    },
    __updateLineWidth: function() {
        this._oText.lineWidth = this._bMultiline ?
            this._iWidth - 2 * this._iPaddingH :
            null;
        this._oStroke && (this._oStroke.lineWidth = this._oText.lineWidth);
    },
    __updateWidth: function() {
        this.__updateLineWidth();
        this.__updateHorizontalAlign();
    },
    __updateSize: function() {
        this.__checkAutofit();
        this._bDebug && this.__refreshDebugShape();
    },
    __createText: function() {
        this._bDebug &&
            (this.__createDebugShape(), this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(
            this._szMsg,
            this._iFontSize + "px " + this._szFont,
            this._szColor
        );
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(
            this._iFontSize * this._fLineHeightFactor
        );
        this._oText.textAlign = this._szAlign;
        this.__updateLineWidth();
        this.__updateHorizontalAlign();
        this._oContainer.addChild(this._oText);
        try {
            s_oCanvas.getContext("2d");
            var a =
                null !==
                (!!window.WebGLRenderingContext &&
                    (s_oCanvas.getContext("webgl") ||
                        s_oCanvas.getContext("experimental-webgl")));
            this._bMandatoryCache = a;
            this.setCacheActive(a);
        } catch (c) {
            (this._bMandatoryCache = !1), this.setCacheActive(!1);
        }
        this.refreshText(this._szMsg);
    },
    setStroke: function(a, c) {
        this._oStroke ||
            ((this._oStroke = this._oText.clone()),
                this._oContainer.addChild(this._oStroke),
                this._oContainer.swapChildren(this._oStroke, this._oText));
        this.setStrokeColor(c ? c : this._szStrokeColor);
        this.setStrokeSize(a ? a : this._iStrokeSize);
        this.updateCache();
    },
    setStrokeColor: function(a) {
        this._szStrokeColor = a;
        this._oStroke &&
            ((this._oStroke.color = this._szStrokeColor), this.updateCache());
    },
    setStrokeSize: function(a) {
        this._iStrokeSize = a;
        this._oStroke &&
            ((this._oStroke.outline = this._iStrokeSize),
                this.__updateOutline(),
                this.__checkAutofit(),
                this.updateCache());
    },
    removeStroke: function() {
        this._oStroke &&
            (this._oContainer.removeChild(this._oStroke),
                (this._oStroke = null),
                this.__updateOutline(),
                this.__checkAutofit(),
                this.updateCache());
    },
    roll: function(a, c, b, e, h, g) {
        c = null == c ? 1500 : c;
        b = null == b ? createjs.Ease.linear : b;
        var l = { score: parseInt(this._szMsg) };
        this._szMsg = a;
        var d = this._bFitText ?

            function() {
                this._oText.text = Math.floor(l.score);
                this.__autofitLight();
                this.updateCache();
            } :
            function() {
                this._oText.text = Math.floor(l.score);
                this.__updateY();
                this.__verticalAlign();
                this.__updateStroke();
                this.updateCache();
            };
        this.stopRolling();
        this._oTweenRollText = createjs.Tween.get(l, { override: !0 }).to({ score: a },
            c,
            b
        );
        this._oTweenRollText.on("change", d, this);
        this._oTweenRollText.on(
            "complete",
            function() {
                e && e.apply(h, g);
                this.stopRolling();
            },
            this, !0
        );
    },
    isRolling: function() {
        return null == this._oTweenRollText ? !1 : !0;
    },
    stopRolling: function() {
        this.isRolling() &&
            (this._oTweenRollText.removeAllEventListeners(),
                (this._oTweenRollText.paused = !0),
                (this._oTweenRollText = null));
    },
    pauseRolling: function() {
        this.isRolling() && (this._oTweenRollText.paused = !0);
    },
    resumeRolling: function() {
        this.isRolling() && (this._oTweenRollText.paused = !1);
    },
    setY: function(a) {
        this._oContainer.y = a;
    },
    setX: function(a) {
        this._oContainer.x = a;
    },
    setHorizontalSize: function(a, c) {
        c = void 0 === c ? this._iPaddingH : c;
        this.__setHorizontalSizeVars(a, c);
        this.__updateWidth();
        this.__updateSize();
        this._updateCacheSize();
    },
    setVerticalSize: function(a, c) {
        c = void 0 === c ? this._iPaddingV : c;
        this.__setVerticalSizeVars(a, c);
        this.__updateSize();
        this._updateCacheSize();
    },
    setSize: function(a, c, b, e) {
        b = void 0 === b ? this._iPaddingH : b;
        e = void 0 === e ? this._iPaddingV : e;
        this.__setHorizontalSizeVars(a, b);
        this.__setVerticalSizeVars(c, e);
        this.__updateWidth();
        this.__updateSize();
        this._updateCacheSize();
    },
    __setHorizontalSizeVars: function(a, c) {
        this._iWidth = a;
        this._iPaddingH = c;
        this._iEffectiveWidth = this._iWidth - 2 * this._iPaddingH;
    },
    __setVerticalSizeVars: function(a, c) {
        this._iHeight = a;
        this._iPaddingV = c;
        this._iEffectiveHeight = this._iHeight - 2 * this._iPaddingV;
    },
    setPosition: function(a, c) {
        this._oContainer.x = a;
        this._oContainer.y = c;
    },
    setHorizontalAlign: function(a) {
        this._szAlign = a;
        this._oText.textAlign = this._szAlign;
        this.__updateHorizontalAlign();
        this.updateCache();
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a;
    },
    setOutline: function(a) {
        this._oText.outline = a;
        this.__updateOutline();
        this.updateCache();
    },
    setShadow: function(a, c, b, e) {
        this._oText.shadow = new createjs.Shadow(a, c, b, e);
        this.updateCache();
    },
    setColor: function(a) {
        this._szColor = a;
        this._oText.color = this._szColor;
        this.updateCache();
    },
    setAlpha: function(a) {
        this._oContainer.alpha = a;
    },
    setVisible: function(a) {
        this._oContainer.visible = a;
    },
    setFontSize: function(a) {
        this._iFontSize = this._iStartingFontSize = a;
        this.refreshText(this._szMsg);
    },
    setRegX: function(a) {
        this._oContainer.regX = a;
    },
    setRegY: function(a) {
        this._oContainer.regY = a;
    },
    setScale: function(a) {
        this._oContainer.scale = a;
    },
    setParentContainer: function(a) {
        a.contains(this._oContainer) ||
            (this.removeContainerFromParent(),
                (this._oParentContainer = a),
                this._oParentContainer.addChild(this._oContainer));
    },
    removeContainerFromParent: function() {
        this._oParentContainer &&
            (this._oParentContainer.removeChild(this._oContainer),
                (this._oParentContainer = null));
    },
    setCacheActive: function(a, c) {
        c = void 0 === c ? 1 : c;
        var b = !1;
        this._fCacheScale != c && a && ((b = !0), this._oContainer.uncache());
        if (b || !this._bMandatoryCache)
            (this._fCacheScale = c),
            (!this._bCacheActive && a) || b ?
            this._oContainer.cache(
                0,
                0,
                this.__nextPow2(this._iEffectiveWidth),
                this.__nextPow2(this._iEffectiveHeight),
                this._fCacheScale
            ) :
            this._bCacheActive && !a && this._oContainer.uncache(),
            (this._bCacheActive = a);
    },
    _updateCacheSize: function() {
        this._bCacheActive &&
            (this._oContainer.uncache(),
                this._oContainer.cache(
                    0,
                    0,
                    this.__nextPow2(this._iEffectiveWidth),
                    this.__nextPow2(this._iEffectiveHeight),
                    this._fCacheScale
                ));
    },
    __nextPow2: function(a) {
        var c = Math.floor(Math.log2(a));
        return Math.pow(2, c) === a ? a : Math.pow(2, c + 1);
    },
    updateCache: function() {
        this._bCacheActive && this._oContainer.updateCache();
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oContainer);
    },
    getText: function() {
        return this._oText;
    },
    getTextWidth: function() {
        return this._oText.getBounds().width + this._iOutline;
    },
    getTextHeight: function() {
        return this._oText.getBounds().height + this._iOutline;
    },
    getMsg: function() {
        return this._szMsg;
    },
    getX: function() {
        return this._oContainer.x;
    },
    getY: function() {
        return this._oContainer.y;
    },
    getHeight: function() {
        return this._iHeight;
    },
    getWidth: function() {
        return this._iWidth;
    },
    getPaddingH: function() {
        return this._iPaddingH;
    },
    getPaddingV: function() {
        return this._iPaddingV;
    },
    getColor: function() {
        return this._szColor;
    },
    getFontSize: function() {
        return this._iFontSize;
    },
    getContainer: function() {
        return this._oContainer;
    },
    unload: function() {
        this.stopRolling();
        this._bCacheActive && this._oContainer.uncache();
        createjs.Tween.removeTweens(this._oContainer);
        this.removeContainerFromParent();
    },
    refreshText: function(a) {
        this.__setMsg(a);
        this._oText.text = this._szMsg;
        this.__checkAutofit();
        this.updateCache();
    },
};

function CTLText(a, c, b, e, h, g, l, d, k, f, t, p, w, C, q, E, B, z, n) {
    z = void 0 === z ? 11 : z;
    n = void 0 === n ? !1 : n;
    this._oContainer = new createjs.Container();
    this._oContainer.x = c;
    this._oContainer.y = b;
    a && this.setParentContainer(a);
    this._iOutline = 0;
    this._iWidth = e;
    this._iHeight = h;
    this._bMultiline = E;
    this._iStartingFontSize = this._iFontSize = g;
    this._szAlign = l;
    this._szColor = d;
    this._szFont = k;
    this._iPaddingH = t;
    this._iPaddingV = p;
    this._iEffectiveWidth = this._iWidth - 2 * this._iPaddingH;
    this._iEffectiveHeight = this._iHeight - 2 * this._iPaddingV;
    this._bVerticalAlign = q;
    this._bFitText = C;
    this._iMinTextSize = z;
    this._bDebug = B;
    this._bEllipsis = n;
    this._bCacheActive = this._bMandatoryCache = !1;
    this._fCacheScale;
    this._oDebugShape = null;
    this._fLineHeightFactor = f;
    this._oText = null;
    this.__setMsg(w);
    this.__createText();
}

function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
    a = extractHostname(a);
    var c = a.split("."),
        b = c.length;
    2 < b && (a = c[b - 2] + "." + c[b - 1]);
    return a;
}
var getClosestTop = function() {
        var a = window,
            c = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    c = !0;
                    break;
                }
        } catch (b) {
            c = !0;
        }
        return { topFrame: a, err: c };
    },
    getBestPageUrl = function(a) {
        var c = a.topFrame,
            b = "";
        if (a.err)
            try {
                try {
                    b = window.top.location.href;
                } catch (h) {
                    var e = window.location.ancestorOrigins;
                    b = e[e.length - 1];
                }
            } catch (h) {
                b = c.document.referrer;
            }
        else b = c.location.href;
        return b;
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    return true;
}