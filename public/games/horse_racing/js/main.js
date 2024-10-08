/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    var a =
        "undefined" !== typeof window &&
        "undefined" !== typeof window.document ?
        window.document : {},
        k = "undefined" !== typeof module && module.exports,
        c = (function() {
            for (
                var m,
                    f = [
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
                    r = f.length,
                    g = {}; d < r; d++
            )
                if ((m = f[d]) && m[1] in a) {
                    for (d = 0; d < m.length; d++) g[f[0][d]] = m[d];
                    return g;
                }
            return !1;
        })(),
        b = { change: c.fullscreenchange, error: c.fullscreenerror },
        e = {
            request: function(m) {
                return new Promise(
                    function(f, d) {
                        var r = function() {
                            this.off("change", r);
                            f();
                        }.bind(this);
                        this.on("change", r);
                        m = m || a.documentElement;
                        Promise.resolve(m[c.requestFullscreen]())["catch"](d);
                    }.bind(this)
                );
            },
            exit: function() {
                return new Promise(
                    function(m, f) {
                        if (this.isFullscreen) {
                            var d = function() {
                                this.off("change", d);
                                m();
                            }.bind(this);
                            this.on("change", d);
                            Promise.resolve(a[c.exitFullscreen]())["catch"](f);
                        } else m();
                    }.bind(this)
                );
            },
            toggle: function(m) {
                return this.isFullscreen ? this.exit() : this.request(m);
            },
            onchange: function(m) {
                this.on("change", m);
            },
            onerror: function(m) {
                this.on("error", m);
            },
            on: function(m, f) {
                var d = b[m];
                d && a.addEventListener(d, f, !1);
            },
            off: function(m, f) {
                var d = b[m];
                d && a.removeEventListener(d, f, !1);
            },
            raw: c,
        };
    c
        ?
        (Object.defineProperties(e, {
                isFullscreen: {
                    get: function() {
                        return !!a[c.fullscreenElement];
                    },
                },
                element: {
                    enumerable: !0,
                    get: function() {
                        return a[c.fullscreenElement];
                    },
                },
                isEnabled: {
                    enumerable: !0,
                    get: function() {
                        return !!a[c.fullscreenEnabled];
                    },
                },
            }),
            k ? (module.exports = e) : (window.screenfull = e)) :
        k ?
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
                {
                    name: "apple-mobile-web-app-status-bar-style",
                    content: "black",
                },
            ],
            k = 0; k < a.length; k++
    ) {
        var c = document.createElement("meta");
        c.name = a[k].name;
        c.content = a[k].content;
        var b = window.document.head.querySelector(
            'meta[name="' + c.name + '"]'
        );
        b && b.parentNode.removeChild(b);
        window.document.head.appendChild(c);
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

function isIOSLessThen13() {
    var a = platform.os,
        k = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === k && 13 > a ? !0 : !1;
}
$(document).ready(function() {
    platform &&
        "iPhone" === platform.product &&
        "safari" === platform.name.toLowerCase() &&
        isIOSLessThen13() &&
        !iosInIframe() &&
        (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function() {
    platform &&
        "iPhone" === platform.product &&
        "safari" === platform.name.toLowerCase() &&
        isIOSLessThen13() &&
        !iosInIframe() &&
        iosResize();
});
(function() {
    function a(t) {
        t = String(t);
        return t.charAt(0).toUpperCase() + t.slice(1);
    }

    function k(t, D) {
        var z = -1,
            w = t ? t.length : 0;
        if ("number" == typeof w && -1 < w && w <= q)
            for (; ++z < w;) D(t[z], z, t);
        else b(t, D);
    }

    function c(t) {
        t = String(t).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(t) ? t : a(t);
    }

    function b(t, D) {
        for (var z in t) u.call(t, z) && D(t[z], z, t);
    }

    function e(t) {
        return null == t ? a(t) : x.call(t).slice(8, -1);
    }

    function m(t, D) {
        var z = null != t ? typeof t[D] : "number";
        return (!/^(?:boolean|number|string|undefined)$/.test(z) &&
            ("object" == z ? !!t[D] : !0)
        );
    }

    function f(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
    }

    function d(t, D) {
        var z = null;
        k(t, function(w, y) {
            z = D(z, w, y, t);
        });
        return z;
    }

    function r(t) {
        function D(L) {
            return d(L, function(J, I) {
                var M = I.pattern || f(I);
                !J &&
                    (J =
                        RegExp("\\b" + M + " *\\d+[.\\w_]*", "i").exec(t) ||
                        RegExp("\\b" + M + " *\\w+-[\\w]*", "i").exec(t) ||
                        RegExp(
                            "\\b" +
                            M +
                            "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
                            "i"
                        ).exec(t)) &&
                    ((J = String(
                            I.label && !RegExp(M, "i").test(I.label) ? I.label : J
                        ).split("/"))[1] &&
                        !/[\d.]+/.test(J[0]) &&
                        (J[0] += " " + J[1]),
                        (I = I.label || I),
                        (J = c(
                            J[0]
                            .replace(RegExp(M, "i"), I)
                            .replace(RegExp("; *(?:" + I + "[_-])?", "i"), " ")
                            .replace(
                                RegExp("(" + I + ")[-_.]?(\\w)", "i"),
                                "$1 $2"
                            )
                        )));
                return J;
            });
        }

        function z(L) {
            return d(L, function(J, I) {
                return (
                    J ||
                    (RegExp(
                        I +
                        "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
                        "i"
                    ).exec(t) || 0)[1] ||
                    null
                );
            });
        }
        var w = h,
            y = t && "object" == typeof t && "String" != e(t);
        y && ((w = t), (t = null));
        var E = w.navigator || {},
            A = E.userAgent || "";
        t || (t = A);
        var K = y ?
            !!E.likeChrome :
            /\bChrome\b/.test(t) && !/internal|\n/i.test(x.toString()),
            S = y ? "Object" : "ScriptBridgingProxyObject",
            W = y ? "Object" : "Environment",
            R = y && w.java ? "JavaPackage" : e(w.java),
            ba = y ? "Object" : "RuntimeObject";
        W = (R = /\bJava/.test(R) && w.java) && e(w.environment) == W;
        var ca = R ? "a" : "\u03b1",
            da = R ? "b" : "\u03b2",
            X = w.document || {},
            P = w.operamini || w.opera,
            T = p.test((T = y && P ? P["[[Class]]"] : e(P))) ? T : (P = null),
            v,
            U = t;
        y = [];
        var V = null,
            Q = t == A;
        A = Q && P && "function" == typeof P.version && P.version();
        var G = (function(L) {
                return d(L, function(J, I) {
                    return (
                        J ||
                        (RegExp("\\b" + (I.pattern || f(I)) + "\\b", "i").exec(
                                t
                            ) &&
                            (I.label || I))
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
            C = (function(L) {
                return d(L, function(J, I) {
                    return (
                        J ||
                        (RegExp("\\b" + (I.pattern || f(I)) + "\\b", "i").exec(
                                t
                            ) &&
                            (I.label || I))
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
            H = D([
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
                {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)",
                },
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
            N = (function(L) {
                return d(L, function(J, I, M) {
                    return (
                        J ||
                        ((I[H] ||
                                I[/^[a-z]+(?: +[a-z]+\b)*/i.exec(H)] ||
                                RegExp("\\b" + f(M) + "(?:\\b|\\w*\\d)", "i").exec(
                                    t
                                )) &&
                            M)
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
            F = (function(L) {
                return d(L, function(J, I) {
                    var M = I.pattern || f(I);
                    if (!J &&
                        (J = RegExp(
                            "\\b" + M + "(?:/[\\d.]+|[ \\w.]*)",
                            "i"
                        ).exec(t))
                    ) {
                        var O = J,
                            Y = I.label || I,
                            Z = {
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
                        M &&
                            Y &&
                            /^Win/i.test(O) &&
                            !/^Windows Phone /i.test(O) &&
                            (Z = Z[/[\d.]+$/.exec(O)]) &&
                            (O = "Windows " + Z);
                        O = String(O);
                        M && Y && (O = O.replace(RegExp(M, "i"), Y));
                        J = O = c(
                            O.replace(/ ce$/i, " CE")
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
                    return J;
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
        G && (G = [G]);
        N && !H && (H = D([N]));
        if ((v = /\bGoogle TV\b/.exec(H))) H = v[0];
        /\bSimulator\b/i.test(t) && (H = (H ? H + " " : "") + "Simulator");
        "Opera Mini" == C &&
            /\bOPiOS\b/.test(t) &&
            y.push("running in Turbo/Uncompressed mode");
        "IE" == C && /\blike iPhone OS\b/.test(t) ?
            ((v = r(t.replace(/like iPhone OS/, ""))),
                (N = v.manufacturer),
                (H = v.product)) :
            /^iP/.test(H) ?
            (C || (C = "Safari"),
                (F =
                    "iOS" +
                    ((v = / OS ([\d_]+)/i.exec(t)) ?
                        " " + v[1].replace(/_/g, ".") :
                        ""))) :
            "Konqueror" != C || /buntu/i.test(F) ?
            (N &&
                "Google" != N &&
                ((/Chrome/.test(C) && !/\bMobile Safari\b/i.test(t)) ||
                    /\bVita\b/.test(H))) ||
            (/\bAndroid\b/.test(F) &&
                /^Chrome/.test(C) &&
                /\bVersion\//i.test(t)) ?
            ((C = "Android Browser"),
                (F = /\bAndroid\b/.test(F) ? F : "Android")) :
            "Silk" == C ?
            (/\bMobi/i.test(t) ||
                ((F = "Android"), y.unshift("desktop mode")),
                /Accelerated *= *true/i.test(t) && y.unshift("accelerated")) :
            "PaleMoon" == C && (v = /\bFirefox\/([\d.]+)\b/.exec(t)) ?
            y.push("identifying as Firefox " + v[1]) :
            "Firefox" == C && (v = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ?
            (F || (F = "Firefox OS"), H || (H = v[1])) :
            !C ||
            (v = !/\bMinefield\b/i.test(t) &&
                /\b(?:Firefox|Safari)\b/.exec(C)) ?
            (C &&
                !H &&
                /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(v + "/") + 8)) &&
                (C = null),
                (v = H || N || F) &&
                (H ||
                    N ||
                    /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(
                        F
                    )) &&
                (C =
                    /[a-z]+(?: Hat)?/i.exec(
                        /\bAndroid\b/.test(F) ? F : v
                    ) + " Browser")) :
            "Electron" == C &&
            (v = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) &&
            y.push("Chromium " + v) :
            (F = "Kubuntu");
        A ||
            (A = z([
                "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
                "Version",
                f(C),
                "(?:Firefox|Minefield|NetFront)",
            ]));
        if (
            (v =
                ("iCab" == G && 3 < parseFloat(A) && "WebKit") ||
                (/\bOpera\b/.test(C) &&
                    (/\bOPR\b/.test(t) ? "Blink" : "Presto")) ||
                (/\b(?:Midori|Nook|Safari)\b/i.test(t) &&
                    !/^(?:Trident|EdgeHTML)$/.test(G) &&
                    "WebKit") ||
                (!G &&
                    /\bMSIE\b/i.test(t) &&
                    ("Mac OS" == F ? "Tasman" : "Trident")) ||
                ("WebKit" == G &&
                    /\bPlayStation\b(?! Vita\b)/i.test(C) &&
                    "NetFront"))
        )
            G = [v];
        "IE" == C && (v = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ?
            ((C += " Mobile"),
                (F = "Windows Phone " + (/\+$/.test(v) ? v : v + ".x")),
                y.unshift("desktop mode")) :
            /\bWPDesktop\b/i.test(t) ?
            ((C = "IE Mobile"),
                (F = "Windows Phone 8.x"),
                y.unshift("desktop mode"),
                A || (A = (/\brv:([\d.]+)/.exec(t) || 0)[1])) :
            "IE" != C &&
            "Trident" == G &&
            (v = /\brv:([\d.]+)/.exec(t)) &&
            (C && y.push("identifying as " + C + (A ? " " + A : "")),
                (C = "IE"),
                (A = v[1]));
        if (Q) {
            if (m(w, "global"))
                if (
                    (R &&
                        ((v = R.lang.System),
                            (U = v.getProperty("os.arch")),
                            (F =
                                F ||
                                v.getProperty("os.name") +
                                " " +
                                v.getProperty("os.version"))),
                        W)
                ) {
                    try {
                        (A = w.require("ringo/engine").version.join(".")),
                        (C = "RingoJS");
                    } catch (L) {
                        (v = w.system) &&
                        v.global.system == w.system &&
                            ((C = "Narwhal"), F || (F = v[0].os || null));
                    }
                    C || (C = "Rhino");
                } else
                    "object" == typeof w.process &&
                    !w.process.browser &&
                    (v = w.process) &&
                    ("object" == typeof v.versions &&
                        ("string" == typeof v.versions.electron ?
                            (y.push("Node " + v.versions.node),
                                (C = "Electron"),
                                (A = v.versions.electron)) :
                            "string" == typeof v.versions.nw &&
                            (y.push(
                                    "Chromium " + A,
                                    "Node " + v.versions.node
                                ),
                                (C = "NW.js"),
                                (A = v.versions.nw))),
                        C ||
                        ((C = "Node.js"),
                            (U = v.arch),
                            (F = v.platform),
                            (A = (A = /[\d.]+/.exec(v.version)) ?
                                A[0] :
                                null)));
            else
                e((v = w.runtime)) == S ?
                ((C = "Adobe AIR"), (F = v.flash.system.Capabilities.os)) :
                e((v = w.phantom)) == ba ?
                ((C = "PhantomJS"),
                    (A =
                        (v = v.version || null) &&
                        v.major + "." + v.minor + "." + v.patch)) :
                "number" == typeof X.documentMode &&
                (v = /\bTrident\/(\d+)/i.exec(t)) ?
                ((A = [A, X.documentMode]),
                    (v = +v[1] + 4) != A[1] &&
                    (y.push("IE " + A[1] + " mode"),
                        G && (G[1] = ""),
                        (A[1] = v)),
                    (A = "IE" == C ? String(A[1].toFixed(1)) : A[0])) :
                "number" == typeof X.documentMode &&
                /^(?:Chrome|Firefox)\b/.test(C) &&
                (y.push("masking as " + C + " " + A),
                    (C = "IE"),
                    (A = "11.0"),
                    (G = ["Trident"]),
                    (F = "Windows"));
            F = F && c(F);
        }
        A &&
            (v =
                /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) ||
                /(?:alpha|beta)(?: ?\d)?/i.exec(
                    t + ";" + (Q && E.appMinorVersion)
                ) ||
                (/\bMinefield\b/i.test(t) && "a")) &&
            ((V = /b/i.test(v) ? "beta" : "alpha"),
                (A =
                    A.replace(RegExp(v + "\\+?$"), "") +
                    ("beta" == V ? da : ca) +
                    (/\d+\+?/.exec(v) || "")));
        if (
            "Fennec" == C ||
            ("Firefox" == C && /\b(?:Android|Firefox OS)\b/.test(F))
        )
            C = "Firefox Mobile";
        else if ("Maxthon" == C && A) A = A.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(H))
            "Xbox 360" == H && (F = null),
            "Xbox 360" == H &&
            /\bIEMobile\b/.test(t) &&
            y.unshift("mobile mode");
        else if (
            (!/^(?:Chrome|IE|Opera)$/.test(C) &&
                (!C || H || /Browser|Mobi/.test(C))) ||
            ("Windows CE" != F && !/Mobi/i.test(t))
        )
            if ("IE" == C && Q)
                try {
                    null === w.external && y.unshift("platform preview");
                } catch (L) {
                    y.unshift("embedded");
                }
            else
                (/\bBlackBerry\b/.test(H) || /\bBB10\b/.test(t)) &&
                (v =
                    (RegExp(H.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(
                        t
                    ) || 0)[1] || A) ?
                ((v = [v, /BB10/.test(t)]),
                    (F =
                        (v[1] ?
                            ((H = null), (N = "BlackBerry")) :
                            "Device Software") +
                        " " +
                        v[0]),
                    (A = null)) :
                this != b &&
                "Wii" != H &&
                ((Q && P) ||
                    (/Opera/.test(C) &&
                        /\b(?:MSIE|Firefox)\b/i.test(t)) ||
                    ("Firefox" == C && /\bOS X (?:\d+\.){2,}/.test(F)) ||
                    ("IE" == C &&
                        ((F && !/^Win/.test(F) && 5.5 < A) ||
                            (/\bWindows XP\b/.test(F) && 8 < A) ||
                            (8 == A && !/\bTrident\b/.test(t))))) &&
                !p.test((v = r.call(b, t.replace(p, "") + ";"))) &&
                v.name &&
                ((v =
                        "ing as " +
                        v.name +
                        ((v = v.version) ? " " + v : "")),
                    p.test(C) ?
                    (/\bIE\b/.test(v) && "Mac OS" == F && (F = null),
                        (v = "identify" + v)) :
                    ((v = "mask" + v),
                        (C = T ?
                            c(T.replace(/([a-z])([A-Z])/g, "$1 $2")) :
                            "Opera"),
                        /\bIE\b/.test(v) && (F = null),
                        Q || (A = null)),
                    (G = ["Presto"]),
                    y.push(v));
        else C += " Mobile";
        if ((v = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1])) {
            v = [parseFloat(v.replace(/\.(\d)$/, ".0$1")), v];
            if ("Safari" == C && "+" == v[1].slice(-1))
                (C = "WebKit Nightly"), (V = "alpha"), (A = v[1].slice(0, -1));
            else if (
                A == v[1] ||
                A == (v[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])
            )
                A = null;
            v[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1];
            537.36 == v[0] &&
                537.36 == v[2] &&
                28 <= parseFloat(v[1]) &&
                "WebKit" == G &&
                (G = ["Blink"]);
            Q && (K || v[1]) ?
                (G && (G[1] = "like Chrome"),
                    (v =
                        v[1] ||
                        ((v = v[0]),
                            530 > v ?
                            1 :
                            532 > v ?
                            2 :
                            532.05 > v ?
                            3 :
                            533 > v ?
                            4 :
                            534.03 > v ?
                            5 :
                            534.07 > v ?
                            6 :
                            534.1 > v ?
                            7 :
                            534.13 > v ?
                            8 :
                            534.16 > v ?
                            9 :
                            534.24 > v ?
                            10 :
                            534.3 > v ?
                            11 :
                            535.01 > v ?
                            12 :
                            535.02 > v ?
                            "13+" :
                            535.07 > v ?
                            15 :
                            535.11 > v ?
                            16 :
                            535.19 > v ?
                            17 :
                            536.05 > v ?
                            18 :
                            536.1 > v ?
                            19 :
                            537.01 > v ?
                            20 :
                            537.11 > v ?
                            "21+" :
                            537.13 > v ?
                            23 :
                            537.18 > v ?
                            24 :
                            537.24 > v ?
                            25 :
                            537.36 > v ?
                            26 :
                            "Blink" != G ?
                            "27" :
                            "28"))) :
                (G && (G[1] = "like Safari"),
                    (v =
                        ((v = v[0]),
                            400 > v ?
                            1 :
                            500 > v ?
                            2 :
                            526 > v ?
                            3 :
                            533 > v ?
                            4 :
                            534 > v ?
                            "4+" :
                            535 > v ?
                            5 :
                            537 > v ?
                            6 :
                            538 > v ?
                            7 :
                            601 > v ?
                            8 :
                            "8")));
            G &&
                (G[1] +=
                    " " +
                    (v +=
                        "number" == typeof v ?
                        ".x" :
                        /[.+]/.test(v) ?
                        "" :
                        "+"));
            "Safari" == C && (!A || 45 < parseInt(A)) && (A = v);
        }
        "Opera" == C && (v = /\bzbov|zvav$/.exec(F)) ?
            ((C += " "),
                y.unshift("desktop mode"),
                "zvav" == v ? ((C += "Mini"), (A = null)) : (C += "Mobile"),
                (F = F.replace(RegExp(" *" + v + "$"), ""))) :
            "Safari" == C &&
            /\bChrome\b/.exec(G && G[1]) &&
            (y.unshift("desktop mode"),
                (C = "Chrome Mobile"),
                (A = null),
                /\bOS X\b/.test(F) ?
                ((N = "Apple"), (F = "iOS 4.3+")) :
                (F = null));
        A &&
            0 == A.indexOf((v = /[\d.]+$/.exec(F))) &&
            -1 < t.indexOf("/" + v + "-") &&
            (F = String(F.replace(v, "")).replace(/^ +| +$/g, ""));
        G &&
            !/\b(?:Avant|Nook)\b/.test(C) &&
            (/Browser|Lunascape|Maxthon/.test(C) ||
                ("Safari" != C && /^iOS/.test(F) && /\bSafari\b/.test(G[1])) ||
                (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
                        C
                    ) &&
                    G[1])) &&
            (v = G[G.length - 1]) &&
            y.push(v);
        y.length && (y = ["(" + y.join("; ") + ")"]);
        N && H && 0 > H.indexOf(N) && y.push("on " + N);
        H && y.push((/^on /.test(y[y.length - 1]) ? "" : "on ") + H);
        if (F) {
            var aa =
                (v = / ([\d.+]+)$/.exec(F)) &&
                "/" == F.charAt(F.length - v[0].length - 1);
            F = {
                architecture: 32,
                family: v && !aa ? F.replace(v[0], "") : F,
                version: v ? v[1] : null,
                toString: function() {
                    var L = this.version;
                    return (
                        this.family +
                        (L && !aa ? " " + L : "") +
                        (64 == this.architecture ? " 64-bit" : "")
                    );
                },
            };
        }
        (v = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(U)) && !/\bi686\b/i.test(U) ?
            (F &&
                ((F.architecture = 64),
                    (F.family = F.family.replace(RegExp(" *" + v), ""))),
                C &&
                (/\bWOW64\b/i.test(t) ||
                    (Q &&
                        /\w(?:86|32)$/.test(E.cpuClass || E.platform) &&
                        !/\bWin64; x64\b/i.test(t))) &&
                y.unshift("32-bit")) :
            F &&
            /^OS X/.test(F.family) &&
            "Chrome" == C &&
            39 <= parseFloat(A) &&
            (F.architecture = 64);
        t || (t = null);
        w = {};
        w.description = t;
        w.layout = G && G[0];
        w.manufacturer = N;
        w.name = C;
        w.prerelease = V;
        w.product = H;
        w.ua = t;
        w.version = C && A;
        w.os = F || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null";
            },
        };
        w.parse = r;
        w.toString = function() {
            return this.description || "";
        };
        w.version && y.unshift(A);
        w.name && y.unshift(C);
        F &&
            C &&
            (F != String(F).split(" ")[0] || (F != C.split(" ")[0] && !H)) &&
            y.push(H ? "(" + F + ")" : "on " + F);
        y.length && (w.description = y.join(" "));
        return w;
    }
    var g = { function: !0, object: !0 },
        h = (g[typeof window] && window) || this,
        l = g[typeof exports] && exports;
    g = g[typeof module] && module && !module.nodeType && module;
    var n = l && g && "object" == typeof global && global;
    !n || (n.global !== n && n.window !== n && n.self !== n) || (h = n);
    var q = Math.pow(2, 53) - 1,
        p = /\bOpera/;
    n = Object.prototype;
    var u = n.hasOwnProperty,
        x = n.toString,
        B = r();
    "function" == typeof define && "object" == typeof define.amd && define.amd ?
        ((h.platform = B),
            define(function() {
                return B;
            })) :
        l && g ?
        b(B, function(t, D) {
            l[D] = t;
        }) :
        (h.platform = B);
}).call(this);
var s_iScaleFactor = 1,
    s_oCanvasLeft,
    s_oCanvasTop,
    s_iOffsetX = 0,
    s_iOffsetY = 0,
    s_bIsIphone = !1,
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

function isChrome() {
    return (
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor)
    );
}

function isIOS() {
    var a =
        "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(
            ";"
        );
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone"))
        return (s_bIsIphone = !0);
    for (; a.length;)
        if (navigator.platform === a.pop()) return !0;
    return (s_bIsIphone = !1);
}

function getSize(a) {
    var k = a.toLowerCase(),
        c = window.document,
        b = c.documentElement;
    if (void 0 === window["inner" + a]) a = b["client" + a];
    else if (window["inner" + a] != b["client" + a]) {
        var e = c.createElement("body");
        e.id = "vpw-test-b";
        e.style.cssText = "overflow:scroll";
        var m = c.createElement("div");
        m.id = "vpw-test-d";
        m.style.cssText = "position:absolute;top:-1000px";
        m.innerHTML =
            "<style>@media(" +
            k +
            ":" +
            b["client" + a] +
            "px){body#vpw-test-b div#vpw-test-d{" +
            k +
            ":7px!important}}</style>";
        e.appendChild(m);
        b.insertBefore(e, c.head);
        a = 7 == m["offset" + a] ? b["client" + a] : window["inner" + a];
        b.removeChild(e);
    } else a = window["inner" + a];
    return a;
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler();
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
    return isIpad() ? !0 : jQuery.browser.mobile;
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a =
            null !== platform.name && "safari" === platform.name.toLowerCase() ?
            getIOSWindowHeight() :
            getSize("Height");
        var k = getSize("Width");
        s_bFocus && _checkOrientation(k, a);
        var c = Math.min(a / CANVAS_HEIGHT, k / CANVAS_WIDTH),
            b = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var e = a - c;
            c += e;
            b += (CANVAS_WIDTH / CANVAS_HEIGHT) * e;
        } else
            b < k &&
            ((e = k - b),
                (b += e),
                (c += (CANVAS_HEIGHT / CANVAS_WIDTH) * e));
        e = a / 2 - c / 2;
        var m = k / 2 - b / 2,
            f = CANVAS_WIDTH / b;
        if (m * f < -EDGEBOARD_X || e * f < -EDGEBOARD_Y)
            (c = Math.min(
                a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
                k / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
            )),
            (b = Math.round(CANVAS_WIDTH * c)),
            (c = Math.round(CANVAS_HEIGHT * c)),
            (e = (a - c) / 2),
            (m = (k - b) / 2),
            (f = CANVAS_WIDTH / b);
        s_iOffsetX = -1 * m * f;
        s_iOffsetY = -1 * e * f;
        0 <= e && (s_iOffsetY = 0);
        0 <= m && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos();
        null !== s_oMenu && s_oMenu.refreshButtonPos();
        null !== s_oBetPanel && s_oBetPanel.refreshButtonPos();
        s_bIsIphone
            ?
            ((canvas = document.getElementById("canvas")),
                (s_oStage.canvas.width = 2 * b),
                (s_oStage.canvas.height = 2 * c),
                (canvas.style.width = b + "px"),
                (canvas.style.height = c + "px"),
                (s_iScaleFactor =
                    2 * Math.min(b / CANVAS_WIDTH, c / CANVAS_HEIGHT)),
                (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor)) :
            s_bMobile ?
            ($("#canvas").css("width", b + "px"),
                $("#canvas").css("height", c + "px")) :
            ((s_oStage.canvas.width = b),
                (s_oStage.canvas.height = c),
                (s_iScaleFactor = Math.min(b / CANVAS_WIDTH, c / CANVAS_HEIGHT)),
                (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
        0 > e || (e = (a - c) / 2);
        $("#canvas").css("top", e + "px");
        $("#canvas").css("left", m + "px");
        fullscreenHandler();
    }
}

function _checkOrientation(a, k) {
    s_bMobile &&
        ENABLE_CHECK_ORIENTATION &&
        (a > k ?
            "landscape" ===
            $(".orientation-msg-container").attr("data-orientation") ?
            ($(".orientation-msg-container").css("display", "none"),
                s_oMain.startUpdate()) :
            ($(".orientation-msg-container").css("display", "block"),
                s_oMain.stopUpdate()) :
            "portrait" ===
            $(".orientation-msg-container").attr("data-orientation") ?
            ($(".orientation-msg-container").css("display", "none"),
                s_oMain.startUpdate()) :
            ($(".orientation-msg-container").css("display", "block"),
                s_oMain.stopUpdate()));
}

function createBitmap(a, k, c) {
    var b = new createjs.Bitmap(a),
        e = new createjs.Shape();
    k && c ?
        e.graphics.beginFill("#fff").drawRect(0, 0, k, c) :
        e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    b.hitArea = e;
    return b;
}

function createSprite(a, k, c, b, e, m) {
    a = null !== k ? new createjs.Sprite(a, k) : new createjs.Sprite(a);
    k = new createjs.Shape();
    k.graphics.beginFill("#000000").drawRect(-c, -b, e, m);
    a.hitArea = k;
    return a;
}

function randomFloatBetween(a, k, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (k - a), k).toFixed(c));
}

function formatTime(a) {
    a /= 1e3;
    var k = Math.floor(a / 60);
    a = Math.floor(a - 60 * k);
    var c = "";
    c = 10 > k ? c + ("0" + k + ":") : c + (k + ":");
    return 10 > a ? c + ("0" + a) : c + a;
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1);
}

function shuffle(a) {
    for (var k = a.length, c, b; 0 < k;)
        (b = Math.floor(Math.random() * k)),
        k--,
        (c = a[k]),
        (a[k] = a[b]),
        (a[b] = c);
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
            var k = document.createEvent("MouseEvents");
            k.initEvent("click", !0, !0);
            a.dispatchEvent(k);
        }
    },
};

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
    for (
        var k = window.location.search.substring(1).split("&"), c = 0; c < k.length; c++
    ) {
        var b = k[c].split("=");
        if (b[0] == a) return b[1];
    }
}
Array.prototype.sortOn = function() {
    var a = this.slice();
    if (!arguments.length) return a.sort();
    var k = Array.prototype.slice.call(arguments);
    return a.sort(function(c, b) {
        for (var e = k.slice(), m = e.shift(); c[m] == b[m] && e.length;)
            m = e.shift();
        return c[m] == b[m] ? 0 : c[m] > b[m] ? 1 : -1;
    });
};

function playSound(a, k, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ?
        (s_aSounds[a].play(),
            s_aSounds[a].volume(k),
            s_aSounds[a].loop(c),
            s_aSounds[a]) :
        null;
}

function stopSound(a) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, k) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(k);
}

function setMute(a, k) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(k);
}

function pauseSound(a) {
    s_aSounds[a].pause();
}

function easeLinear(a, k, c, b) {
    return (c * a) / b + k;
}

function collisionWithCircle(a, k, c) {
    var b = a.getX() - k.getX(),
        e = a.getY() - k.getY();
    return Math.sqrt(b * b + e * e) <
        a.getCollision() * c + k.getCollision() * c ?
        !0 :
        !1;
}
(function() {
    function a(c) {
        var b = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden",
        };
        c = c || window.event;
        c.type in b ?
            (document.body.className = b[c.type]) :
            ((document.body.className = this[k] ? "hidden" : "visible"),
                "hidden" === document.body.className ?
                (s_oMain.stopUpdate(), (s_bFocus = !1)) :
                (s_oMain.startUpdate(), (s_bFocus = !0)));
    }
    var k = "hidden";
    k in document ?
        document.addEventListener("visibilitychange", a) :
        (k = "mozHidden") in document ?
        document.addEventListener("mozvisibilitychange", a) :
        (k = "webkitHidden") in document ?
        document.addEventListener("webkitvisibilitychange", a) :
        (k = "msHidden") in document ?
        document.addEventListener("msvisibilitychange", a) :
        "onfocusin" in document ?
        (document.onfocusin = document.onfocusout = a) :
        (window.onpageshow =
            window.onpagehide =
            window.onfocus =
            window.onblur =
            a);
})();

function fullscreenHandler() {
    ENABLE_FULLSCREEN &&
        !1 !== screenfull.isEnabled &&
        ((s_bFullscreen = screenfull.isFullscreen),
            null !== s_oInterface && s_oInterface.resetFullscreenBut(),
            null !== s_oMenu && s_oMenu.resetFullscreenBut(),
            null !== s_oBetPanel && s_oBetPanel.resetFullscreenBut());
}
if (screenfull.isEnabled)
    screenfull.on("change", function() {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut();
        null !== s_oBetPanel && s_oBetPanel.resetFullscreenBut();
    });

function CSpriteLibrary() {
    var a = {},
        k,
        c,
        b,
        e,
        m,
        f;
    this.init = function(d, r, g) {
        k = {};
        b = c = 0;
        e = d;
        m = r;
        f = g;
    };
    this.addSprite = function(d, r) {
        if (!a.hasOwnProperty(d)) {
            var g = new Image();
            a[d] = k[d] = { szPath: r, oSprite: g, bLoaded: !1 };
            c++;
        }
    };
    this.getSprite = function(d) {
        return a.hasOwnProperty(d) ? a[d].oSprite : null;
    };
    this._onSpritesLoaded = function() {
        c = 0;
        m.call(f);
    };
    this._onSpriteLoaded = function() {
        e.call(f);
        ++b === c && this._onSpritesLoaded();
    };
    this.loadSprites = function() {
        for (var d in k)
            (k[d].oSprite.oSpriteLibrary = this),
            (k[d].oSprite.szKey = d),
            (k[d].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey);
            }),
            (k[d].oSprite.onerror = function(r) {
                var g = r.currentTarget;
                setTimeout(function() {
                    k[g.szKey].oSprite.src = k[g.szKey].szPath;
                }, 500);
            }),
            (k[d].oSprite.src = k[d].szPath);
    };
    this.setLoaded = function(d) {
        a[d].bLoaded = !0;
    };
    this.isLoaded = function(d) {
        return a[d].bLoaded;
    };
    this.getNumSprites = function() {
        return c;
    };
}
var CANVAS_WIDTH = 1216,
    CANVAS_HEIGHT = 832,
    EDGEBOARD_X = 40,
    EDGEBOARD_Y = 172,
    FPS = 30,
    FPS_TIME = 1e3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    PRIMARY_FONT = "impactregular",
    SECONDARY_FONT = "ds-digitalbold",
    TERTIARY_FONT = "motorwerkregular",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_BET_PANEL = 2,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    FICHE_WIDTH = 44,
    COLOR_FICHES = "#ff7706 #ffb600 #000 #06a800 #d50000 #444444".split(" "),
    CHIP_VALUES,
    BET_PANEL_X = 40,
    BET_PANEL_Y = 165,
    BET_PANEL_WIDTH,
    BET_PANEL_HEIGHT,
    HORSE_WIDTH = 326,
    HORSE_HEIGHT = 212,
    NUM_CHIPS,
    NUM_HORSES,
    MIN_BET,
    MAX_BET,
    WIN_OCCURRENCE,
    NUM_TRACK_BG = 397,
    ARRIVAL_X = 477,
    TIME_CHECK_RANK = 2e3,
    HORSE_DATA = {
        horse_names: "engineer;pin;doughnut;mayhem;last things;chatterbox;hypno;croquette".split(
            ";"
        ),
        odd_win_bet: [3.7, 5.5, 2.2, 11.75, 17.25, 8.75, 7.15, 6.15],
        odd_place_bet: [1.95, 2.55, 1.25, 5.5, 7.75, 3.05, 2.5, 2.05],
        odd_show_bet: [1.25, 1.7, 1.09, 2.55, 4, 1.75, 1.55, 1.35],
        forecast: [
            { first: 1, second: 2, odd: 20 },
            { first: 1, second: 3, odd: 6.25 },
            { first: 1, second: 4, odd: 60 },
            { first: 1, second: 5, odd: 80 },
            { first: 1, second: 6, odd: 23 },
            { first: 1, second: 7, odd: 20 },
            { first: 1, second: 8, odd: 15 },
            { first: 2, second: 1, odd: 28 },
            { first: 2, second: 3, odd: 10.25 },
            { first: 2, second: 4, odd: 65 },
            { first: 2, second: 5, odd: 68 },
            { first: 2, second: 6, odd: 58 },
            { first: 2, second: 7, odd: 42 },
            { first: 2, second: 8, odd: 32 },
            { first: 3, second: 1, odd: 5.75 },
            { first: 3, second: 2, odd: 8.75 },
            { first: 3, second: 4, odd: 26 },
            { first: 3, second: 5, odd: 31 },
            { first: 3, second: 6, odd: 19 },
            { first: 3, second: 7, odd: 15 },
            { first: 3, second: 8, odd: 10 },
            { first: 4, second: 1, odd: 84 },
            { first: 4, second: 2, odd: 56 },
            { first: 4, second: 3, odd: 23 },
            { first: 4, second: 5, odd: 80 },
            { first: 4, second: 6, odd: 65 },
            { first: 4, second: 7, odd: 55 },
            { first: 4, second: 8, odd: 40 },
            { first: 5, second: 1, odd: 70 },
            { first: 5, second: 2, odd: 70 },
            { first: 5, second: 3, odd: 68 },
            { first: 5, second: 4, odd: 84 },
            { first: 5, second: 6, odd: 80 },
            { first: 5, second: 7, odd: 70 },
            { first: 5, second: 8, odd: 50 },
            { first: 6, second: 1, odd: 48 },
            { first: 6, second: 2, odd: 58 },
            { first: 6, second: 3, odd: 13 },
            { first: 6, second: 4, odd: 70 },
            { first: 6, second: 5, odd: 80 },
            { first: 6, second: 7, odd: 55 },
            { first: 6, second: 8, odd: 40 },
            { first: 7, second: 1, odd: 40 },
            { first: 7, second: 2, odd: 50 },
            { first: 7, second: 3, odd: 10 },
            { first: 7, second: 4, odd: 50 },
            { first: 7, second: 5, odd: 55 },
            { first: 7, second: 6, odd: 40 },
            { first: 7, second: 8, odd: 35 },
            { first: 8, second: 1, odd: 38 },
            { first: 8, second: 2, odd: 48 },
            { first: 8, second: 3, odd: 8 },
            { first: 8, second: 4, odd: 50 },
            { first: 8, second: 5, odd: 40 },
            { first: 8, second: 6, odd: 35 },
            { first: 8, second: 7, odd: 30 },
        ],
    },
    ENABLE_FULLSCREEN,
    ENABLE_CHECK_ORIENTATION,
    SHOW_CREDITS,
    SOUNDTRACK_VOLUME_IN_GAME = 1;

function CGameSettings(a) {
    var k, c, b, e, m, f, d, r, g;
    this._init = function(h) {
        g = h;
        h = g.horse_names;
        NUM_HORSES = h.length;
        k = [];
        for (var l = 0; l < NUM_HORSES; l++) k[l] = h[l];
        this._initSimpleOdd();
        this._initForecastOdd();
        this._initPaths();
        this._initHorseInfo();
        f = CHIP_VALUES;
    };
    this._initSimpleOdd = function() {
        var h = g.odd_win_bet,
            l = g.odd_place_bet,
            n = g.odd_show_bet;
        c = [];
        b = [];
        e = [];
        for (var q = 0; q < h.length; q++)
            (c[q] = h[q]), (b[q] = l[q]), (e[q] = n[q]);
    };
    this._initForecastOdd = function() {
        var h = g.forecast;
        m = [];
        for (var l = 0; l < NUM_HORSES; l++) m[l] = [];
        for (l = 0; l < h.length; l++)
            m[h[l].first - 1][h[l].second - 1] = h[l].odd;
    };
    this._initPaths = function() {
        d = [];
        var h = [
                { x: 230, frame: 30 },
                { x: 500, frame: 160 },
                { x: 600, frame: 190 },
                { x: 400, frame: 200 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 210 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
            ],
            l = [
                { x: 250, frame: 30 },
                { x: 600, frame: 180 },
                { x: 650, frame: 190 },
                { x: 450, frame: 180 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 210 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
            ],
            n = [
                { x: 170, frame: 30 },
                { x: 400, frame: 130 },
                { x: 450, frame: 220 },
                { x: 400, frame: 140 },
                { x: 300, frame: 130 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 250, frame: 140 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
            ],
            q = [
                { x: 190, frame: 30 },
                { x: 340, frame: 130 },
                { x: 360, frame: 310 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 390, frame: 320 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
            ],
            p = [
                { x: 220, frame: 30 },
                { x: 350, frame: 260 },
                { x: 480, frame: 200 },
                { x: 320, frame: 100 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 450, frame: 200 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
            ],
            u = [
                { x: 210, frame: 30 },
                { x: 260, frame: 270 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 600, frame: 490 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
            ],
            x = [
                { x: 220, frame: 30 },
                { x: 290, frame: 270 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 800, frame: 490 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
            ],
            B = [
                { x: 190, frame: 30 },
                { x: 200, frame: 270 },
                { x: ARRIVAL_X - HORSE_WIDTH / 2 - 1e3, frame: 490 },
                { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
            ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 230, frame: 30 },
            { x: 450, frame: 180 },
            { x: 500, frame: 170 },
            { x: 400, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 210 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 30 },
            { x: 600, frame: 200 },
            { x: 550, frame: 180 },
            { x: 350, frame: 170 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 200, frame: 210 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 170, frame: 30 },
            { x: 250, frame: 150 },
            { x: 350, frame: 210 },
            { x: 450, frame: 140 },
            { x: 350, frame: 120 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 350, frame: 140 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 190, frame: 30 },
            { x: 300, frame: 150 },
            { x: 360, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 490, frame: 310 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 30 },
            { x: 350, frame: 280 },
            { x: 400, frame: 180 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 30 },
            { x: 160, frame: 280 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 700, frame: 480 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 220, frame: 30 },
            { x: 200, frame: 270 },
            { x: -70, frame: 190 },
            { x: 20, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 850, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 210, frame: 30 },
            { x: 0, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 900, frame: 470 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 230, frame: 30 },
            { x: 500, frame: 180 },
            { x: 600, frame: 180 },
            { x: 600, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 30 },
            { x: 600, frame: 200 },
            { x: 650, frame: 180 },
            { x: 500, frame: 180 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 170, frame: 30 },
            { x: 400, frame: 150 },
            { x: 450, frame: 210 },
            { x: 300, frame: 140 },
            { x: 350, frame: 130 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 300, frame: 130 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 190, frame: 30 },
            { x: 340, frame: 150 },
            { x: 360, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 460, frame: 310 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 30 },
            { x: 350, frame: 280 },
            { x: 480, frame: 180 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 550, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 30 },
            { x: 200, frame: 280 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 560, frame: 480 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 200, frame: 30 },
            { x: 100, frame: 270 },
            { x: 80, frame: 190 },
            { x: 20, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 850, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 210, frame: 30 },
            { x: 20, frame: 280 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 1e3, frame: 480 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 330, frame: 30 },
            { x: 450, frame: 180 },
            { x: 550, frame: 170 },
            { x: 650, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 210 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 30 },
            { x: 350, frame: 200 },
            { x: 450, frame: 180 },
            { x: 600, frame: 170 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 210 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 30 },
            { x: 400, frame: 150 },
            { x: 450, frame: 200 },
            { x: 600, frame: 140 },
            { x: 500, frame: 130 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 350, frame: 140 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 290, frame: 30 },
            { x: 340, frame: 150 },
            { x: 360, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 510, frame: 310 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 30 },
            { x: 150, frame: 280 },
            { x: 400, frame: 180 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 550, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 30 },
            { x: 60, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 470 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 220, frame: 30 },
            { x: 90, frame: 280 },
            { x: 420, frame: 180 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 850, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 210, frame: 30 },
            { x: 120, frame: 280 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 900, frame: 480 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 230, frame: 30 },
            { x: 350, frame: 180 },
            { x: 400, frame: 170 },
            { x: 600, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 210 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 30 },
            { x: 350, frame: 200 },
            { x: 450, frame: 170 },
            { x: 500, frame: 180 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 210 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 30 },
            { x: 400, frame: 150 },
            { x: 450, frame: 200 },
            { x: 600, frame: 140 },
            { x: 500, frame: 130 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 250, frame: 140 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 190, frame: 30 },
            { x: 340, frame: 140 },
            { x: 360, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 390, frame: 320 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 30 },
            { x: 350, frame: 270 },
            { x: 400, frame: 190 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 550, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 30 },
            { x: 260, frame: 280 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 480 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 240, frame: 30 },
            { x: 350, frame: 270 },
            { x: 400, frame: 190 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 750, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 180, frame: 30 },
            { x: 260, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050, frame: 470 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 230, frame: 50 },
            { x: 350, frame: 200 },
            { x: 400, frame: 100 },
            { x: 500, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 240 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 100 },
            { x: 350, frame: 150 },
            { x: 450, frame: 140 },
            { x: 500, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 50 },
            { x: 400, frame: 140 },
            { x: 450, frame: 200 },
            { x: 400, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 250, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 190, frame: 30 },
            { x: 340, frame: 160 },
            { x: 360, frame: 300 },
            { x: 380, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 390, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 100 },
            { x: 350, frame: 200 },
            { x: 400, frame: 190 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 550, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 50 },
            { x: 260, frame: 300 },
            { x: 300, frame: 190 },
            { x: 220, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 150 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 200, frame: 100 },
            { x: 300, frame: 200 },
            { x: 400, frame: 190 },
            { x: 300, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 750, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 230, frame: 50 },
            { x: 280, frame: 290 },
            { x: 300, frame: 200 },
            { x: 240, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 780, frame: 150 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 230, frame: 50 },
            { x: 430, frame: 320 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 420 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 100 },
            { x: 350, frame: 150 },
            { x: 450, frame: 140 },
            { x: 500, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 250, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 50 },
            { x: 200, frame: 140 },
            { x: 450, frame: 400 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 350, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 190, frame: 30 },
            { x: 240, frame: 160 },
            { x: 360, frame: 300 },
            { x: 380, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 490, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 100 },
            { x: 350, frame: 200 },
            { x: 400, frame: 190 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 50 },
            { x: 260, frame: 300 },
            { x: 300, frame: 210 },
            { x: 220, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 750, frame: 130 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 260, frame: 100 },
            { x: 350, frame: 200 },
            { x: 300, frame: 190 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 850, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 10, frame: 50 },
            { x: 260, frame: 270 },
            { x: 300, frame: 200 },
            { x: 200, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 950, frame: 170 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 230, frame: 50 },
            { x: 250, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 50 },
            { x: 430, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 250, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 50 },
            { x: 330, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 450, frame: 450 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 190, frame: 50 },
            { x: 230, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 590, frame: 450 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 50 },
            { x: 300, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 450 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 210, frame: 50 },
            { x: 130, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 750, frame: 450 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 180, frame: 50 },
            { x: 280, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 800, frame: 450 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 190, frame: 50 },
            { x: 150, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 950, frame: 450 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 210, frame: 50 },
            { x: 130, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 220, frame: 50 },
            { x: 300, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 50 },
            { x: 330, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 250, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 250, frame: 50 },
            { x: 430, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 390, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 190, frame: 50 },
            { x: 190, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 550, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 230, frame: 50 },
            { x: 250, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 190, frame: 50 },
            { x: 220, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 950, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 200, frame: 50 },
            { x: 250, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 1e3, frame: 440 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
        h = [
            { x: 330, frame: 30 },
            { x: 450, frame: 180 },
            { x: 550, frame: 180 },
            { x: 650, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 30 },
        ];
        l = [
            { x: 250, frame: 90 },
            { x: 450, frame: 300 },
            { x: 600, frame: 200 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 150, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 35 },
        ];
        n = [
            { x: 270, frame: 30 },
            { x: 400, frame: 150 },
            { x: 450, frame: 200 },
            { x: 600, frame: 140 },
            { x: 500, frame: 130 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 300, frame: 140 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 40 },
        ];
        q = [
            { x: 290, frame: 30 },
            { x: 340, frame: 150 },
            { x: 360, frame: 300 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 510, frame: 310 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 45 },
        ];
        p = [
            { x: 220, frame: 30 },
            { x: 350, frame: 280 },
            { x: 400, frame: 180 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 650, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 50 },
        ];
        u = [
            { x: 310, frame: 30 },
            { x: 400, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 750, frame: 470 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 55 },
        ];
        x = [
            { x: 240, frame: 30 },
            { x: 300, frame: 280 },
            { x: 350, frame: 180 },
            { x: 320, frame: 100 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 800, frame: 200 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 60 },
        ];
        B = [
            { x: 210, frame: 30 },
            { x: 300, frame: 290 },
            { x: ARRIVAL_X - HORSE_WIDTH / 2 - 850, frame: 470 },
            { x: CANVAS_WIDTH + HORSE_WIDTH, frame: 65 },
        ];
        d.push({
            place_1: h,
            place_2: l,
            place_3: n,
            place_4: q,
            place_5: p,
            place_6: u,
            place_7: x,
            place_8: B,
        });
    };
    this._initHorseInfo = function() {
        r = [];
        r[0] = { start: new createjs.Point(193, 350), scale: 0.53 };
        r[1] = { start: new createjs.Point(170, 360), scale: 0.59 };
        r[2] = { start: new createjs.Point(144, 372), scale: 0.65 };
        r[3] = { start: new createjs.Point(114, 385), scale: 0.71 };
        r[4] = { start: new createjs.Point(76, 400), scale: 0.78 };
        r[5] = { start: new createjs.Point(30, 415), scale: 0.85 };
        r[6] = { start: new createjs.Point(-10, 432), scale: 0.92 };
        r[7] = { start: new createjs.Point(-66, 452), scale: 1 };
    };
    this.getIndexForFiches = function(h) {
        for (var l = 0, n = 0; n < f.length; n++) f[n] === h && (l = n);
        return l;
    };
    this.getHorsePercentageArray = function() {
        for (var h = [], l = 0; l < c.length; l++)
            for (var n = Math.floor(c[l]), q = 0; q < n; q++) h.push(l);
        return (h = shuffle(h));
    };
    this.getHorseName = function(h) {
        return k[h];
    };
    this.getAllHorseNames = function() {
        return k;
    };
    this.getOddWin = function(h) {
        return c[h];
    };
    this.getOddPlace = function(h) {
        return b[h];
    };
    this.getOddShow = function(h) {
        return e[h];
    };
    this.getForecastOdd = function(h, l) {
        return m[h][l];
    };
    this.getRandomPath = function() {
        return d[Math.floor(Math.random() * d.length)];
    };
    this.getHorseInfo = function(h) {
        return r[h];
    };
    s_oGameSettings = this;
    this._init(a);
}
var s_oGameSettings = null;

function CPreloader() {
    var a, k, c, b, e, m, f, d, r, g;
    this._init = function() {
        s_oSpriteLibrary.init(
            this._onImagesLoaded,
            this._onAllImagesLoaded,
            this
        );
        s_oSpriteLibrary.addSprite(
            "progress_bar",
            "./games/horse_racing/sprites/progress_bar.png"
        );
        s_oSpriteLibrary.addSprite("200x200", "./games/horse_racing/sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./games/horse_racing/sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        g = new createjs.Container();
        s_oStage.addChild(g);
    };
    this.unload = function() {
        g.removeAllChildren();
        r.unload();
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady();
    };
    this.attachSprites = function() {
        var h = new createjs.Shape();
        h.graphics
            .beginFill("black")
            .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.addChild(h);
        h = s_oSpriteLibrary.getSprite("200x200");
        f = createBitmap(h);
        f.regX = 0.5 * h.width;
        f.regY = 0.5 * h.height;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 - 140;
        g.addChild(f);
        d = new createjs.Shape();
        d.graphics
            .beginFill("rgba(0,0,0,0.01)")
            .drawRoundRect(f.x - 100, f.y - 100, 200, 200, 10);
        g.addChild(d);
        f.mask = d;
        h = s_oSpriteLibrary.getSprite("progress_bar");
        b = createBitmap(h);
        b.x = CANVAS_WIDTH / 2 - h.width / 2;
        b.y = CANVAS_HEIGHT / 2 + 90;
        g.addChild(b);
        a = h.width;
        k = h.height;
        e = new createjs.Shape();
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(b.x, b.y, 1, k);
        g.addChild(e);
        b.mask = e;
        c = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 140;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        g.addChild(c);
        h = s_oSpriteLibrary.getSprite("but_start");
        r = new CTextButton(
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2 + 40,
            h,
            TEXT_PRELOADER_CONTINUE,
            "Arial",
            "#000",
            50,
            g
        );
        r.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        r.setVisible(!1);
        m = new createjs.Shape();
        m.graphics
            .beginFill("black")
            .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.addChild(m);
        createjs.Tween.get(m)
            .to({ alpha: 0 }, 500)
            .call(function() {
                createjs.Tween.removeTweens(m);
                g.removeChild(m);
            });
    };
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader();
    };
    this.refreshLoader = function(h) {
        c.text = h + "%";
        100 === h &&
            (s_oMain._onRemovePreloader(), (c.visible = !1), (b.visible = !1));
        e.graphics.clear();
        h = Math.floor((h * a) / 100);
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(b.x, b.y, h, k);
    };
    this._init();
}

function CMain(a) {
    var k,
        c = 0,
        b = 0,
        e = STATE_LOADING,
        m,
        f;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(10);
        s_iPrevTime = new Date().getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary();

        m = new CPreloader;
    };
    this.preloaderReady = function() {
        s_oGameSettings = new CGameSettings(HORSE_DATA);
        s_oBetList = new CBetList();
        s_oMain._loadImages();
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
        s_oMain._initSounds();
        k = !0;
    };
    this.soundLoaded = function() {
        c++;
        m.refreshLoader(Math.floor((c / b) * 100));
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "chip",
            loop: !1,
            volume: 1,
            ingamename: "chip",
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
            filename: "start_race",
            loop: !1,
            volume: 1,
            ingamename: "start_race",
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "photo",
            loop: !1,
            volume: 1,
            ingamename: "photo",
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack",
        });
        b += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var d = 0; d < s_aSoundsInfo.length; d++)
            this.tryToLoadSound(s_aSoundsInfo[d], !1);
    };
    this.tryToLoadSound = function(d, r) {
        setTimeout(
            function() {
                s_aSounds[d.ingamename] = new Howl({
                    src: [d.path + d.filename + ".mp3"],
                    autoplay: !1,
                    preload: !0,
                    loop: d.loop,
                    volume: d.volume,
                    onload: s_oMain.soundLoaded,
                    onloaderror: function(g, h) {
                        for (var l = 0; l < s_aSoundsInfo.length; l++)
                            if (
                                g ===
                                s_aSounds[s_aSoundsInfo[l].ingamename]
                                ._sounds[0]._id
                            ) {
                                s_oMain.tryToLoadSound(s_aSoundsInfo[l], !0);
                                break;
                            }
                    },
                    onplayerror: function(g) {
                        for (var h = 0; h < s_aSoundsInfo.length; h++)
                            if (
                                g ===
                                s_aSounds[s_aSoundsInfo[h].ingamename]
                                ._sounds[0]._id
                            ) {
                                s_aSounds[s_aSoundsInfo[h].ingamename].once(
                                    "unlock",
                                    function() {
                                        s_aSounds[
                                            s_aSoundsInfo[h].ingamename
                                        ].play();
                                        "soundtrack" ===
                                        s_aSoundsInfo[h].ingamename &&
                                            null !== s_oGame &&
                                            setVolume(
                                                "soundtrack",
                                                SOUNDTRACK_VOLUME_IN_GAME
                                            );
                                    }
                                );
                                break;
                            }
                    },
                });
            },
            r ? 200 : 0
        );
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(
            this._onImagesLoaded,
            this._onAllImagesLoaded,
            this
        );
        s_oSpriteLibrary.addSprite("bg_menu", "./games/horse_racing/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "./games/horse_racing/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./games/horse_racing/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_play", "./games/horse_racing/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart", "./games/horse_racing/sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home", "./games/horse_racing/sprites/but_home.png");
        s_oSpriteLibrary.addSprite("msg_box", "./games/horse_racing/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_credits", "./games/horse_racing/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./games/horse_racing/sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite(
            "but_fullscreen",
            "./games/horse_racing/sprites/but_fullscreen.png"
        );
        s_oSpriteLibrary.addSprite("but_no", "./games/horse_racing/sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes", "./games/horse_racing/sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("arrow_left", "./games/horse_racing/sprites/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right", "./games/horse_racing/sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("fiche_0", "./games/horse_racing/sprites/fiche_0.png");
        s_oSpriteLibrary.addSprite("fiche_1", "./games/horse_racing/sprites/fiche_1.png");
        s_oSpriteLibrary.addSprite("fiche_2", "./games/horse_racing/sprites/fiche_2.png");
        s_oSpriteLibrary.addSprite("fiche_3", "./games/horse_racing/sprites/fiche_3.png");
        s_oSpriteLibrary.addSprite("fiche_4", "./games/horse_racing/sprites/fiche_4.png");
        s_oSpriteLibrary.addSprite("fiche_5", "./games/horse_racing/sprites/fiche_5.png");
        s_oSpriteLibrary.addSprite(
            "bg_bet_panel",
            "./games/horse_racing/sprites/bg_bet_panel.jpg"
        );
        s_oSpriteLibrary.addSprite("money_panel", "./games/horse_racing/sprites/money_panel.png");
        s_oSpriteLibrary.addSprite(
            "simple_bet_panel",
            "./games/horse_racing/sprites/simple_bet_panel.png"
        );
        s_oSpriteLibrary.addSprite(
            "forecast_panel",
            "./games/horse_racing/sprites/forecast_panel.png"
        );
        s_oSpriteLibrary.addSprite("bet_place", "./games/horse_racing/sprites/bet_place.png");
        s_oSpriteLibrary.addSprite(
            "fiche_highlight",
            "./games/horse_racing/sprites/fiche_highlight.png"
        );
        s_oSpriteLibrary.addSprite("odd_bg", "./games/horse_racing/sprites/odd_bg.png");
        s_oSpriteLibrary.addSprite("rank_panel", "./games/horse_racing/sprites/rank_panel.png");
        s_oSpriteLibrary.addSprite(
            "panel_arrival",
            "./games/horse_racing/sprites/panel_arrival.png"
        );
        s_oSpriteLibrary.addSprite("bibs", "./games/horse_racing/sprites/bibs.png");
        s_oSpriteLibrary.addSprite("but_skip", "./games/horse_racing/sprites/but_skip.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./games/horse_racing/sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite(
            "but_start_race",
            "./games/horse_racing/sprites/but_start_race.png"
        );
        s_oSpriteLibrary.addSprite(
            "but_clear_bet",
            "./games/horse_racing/sprites/but_clear_bet.png"
        );
        s_oSpriteLibrary.addSprite("fiche_panel", "./games/horse_racing/sprites/fiche_panel.png");
        s_oSpriteLibrary.addSprite("fill_bar", "./games/horse_racing/sprites/fill_bar.png");
        s_oSpriteLibrary.addSprite("win_panel", "./games/horse_racing/sprites/win_panel.png");
        s_oSpriteLibrary.addSprite("lose_panel", "./games/horse_racing/sprites/lose_panel.png");
        for (var d = 0; d < NUM_HORSES; d++)
            s_oSpriteLibrary.addSprite(
                "bib_gui_" + d,
                "./games/horse_racing/sprites/bib_gui_" + d + ".png"
            ),
            s_oSpriteLibrary.addSprite(
                "horse_" + (d + 1) + "_a",
                "./games/horse_racing/sprites/horse_" + (d + 1) + "_a.png"
            ),
            s_oSpriteLibrary.addSprite(
                "horse_" + (d + 1) + "_b",
                "./games/horse_racing/sprites/horse_" + (d + 1) + "_b.png"
            ),
            s_oSpriteLibrary.addSprite(
                "cage_" + d,
                "./games/horse_racing/sprites/cage_" + d + ".png"
            ),
            s_oSpriteLibrary.addSprite(
                "gate_" + d,
                "./games/horse_racing/sprites/cage_gates/gate_" + d + ".png"
            );
        s_oSpriteLibrary.addSprite(
            "cage_" + NUM_HORSES,
            "./games/horse_racing/sprites/cage_" + NUM_HORSES + ".png"
        );
        s_oSpriteLibrary.addSprite(
            "gate_" + NUM_HORSES,
            "./games/horse_racing/sprites/cage_gates/gate_" + NUM_HORSES + ".png"
        );
        for (d = 0; d < NUM_TRACK_BG; d++)
            s_oSpriteLibrary.addSprite(
                "bg_track_" + d,
                "./games/horse_racing/sprites/bg_track/bg_track_" + d + ".jpg"
            );
        b += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    this._onImagesLoaded = function() {
        c++;
        m.refreshLoader(Math.floor((c / b) * 100));
    };
    this._onAllImagesLoaded = function() {};
    this._onRemovePreloader = function() {
        try {
            saveItem("ls_available", "ok");
        } catch (d) {
            s_bStorageAvailable = !1;
        }
        m.unload();
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu();
    };
    this.setMoney = function(d) {};
    this.gotoMenu = function() {
        new CMenu();
        e = STATE_MENU;
    };
    this.gotoBetPanel = function() {
        new CBetPanel();
        e = STATE_BET_PANEL;
        $(s_oMain).trigger("start_session");
    };
    this.gotoGame = function(d) {
        f = new CGame(d);
        e = STATE_GAME;
    };
    this.stopUpdate = function() {
        k = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
    };
    this.startUpdate = function() {
        s_iPrevTime = new Date().getTime();
        k = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
        s_bAudioActive &&
            Howler.mute(!1);
    };
    this._update = function(d) {
        if (!1 !== k) {
            var r = new Date().getTime();
            s_iTimeElaps = r - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = r;
            1e3 <= s_iCntTime &&
                ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
            e === STATE_GAME && f.update();
            s_oStage.update(d);
        }
    };
    s_oMain = this;
    s_iCurMoney = a.money;
    s_iGameCash = a.game_cash;
    CHIP_VALUES = a.chip_values;
    MIN_BET = a.min_bet;
    MAX_BET = a.max_bet;
    WIN_OCCURRENCE = a.win_occurrence;
    AD_SHOW_COUNTER = a.num_levels_for_ads;
    SHOW_CREDITS = a.show_credits;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    NUM_CHIPS = CHIP_VALUES.length;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer();
}
var s_bMobile,
    s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oStage,
    s_oMain,
    s_oSpriteLibrary,
    s_oSoundTrack = null,
    s_oCanvas,
    s_bStorageAvailable = !0,
    s_iCurMoney,
    s_iGameCash,
    s_iAdCounter = 0,
    s_aSounds;

function CTextButton(a, k, c, b, e, m, f, d) {
    var r, g, h, l, n, q, p, u, x, B;
    this._init = function(t, D, z, w, y, E, A) {
        r = !1;
        g = 1;
        h = [];
        l = [];
        B = createBitmap(z);
        u = new createjs.Container();
        u.x = t;
        u.y = D;
        u.regX = z.width / 2;
        u.regY = z.height / 2;
        s_bMobile || (u.cursor = "pointer");
        u.addChild(B, x);
        d.addChild(u);
        x = new CTLText(
            u,
            10,
            5,
            z.width - 20,
            z.height - 10,
            A,
            "center",
            E,
            y,
            1,
            0,
            0,
            w, !0, !0, !1, !1
        );
        this._initListener();
    };
    this.unload = function() {
        u.off("mousedown", n);
        u.off("pressup", q);
        d.removeChild(u);
    };
    this.setVisible = function(t) {
        u.visible = t;
    };
    this.setAlign = function(t) {
        x.textAlign = t;
    };
    this.setTextX = function(t) {
        x.x = t;
    };
    this.setScale = function(t) {
        g = u.scaleX = u.scaleY = t;
    };
    this.enable = function() {
        r = !1;
    };
    this.disable = function() {
        r = !0;
    };
    this._initListener = function() {
        n = u.on("mousedown", this.buttonDown);
        q = u.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(t, D, z) {
        h[t] = D;
        l[t] = z;
    };
    this.addEventListenerWithParams = function(t, D, z, w) {
        h[t] = D;
        l[t] = z;
        p = w;
    };
    this.buttonRelease = function() {
        r ||
            (playSound("click", 1, !1),
                (u.scaleX = g),
                (u.scaleY = g),
                h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(l[ON_MOUSE_UP], p));
    };
    this.buttonDown = function() {
        r ||
            ((u.scaleX = 0.9 * g),
                (u.scaleY = 0.9 * g),
                h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN]));
    };
    this.setPosition = function(t, D) {
        u.x = t;
        u.y = D;
    };
    this.tweenPosition = function(t, D, z, w, y, E, A) {
        createjs.Tween.get(u)
            .wait(w)
            .to({ x: t, y: D }, z, y)
            .call(function() {
                void 0 !== E && E.call(A);
            });
    };
    this.changeText = function(t) {
        x.refreshText(t);
    };
    this.setX = function(t) {
        u.x = t;
    };
    this.setY = function(t) {
        u.y = t;
    };
    this.getButtonImage = function() {
        return u;
    };
    this.getX = function() {
        return u.x;
    };
    this.getY = function() {
        return u.y;
    };
    this.getSprite = function() {
        return u;
    };
    this.getScale = function() {
        return u.scaleX;
    };
    this._init(a, k, c, b, e, m, f);
}

function CToggle(a, k, c, b, e) {
    var m, f, d, r, g, h, l;
    this._init = function(n, q, p, u, x) {
        l = void 0 !== x ? x : s_oStage;
        f = [];
        d = [];
        x = new createjs.SpriteSheet({
            images: [p],
            frames: {
                width: p.width / 2,
                height: p.height,
                regX: p.width / 2 / 2,
                regY: p.height / 2,
            },
            animations: { state_true: [0], state_false: [1] },
        });
        m = u;
        r = createSprite(
            x,
            "state_" + m,
            p.width / 2 / 2,
            p.height / 2,
            p.width / 2,
            p.height
        );
        r.x = n;
        r.y = q;
        r.stop();
        s_bMobile || (r.cursor = "pointer");
        l.addChild(r);
        this._initListener();
    };
    this.unload = function() {
        r.off("mousedown", g);
        r.off("pressup", h);
        l.removeChild(r);
    };
    this._initListener = function() {
        g = r.on("mousedown", this.buttonDown);
        h = r.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(n, q, p) {
        f[n] = q;
        d[n] = p;
    };
    this.setCursorType = function(n) {
        r.cursor = n;
    };
    this.setActive = function(n) {
        m = n;
        r.gotoAndStop("state_" + m);
    };
    this.buttonRelease = function() {
        r.scaleX = 1;
        r.scaleY = 1;
        playSound("click", 1, 0);
        m = !m;
        r.gotoAndStop("state_" + m);
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(d[ON_MOUSE_UP], m);
    };
    this.buttonDown = function() {
        r.scaleX = 0.9;
        r.scaleY = 0.9;
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN]);
    };
    this.setPosition = function(n, q) {
        r.x = n;
        r.y = q;
    };
    this._init(a, k, c, b, e);
}

function CGfxButton(a, k, c, b) {
    var e,
        m,
        f,
        d,
        r,
        g,
        h,
        l,
        n = !1;
    this._init = function(p, u, x) {
        e = [];
        m = [];
        d = [];
        f = createBitmap(x);
        f.x = p;
        f.y = u;
        g = r = 1;
        f.regX = x.width / 2;
        f.regY = x.height / 2;
        s_bMobile || (f.cursor = "pointer");
        q.addChild(f);
        this._initListener();
    };
    this.unload = function() {
        createjs.Tween.removeTweens(f);
        f.off("mousedown", h);
        f.off("pressup", l);
        q.removeChild(f);
    };
    this.setVisible = function(p) {
        f.visible = p;
    };
    this.setCursorType = function(p) {
        f.cursor = p;
    };
    this._initListener = function() {
        h = f.on("mousedown", this.buttonDown);
        l = f.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(p, u, x) {
        e[p] = u;
        m[p] = x;
    };
    this.addEventListenerWithParams = function(p, u, x, B) {
        e[p] = u;
        m[p] = x;
        d[p] = B;
    };
    this.buttonRelease = function() {
        n ||
            ((f.scaleX = 0 < r ? r : -r),
                (f.scaleY = g),
                playSound("click", 1, 0),
                e[ON_MOUSE_UP] &&
                e[ON_MOUSE_UP].call(m[ON_MOUSE_UP], d[ON_MOUSE_UP]));
    };
    this.buttonDown = function() {
        n ||
            ((f.scaleX = 0 < r ? 0.9 * r : 0.9 * -r),
                (f.scaleY = 0.9 * g),
                e[ON_MOUSE_DOWN] &&
                e[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN], d[ON_MOUSE_DOWN]));
    };
    this.rotation = function(p) {
        f.rotation = p;
    };
    this.getButton = function() {
        return f;
    };
    this.setPosition = function(p, u) {
        f.x = p;
        f.y = u;
    };
    this.setX = function(p) {
        f.x = p;
    };
    this.setY = function(p) {
        f.y = p;
    };
    this.getButtonImage = function() {
        return f;
    };
    this.block = function(p) {
        n = p;
        f.scaleX = r;
        f.scaleY = g;
    };
    this.setScaleX = function(p) {
        r = f.scaleX = p;
    };
    this.setScale = function(p) {
        g = r = p;
        f.scaleX = f.scaleY = p;
    };
    this.getX = function() {
        return f.x;
    };
    this.getY = function() {
        return f.y;
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(f, { loop: -1 })
            .to({ scaleX: 0.9 * r, scaleY: 0.9 * g },
                850,
                createjs.Ease.quadOut
            )
            .to({ scaleX: r, scaleY: g }, 650, createjs.Ease.quadIn);
    };
    this.removeAllTweens = function() {
        createjs.Tween.removeTweens(f);
    };
    var q = void 0 !== b ? b : s_oStage;
    this._init(a, k, c);
    return this;
}

function CMenu() {
    var a,
        k,
        c,
        b,
        e,
        m,
        f,
        d,
        r,
        g,
        h,
        l,
        n,
        q,
        p,
        u = null,
        x,
        B = null,
        t = null,
        D;
    this._init = function() {
        h = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(h);
        var z = s_oSpriteLibrary.getSprite("but_play");
        r = CANVAS_WIDTH / 2;
        g = CANVAS_HEIGHT - z.height / 2 - 10;
        l = new CGfxButton(r, g, z);
        l.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        z = s_oSpriteLibrary.getSprite("but_credits");
        SHOW_CREDITS
            ?
            ((e = 10 + z.width / 2),
                (m = z.height / 2 + 10),
                (p = new CGfxButton(e, m, z)),
                p.addEventListener(ON_MOUSE_UP, this._onCredits, this),
                (c = e + z.width + 10),
                (b = m)) :
            ((c = 10 + z.width / 2), (b = z.height / 2 + 10));
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            (z = s_oSpriteLibrary.getSprite("audio_icon")),
            (f = CANVAS_WIDTH - z.width / 4 - 10),
            (d = z.height / 2 + 10),
            (q = new CToggle(f, d, z, s_bAudioActive, s_oStage)),
            q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        z = window.document;
        var w = z.documentElement;
        B =
            w.requestFullscreen ||
            w.mozRequestFullScreen ||
            w.webkitRequestFullScreen ||
            w.msRequestFullscreen;
        t =
            z.exitFullscreen ||
            z.mozCancelFullScreen ||
            z.webkitExitFullscreen ||
            z.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (B = !1);
        B &&
            screenfull.isEnabled &&
            ((z = s_oSpriteLibrary.getSprite("but_fullscreen")),
                (x = new CToggle(c, b, z, s_bFullscreen, s_oStage)),
                x.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        z = s_oSpriteLibrary.getSprite("logo_menu");
        a = CANVAS_WIDTH / 2;
        k = 10;
        D = createBitmap(z);
        D.regX = z.width / 2;
        D.x = a;
        D.y = k;
        s_oStage.addChild(D);
        n = new createjs.Shape();
        n.graphics
            .beginFill("black")
            .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(n);
        createjs.Tween.get(n)
            .to({ alpha: 0 }, 1e3)
            .call(function() {
                s_oStage.removeChild(n);
            });
        this.refreshButtonPos();
    };
    this.unload = function() {
        l.unload();
        l = null;
        SHOW_CREDITS && p.unload();
        s_oStage.removeChild(h);
        h = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            q.unload(), (q = null);
        B && screenfull.isEnabled && x.unload();
        s_oMenu = null;
    };
    this.refreshButtonPos = function() {
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
        q.setPosition(f - s_iOffsetX, d + s_iOffsetY);
        B &&
            screenfull.isEnabled &&
            x.setPosition(c + s_iOffsetX, b + s_iOffsetY);
        l.setPosition(r, g - s_iOffsetY);
        SHOW_CREDITS && p.setPosition(e + s_iOffsetX, m + s_iOffsetY);
        null !== u && u.refreshButtonPos();
        D.y = k + s_iOffsetY;
    };
    this.exitFromCredits = function() {
        u = null;
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this._onCredits = function() {
        u = new CCreditsPanel();
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoBetPanel();
    };
    this.resetFullscreenBut = function() {
        B && screenfull.isEnabled && x.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen
            ?
            t.call(window.document) :
            B.call(window.document.documentElement);
        sizeHandler();
    };
    s_oMenu = this;
    this._init();
}
var s_oMenu = null;

function CGame(a) {
    var k, c, b, e, m, f, d, r, g, h, l, n, q, p, u, x, B, t, D, z;
    this._init = function() {
        e = b = k = !1;
        d = f = 0;
        q = s_oGameSettings.getAllHorseNames();
        setVolume("soundtrack", 0);
        s_oTweenController = new CTweenController();
        p = new createjs.Container();
        s_oStage.addChild(p);
        x = new CTrackBg(p);
        t = new CRankingGui(q, s_oStage);
        D = new CArrivalPanel(CANVAS_WIDTH, 246, s_oStage);
        B = new CInterface();
        this.generateFinalRank();
        this._prepareHorses();
        u = new createjs.Shape();
        u.graphics
            .beginFill("white")
            .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        u.alpha = 0;
        s_oStage.addChild(u);
        $(s_oMain).trigger("start_level", 1);
        z = new createjs.Text("", "40px " + PRIMARY_FONT, "#000");
        z.textAlign = "center";
        z.textBaseline = "alphabetic";
        z.x = CANVAS_WIDTH / 2;
        z.y = 220;
        setTimeout(function() {
            s_oGame.startRace();
        }, 1e3);
        playSound("start_race", 1, 0);
        this.refreshButtonPos();
    };
    this.unload = function() {
        stopSound("start_race");
        B.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        s_oGame = null;
    };
    this.refreshButtonPos = function() {
        B.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        t.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        D.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.pause = function() {
        k = !1;
        pauseSound("start_race");
        for (var w = 0; w < NUM_HORSES; w++) h[w].pauseAnim();
    };
    this.unpause = function() {
        k = !0;
        playSound("start_race");
        for (var w = 0; w < NUM_HORSES; w++) h[w].unpauseAnim();
    };
    this.onExit = function() {
        setVolume("soundtrack", 1);
        s_oGame.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("share_event", [s_iCurMoney]);
    };
    this.gotoBetPanel = function() {
        setVolume("soundtrack", 1);
        s_oGame.unload();
        s_oMain.gotoBetPanel();
    };
    this.startRace = function() {
        for (var w = 0; w < n.length; w++) n[w].playAnim();
        B.blockExit(!1);
        k = !0;
        x.startTrack();
        setTimeout(function() {
            s_oGame.startHorses();
        }, 100);
    };
    this.generateFinalRank = function() {
        s_oBetList.getMinWin() > s_iGameCash ?
            this._generateLosingResult() :
            100 * Math.random() < WIN_OCCURRENCE ?
            this._generateWinResult() :
            this._generateLosingResult();
        m = parseFloat(m.toFixed(2));
    };
    this._generateWinResult = function() {
        c = !0;
        do {
            r = this._generateRandomRank();
            var w = s_oBetList.getTotWinWithCurRank(r);
            m = w.tot_win;
        } while (m <= a);
        g = w.win_list;
    };
    this._generateLosingResult = function() {
        c = !1;
        do {
            r = this._generateRandomRank();
            var w = s_oBetList.getTotWinWithCurRank(r);
            m = w.tot_win;
        } while (m > a);
        g = w.win_list;
    };
    this._generateRandomRank = function() {
        for (
            var w = [], y = s_oGameSettings.getHorsePercentageArray(); w.length < NUM_HORSES;

        ) {
            var E = y[Math.floor(Math.random() * y.length)];
            w.unshift(E);
            for (var A = y.length - 1; 0 <= A;)
                y[A] === E && y.splice(A, 1), A--;
        }
        return w;
    };
    this._prepareHorses = function() {
        l = [];
        n = [];
        h = [];
        for (
            var w = s_oGameSettings.getRandomPath(),
                y = [
                    { x: 266, y: 233 },
                    { x: 248, y: 234 },
                    { x: 229, y: 235 },
                    { x: 208, y: 237 },
                    { x: 183, y: 239 },
                    { x: 154, y: 241 },
                    { x: 120, y: 244 },
                    { x: 83, y: 246 },
                    { x: 62, y: 249 },
                ],
                E = 0; E < NUM_HORSES; E++
        ) {
            var A = createBitmap(s_oSpriteLibrary.getSprite("cage_" + E));
            p.addChild(A);
            l.push(A);
            A = s_oGameSettings.getHorseInfo(E);
            var K = r.indexOf(E);
            h[E] = new CHorse(
                A.start,
                E + 1,
                q[E],
                A.scale,
                w["place_" + (K + 1)],
                p
            );
            A = new CGate(y[E].x, y[E].y, E, p);
            n.push(A);
        }
        A = createBitmap(s_oSpriteLibrary.getSprite("cage_" + NUM_HORSES));
        p.addChild(A);
        l.push(A);
        A = new CGate(y[NUM_HORSES].x, y[NUM_HORSES].y, NUM_HORSES, p);
        n.push(A);
    };
    this.startHorses = function() {
        for (var w = 0; w < NUM_HORSES; w++) h[w].startRace();
    };
    this.horsePhotofinish = function(w, y) {
        B.blockExit(!0);
        D.refreshRank(w, y);
        f++;
        4 > f ?
            ((k = !1), (d = TIME_CHECK_RANK), this._playFlashAnim()) :
            6 === f &&
            (c || 0 < m ?
                ((s_iCurMoney += m),
                    (s_iGameCash -= m),
                    (s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2))),
                    (s_iGameCash = parseFloat(s_iGameCash.toFixed(2))),
                    B.showWinPanel(m, g, r)) :
                B.showLosePanel(r),
                stopSound("start_race"),
                setVolume("soundtrack", 1),
                $(s_oMain).trigger("save_score", s_iCurMoney));
    };
    this.checkHorseArrival = function() {
        b = !0;
        this._refreshRank();
    };
    this._playFlashAnim = function() {
        for (var w = 0; w < NUM_HORSES; w++) h[w].pauseAnim();
        playSound("photo", 1, 0);
        createjs.Tween.get(u)
            .to({ alpha: 0.8 }, 200)
            .call(function() {
                var y = new createjs.ColorMatrix().adjustSaturation(-100);
                p.filters = [new createjs.ColorMatrixFilter(y)];
                p.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                e = !0;
                createjs.Tween.get(u)
                    .to({ alpha: 0 }, 400)
                    .call(function() {
                        s_oGame.restoreRaceAfterFlash();
                    });
            });
    };
    this.restoreRaceAfterFlash = function() {
        setTimeout(function() {
            for (var w = 0; w < NUM_HORSES; w++) h[w].unpauseAnim();
            p.filters = [];
            p.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            k = !0;
        }, 1e3);
    };
    this.moveCages = function(w) {
        if (4 === w) {
            for (var y = 0; y < l.length; y++) p.removeChild(l[y]);
            for (y = 0; y < n.length; y++) n[y].unload();
        } else {
            var E = [123, 255, 370];
            for (y = 0; y < l.length; y++) l[y].x -= E[w - 1];
            for (y = 0; y < n.length; y++) n[y].decreaseX(E[w - 1]);
        }
    };
    this._refreshRank = function() {
        for (var w = [], y = 0; y < NUM_HORSES; y++) {
            var E = h[y].getX();
            w[y] = { index: y, x: E };
        }
        w.sort(this.compareXPos);
        t.refreshRank(w);
    };
    this.compareXPos = function(w, y) {
        return w.x > y.x ? -1 : w.x < y.x ? 1 : 0;
    };
    this.returnInBetPanel = function() {
        s_iAdCounter++;
        s_iAdCounter === AD_SHOW_COUNTER &&
            ((s_iAdCounter = 0), $(s_oMain).trigger("show_interlevel_ad"));
        s_oGame.gotoBetPanel();
    };
    this.update = function() {
        if (k) {
            var w = x.update();
            t.refreshRadar(w);
            for (w = 0; w < NUM_HORSES; w++) h[w].update(b);
            e && p.updateCache();
            d += s_iTimeElaps;
            d > TIME_CHECK_RANK && !b && ((d = 0), this._refreshRank());
        }
    };
    s_oGame = this;
    this._init();
}
var s_oGame = null,
    s_oTweenController;

function CInterface() {
    var a,
        k,
        c,
        b,
        e,
        m,
        f,
        d,
        r = null,
        g = null,
        h,
        l,
        n,
        q;
    this._init = function() {
        var p = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH - p.width / 2 - 10;
        k = p.height / 2 + 10;
        h = new CGfxButton(a, k, p);
        h.block(!0);
        h.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ?
            ((p = s_oSpriteLibrary.getSprite("audio_icon")),
                (e = a - p.width / 2 - 10),
                (m = k),
                (f = new CToggle(e, m, p, s_bAudioActive, s_oStage)),
                f.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
                (c = e - p.width / 2 - 10),
                (b = m)) :
            ((c = a - p.width - 10), (b = k));
        p = window.document;
        var u = p.documentElement;
        r =
            u.requestFullscreen ||
            u.mozRequestFullScreen ||
            u.webkitRequestFullScreen ||
            u.msRequestFullscreen;
        g =
            p.exitFullscreen ||
            p.mozCancelFullScreen ||
            p.webkitExitFullscreen ||
            p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (r = !1);
        r &&
            screenfull.isEnabled &&
            ((p = s_oSpriteLibrary.getSprite("but_fullscreen")),
                (d = new CToggle(c, b, p, s_bFullscreen, s_oStage)),
                d.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        n = new CLosePanel(s_oStage);
        l = new CWinPanel(s_oStage);
        q = new CAreYouSurePanel(s_oStage);
    };
    this.refreshButtonPos = function() {
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
        f.setPosition(e - s_iOffsetX, m + s_iOffsetY);
        r &&
            screenfull.isEnabled &&
            d.setPosition(c - s_iOffsetX, b + s_iOffsetY);
        h.setPosition(a - s_iOffsetX, k + s_iOffsetY);
    };
    this.showWinPanel = function(p, u, x) {
        l.show(p, u, x);
    };
    this.showLosePanel = function(p) {
        n.show(p);
    };
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            f.unload(), (f = null);
        r && screenfull.isEnabled && d.unload();
        l.unload();
        n.unload();
        q.unload();
        s_oInterface = null;
    };
    this.blockExit = function(p) {
        h.block(p);
    };
    this._onExit = function() {
        s_oGame.pause();
        q.show();
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this.resetFullscreenBut = function() {
        r && screenfull.isEnabled && d.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen
            ?
            g.call(window.document) :
            r.call(window.document.documentElement);
        sizeHandler();
    };
    s_oInterface = this;
    this._init();
    return this;
}
var s_oInterface = null;

function CCreditsPanel() {
    var a, k, c, b, e, m, f;
    this._init = function() {
        f = new createjs.Container();
        s_oStage.addChild(f);
        a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        f.addChild(a);
        b = new createjs.Shape();
        b.graphics
            .beginFill("#0f0f0f")
            .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = 0.01;
        m = b.on("click", this._onLogoButRelease);
        f.addChild(b);
        var d = s_oSpriteLibrary.getSprite("but_exit");
        c = new CGfxButton(815, 284, d, f);
        c.addEventListener(ON_MOUSE_UP, this.unload, this);
        d = s_oSpriteLibrary.getSprite("logo_ctl");
        k = createBitmap(d);
        k.regX = d.width / 2;
        k.regY = d.height / 2;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2 - 50;
        f.addChild(k);
        e = new createjs.Text(
            "www.codethislab.com",
            "36px " + PRIMARY_FONT,
            "#fff"
        );
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 + 120;
        f.addChild(e);
    };
    this.unload = function() {
        b.off("click", m);
        c.unload();
        c = null;
        s_oStage.removeChild(f);
        s_oMenu.exitFromCredits();
    };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en", "_blank");
    };
    this._init();
}

function CBetPanel() {
    var a,
        k,
        c,
        b,
        e,
        m,
        f,
        d,
        r,
        g,
        h,
        l,
        n = null,
        q = null,
        p,
        u,
        x,
        B,
        t,
        D,
        z,
        w,
        y;
    this._init = function() {
        r = f = 0;
        h = [];
        y = new createjs.Container();
        s_oStage.addChild(y);
        var E = createBitmap(s_oSpriteLibrary.getSprite("bg_bet_panel"));
        y.addChild(E);
        E = s_oSpriteLibrary.getSprite("but_exit");
        e = CANVAS_WIDTH - E.width / 2 - 10;
        m = E.height / 2 + 10;
        D = new CGfxButton(e, m, E, y);
        D.addEventListener(ON_MOUSE_UP, this.onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
            var A = s_oSpriteLibrary.getSprite("audio_icon");
            c = e - E.width - 10;
            b = A.height / 2 + 10;
            z = new CToggle(c, b, A, s_bAudioActive, s_oStage);
            z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            a = c - A.width / 2 - 10;
            k = b;
        } else(a = e - E.width - 10), (k = m);
        E = window.document;
        A = E.documentElement;
        n =
            A.requestFullscreen ||
            A.mozRequestFullScreen ||
            A.webkitRequestFullScreen ||
            A.msRequestFullscreen;
        q =
            E.exitFullscreen ||
            E.mozCancelFullScreen ||
            E.webkitExitFullscreen ||
            E.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        n &&
            screenfull.isEnabled &&
            ((A = s_oSpriteLibrary.getSprite("but_fullscreen")),
                (l = new CToggle(a, k, A, s_bFullscreen, s_oStage)),
                l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        E = s_oSpriteLibrary.getSprite("simple_bet_panel");
        BET_PANEL_WIDTH = E.width;
        BET_PANEL_HEIGHT = E.height;
        w = new createjs.Container();
        w.x = BET_PANEL_X;
        w.y = BET_PANEL_Y;
        y.addChild(w);
        g = [];
        g[0] = new CSimpleBetPanel(0, 0, w);
        g[1] = new CForecastPanel(BET_PANEL_WIDTH, 0, w);
        B = new CChipPanel(1010, 326, y);
        p = new createjs.Shape();
        p.graphics
            .beginFill("rgba(255,255,255,0.01)")
            .drawRect(
                BET_PANEL_X + 6,
                BET_PANEL_Y,
                BET_PANEL_WIDTH - 12,
                BET_PANEL_HEIGHT
            );
        y.addChild(p);
        w.mask = p;
        d = 0;
        u = new CGfxButton(
            BET_PANEL_X + 8,
            CANVAS_HEIGHT / 2,
            s_oSpriteLibrary.getSprite("arrow_left"),
            y
        );
        u.addEventListener(ON_MOUSE_UP, this._onArrowLeft, this);
        x = new CGfxButton(
            BET_PANEL_X + E.width - 10,
            CANVAS_HEIGHT / 2,
            s_oSpriteLibrary.getSprite("arrow_right"),
            y
        );
        x.addEventListener(ON_MOUSE_UP, this._onArrowRight, this);
        t = new CMsgBox();
        s_oBetList.reset();
        this.refreshButtonPos();
    };
    this.unload = function() {
        u.unload();
        x.unload();
        D.unload();
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || z.unload();
        n && screenfull.isEnabled && l.unload();
        t.unload();
        B.unload();
        for (var E = 0; E < g.length; E++) g[E].unload();
        s_oStage.removeAllChildren();
    };
    this.refreshButtonPos = function() {
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
        z.setPosition(c - s_iOffsetX, b + s_iOffsetY);
        n &&
            screenfull.isEnabled &&
            l.setPosition(a - s_iOffsetX, k + s_iOffsetY);
        D.setPosition(e - s_iOffsetX, m + s_iOffsetY);
    };
    this.setChipSelected = function(E) {
        r = E;
    };
    this.setMoney = function(E) {
        s_iCurMoney = E;
        B.refreshMoney();
    };
    this.setSimpleBet = function(E, A, K, S) {
        if (K > s_iCurMoney) return t.show(TEXT_NO_MONEY, !0), !1;
        if (f + K > MAX_BET) return t.show(TEXT_ERR_MAX_BET, !1), !1;
        s_oBetList.addSimpleBet(E, A, K);
        f += K;
        f = Number(f.toFixed(2));
        s_iCurMoney -= K;
        s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2));
        s_iGameCash += K;
        s_iGameCash = parseFloat(s_iGameCash.toFixed(2));
        B.refreshMoney();
        B.refreshBet(f);
        h.push(S);
        return !0;
    };
    this.setForecastBet = function(E, A, K, S) {
        if (K > s_iCurMoney) return t.show(TEXT_NO_MONEY, !0), !1;
        if (f + K > MAX_BET) return t.show(TEXT_ERR_MAX_BET, !1), !1;
        s_oBetList.addForecastBet(E, A, K);
        f += K;
        f = Number(f.toFixed(2));
        s_iCurMoney -= K;
        s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2));
        s_iGameCash += K;
        s_iGameCash = parseFloat(s_iGameCash.toFixed(2));
        B.refreshMoney();
        B.refreshBet(f);
        h.push(S);
        return !0;
    };
    this.refreshPagePos = function(E, A) {
        w.x = BET_PANEL_X;
        g[d].setX(0);
        g[E].setX(A);
    };
    this.clearBet = function() {
        for (var E = 0; E < h.length; E++) h[E].clearBet();
        s_iCurMoney += f;
        s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2));
        s_iGameCash -= f;
        s_iGameCash = parseFloat(s_iGameCash.toFixed());
        f = 0;
        g[0].clearBet();
        s_oBetList.reset();
        B.refreshBet(0);
        B.refreshMoney();
    };
    this._onArrowLeft = function() {
        var E = d;
        d++;
        d === g.length && ((d = 0), (E = g.length - 1));
        g[d].setX(BET_PANEL_WIDTH);
        createjs.Tween.get(w)
            .to({ x: -BET_PANEL_WIDTH + BET_PANEL_X },
                500,
                createjs.Ease.cubicOut
            )
            .call(function() {
                s_oBetPanel.refreshPagePos(E, BET_PANEL_WIDTH);
            });
    };
    this._onArrowRight = function() {
        var E = d;
        d--;
        0 > d && (d = g.length - 1);
        g[d].setX(-BET_PANEL_WIDTH);
        createjs.Tween.get(w)
            .to({ x: BET_PANEL_X + BET_PANEL_WIDTH },
                500,
                createjs.Ease.cubicOut
            )
            .call(function() {
                s_oBetPanel.refreshPagePos(E, -BET_PANEL_WIDTH);
            });
    };
    this.onStartExit = function() {
        f < MIN_BET ?
            t.show(TEXT_ERR_MIN_BET, !1) :
            (this.unload(),
                s_oMain.gotoGame(f),
                $(s_oMain).trigger("bet_placed", f));
    };
    this.onExit = function() {
        $(s_oMain).trigger("end_session");
        this.unload();
        s_oMain.gotoMenu();
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this.resetFullscreenBut = function() {
        n && screenfull.isEnabled && l.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen
            ?
            q.call(window.document) :
            n.call(window.document.documentElement);
        sizeHandler();
    };
    this.getChipSelected = function() {
        return r;
    };
    s_oBetPanel = this;
    this._init();
}
var s_oBetPanel = null;

function CChipPanel(a, k, c) {
    var b, e, m, f, d, r, g;
    this._init = function(l, n) {
        g = new createjs.Container();
        g.x = l;
        g.y = n;
        h.addChild(g);
        r = new CTextButton(
            73,
            2,
            s_oSpriteLibrary.getSprite("but_clear_bet"),
            TEXT_CLEAR_BET,
            PRIMARY_FONT,
            "#fff",
            24,
            g
        );
        r.addEventListener(ON_MOUSE_UP, this._onClearBet, this);
        var q = s_oSpriteLibrary.getSprite("money_panel"),
            p = createBitmap(s_oSpriteLibrary.getSprite("money_panel"));
        p.regX = q.width / 2;
        p.x = 73;
        p.y = 22;
        g.addChild(p);
        new CTLText(
            g,
            18,
            32,
            110,
            14,
            14,
            "center",
            "#ffde00",
            SECONDARY_FONT,
            1,
            0,
            0,
            TEXT_MIN_BET + ": " + MIN_BET + TEXT_CURRENCY, !0, !0, !1, !1
        );
        new CTLText(
            g,
            18,
            44,
            110,
            14,
            14,
            "center",
            "#ffde00",
            SECONDARY_FONT,
            1,
            0,
            0,
            TEXT_MAX_BET + ": " + MAX_BET + TEXT_CURRENCY, !0, !0, !1, !1
        );
        p = createBitmap(s_oSpriteLibrary.getSprite("money_panel"));
        p.regX = q.width / 2;
        p.x = 73;
        p.y = 72;
        g.addChild(p);
        new CTLText(
            g,
            5,
            74,
            40,
            12,
            12,
            "left",
            "#fff",
            TERTIARY_FONT,
            1,
            0,
            0,
            TEXT_BET, !0, !0, !1, !1
        );
        f = new CTLText(
            g,
            18,
            82,
            110,
            26,
            26,
            "center",
            "#ffde00",
            SECONDARY_FONT,
            1,
            0,
            0,
            "0" + TEXT_CURRENCY, !0, !0, !1, !1
        );
        p = createBitmap(q);
        p.regX = q.width / 2;
        p.x = 73;
        p.y = 122;
        g.addChild(p);
        new CTLText(
            g,
            5,
            124,
            40,
            12,
            12,
            "left",
            "#fff",
            TERTIARY_FONT,
            1,
            0,
            0,
            TEXT_MONEY, !0, !0, !1, !1
        );
        m = new CTLText(
            g,
            18,
            132,
            110,
            26,
            26,
            "center",
            "#ffde00",
            SECONDARY_FONT,
            1,
            0,
            0,
            s_iCurMoney + TEXT_CURRENCY, !0, !0, !1, !1
        );
        this._initChips();
        d = new CButStartRace(
            73,
            304,
            s_oSpriteLibrary.getSprite("but_start_race"),
            TEXT_START_RACE,
            "#fff",
            24,
            g
        );
        d.addEventListener(ON_MOUSE_UP, this._onStartRace, this);
    };
    this.unload = function() {
        for (var l = 0; l < b; l++) b[l].unload();
        d.unload();
    };
    this._initChips = function() {
        var l = createBitmap(s_oSpriteLibrary.getSprite("fiche_panel"));
        l.x = 0;
        l.y = 170;
        g.addChild(l);
        l = [
            { x: 46, y: 220 },
            { x: 97, y: 220 },
            { x: 145, y: 220 },
            { x: 46, y: 264 },
            { x: 97, y: 264 },
            { x: 145, y: 264 },
        ];
        b = [];
        for (var n = 0; n < NUM_CHIPS; n++)
            (b[n] = new CFicheBut(n, l[n].x, l[n].y, 1, g)),
            b[n].addEventListenerWithParams(
                ON_MOUSE_UP,
                this._onFicheClicked,
                this,
                n
            );
        l = s_oSpriteLibrary.getSprite("fiche_highlight");
        e = createBitmap(l);
        e.regX = l.width / 2;
        e.regY = l.height / 2;
        e.x = b[0].getX() - 22;
        e.y = b[0].getY() - 23;
        g.addChild(e);
    };
    this.refreshMoney = function() {
        m.refreshText(s_iCurMoney + TEXT_CURRENCY);
    };
    this.refreshBet = function(l) {
        f.refreshText(l + TEXT_CURRENCY);
    };
    this._onStartRace = function() {
        s_oBetPanel.onStartExit();
    };
    this._onClearBet = function() {
        s_oBetPanel.clearBet();
    };
    this._onFicheClicked = function(l) {
        e.x = b[l].getX() - 22;
        e.y = b[l].getY() - 23;
        s_oBetPanel.setChipSelected(l);
    };
    var h = c;
    this._init(a, k);
}

function CSimpleBetPanel(a, k, c) {
    var b, e, m, f, d;
    this._init = function(g, h) {
        d = new createjs.Container();
        d.x = g;
        d.y = h;
        r.addChild(d);
        var l = createBitmap(s_oSpriteLibrary.getSprite("simple_bet_panel"));
        d.addChild(l);
        new CTLText(
            d,
            25,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_TRAP, !0, !0, !1, !1
        );
        new CTLText(
            d,
            140,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_WINS, !0, !0, !1, !1
        );
        new CTLText(
            d,
            250,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_PLACE, !0, !0, !1, !1
        );
        new CTLText(
            d,
            360,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_SHOW, !0, !0, !1, !1
        );
        new CTLText(
            d,
            475,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_TRAP, !0, !0, !1, !1
        );
        new CTLText(
            d,
            585,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_WINS, !0, !0, !1, !1
        );
        new CTLText(
            d,
            695,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_PLACE, !0, !0, !1, !1
        );
        new CTLText(
            d,
            805,
            10,
            100,
            20,
            20,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_SHOW, !0, !0, !1, !1
        );
        l = s_oSpriteLibrary.getSprite("bibs");
        for (
            var n = new createjs.SpriteSheet({
                    images: [l],
                    frames: { width: l.width / 4, height: l.height / 2 },
                    animations: {
                        bib_0: [0],
                        bib_1: [1],
                        bib_2: [2],
                        bib_3: [3],
                        bib_4: [4],
                        bib_5: [5],
                        bib_6: [6],
                        bib_7: [7],
                    },
                }),
                q = 35,
                p = 23,
                u = 0; u < NUM_HORSES; u++
        ) {
            var x = createSprite(
                n,
                "bib_" + u,
                0,
                0,
                l.width / 3,
                l.height / 2
            );
            x.x = p;
            x.y = q;
            x.scaleX = x.scaleY = 0.5;
            d.addChild(x);
            u === NUM_HORSES / 2 - 1 ?
                ((p = 470), (q = 35)) :
                (q += l.height / 2 + 45);
        }
        this._initHorseInfos();
        this._initBetPlaces();
    };
    this._initHorseInfos = function() {
        var g = s_oGameSettings.getAllHorseNames();
        b = [];
        for (var h = 18, l = 55, n = 0; n < NUM_HORSES; n++) {
            var q = s_oSpriteLibrary.getSprite("horse_" + (n + 1) + "_a"),
                p = s_oSpriteLibrary.getSprite("horse_" + (n + 1) + "_b");
            q = new createjs.SpriteSheet({
                images: [q, p],
                frames: [
                    [1, 1, 249, 191, 0, -56, -19],
                    [252, 1, 307, 193, 0, -8, -19],
                    [561, 1, 308, 196, 0, -4, -16],
                    [1, 199, 307, 198, 0, -2, -14],
                    [310, 199, 306, 201, 0, -1, -11],
                    [618, 199, 307, 205, 0, 0, -7],
                    [1, 406, 305, 209, 0, -1, -3],
                    [308, 406, 304, 211, 0, -3, -1],
                    [614, 406, 301, 209, 0, -8, 0],
                    [1, 619, 295, 207, 0, -17, -2],
                    [298, 619, 295, 204, 0, -19, -5],
                    [595, 619, 301, 203, 0, -21, -8],
                    [1, 1, 284, 200, 1, -35, -11],
                    [287, 1, 293, 198, 1, -31, -14],
                    [582, 1, 306, 196, 1, -20, -16],
                ],
                animations: {
                    idle: [1, 1],
                    anim: [1, 14],
                    start: [15],
                    anim_1: [1, 14, "anim"],
                    anim_2: [6, 14, "anim"],
                    anim_3: [11, 14, "anim"],
                },
            });
            q = createSprite(
                q,
                "idle",
                HORSE_WIDTH / 2,
                HORSE_HEIGHT,
                HORSE_WIDTH,
                HORSE_HEIGHT
            );
            q.x = h;
            q.y = l;
            q.scaleX = q.scaleY = 0.36;
            d.addChild(q);
            b.push(q);
            new CTLText(
                d,
                h + 4,
                l + 80,
                100,
                14,
                14,
                "left",
                "#fff",
                TERTIARY_FONT,
                1,
                0,
                0,
                g[n].toUpperCase(), !0, !0, !1, !1
            );
            n === NUM_HORSES / 2 - 1 ? ((h = 468), (l = 55)) : (l += 115);
        }
    };
    this._initBetPlaces = function() {
        m = [];
        f = [];
        e = [];
        for (
            var g = 150,
                h = 75,
                l = s_oSpriteLibrary.getSprite("bet_place"),
                n = 0; n < NUM_HORSES; n++
        ) {
            var q = new createjs.Text(
                s_oGameSettings.getOddWin(n),
                "20px " + PRIMARY_FONT,
                "#fff"
            );
            q.textAlign = "center";
            q.textBaseline = "middle";
            q.x = g + 38;
            q.y = h + 54;
            d.addChild(q);
            q = new CButBet(q.x + 2, h, l, 0.7, d);
            q.addEventListenerWithParams(
                ON_MOUSE_UP,
                this._onWinClicked,
                this,
                n
            );
            e.push(q);
            q = new createjs.Text(
                s_oGameSettings.getOddPlace(n),
                "20px " + PRIMARY_FONT,
                "#fff"
            );
            q.textAlign = "center";
            q.textBaseline = "middle";
            q.x = g + 150;
            q.y = h + 54;
            d.addChild(q);
            q = new CButBet(q.x + 2, h, l, 0.7, d);
            q.addEventListenerWithParams(
                ON_MOUSE_UP,
                this._onPlaceClicked,
                this,
                n
            );
            m.push(q);
            q = new createjs.Text(
                s_oGameSettings.getOddShow(n),
                "20px " + PRIMARY_FONT,
                "#fff"
            );
            q.textAlign = "center";
            q.textBaseline = "middle";
            q.x = g + 260;
            q.y = h + 54;
            d.addChild(q);
            q = new CButBet(q.x + 2, h, l, 0.7, d);
            q.addEventListenerWithParams(
                ON_MOUSE_UP,
                this._onShowClicked,
                this,
                n
            );
            f.push(q);
            n === NUM_HORSES / 2 - 1 ? ((g = 596), (h = 75)) : (h += 116);
        }
    };
    this.unload = function() {
        for (var g = 0; g < m.length; g++)
            e[g].unload(), f[g].unload(), m[g].unload();
    };
    this.setX = function(g) {
        d.x = g;
    };
    this.clearBet = function() {
        for (var g = 0; g < b.length; g++) b[g].gotoAndStop("idle");
    };
    this._onWinClicked = function(g) {
        var h = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        s_oBetPanel.setSimpleBet(g, 1, h, e[g]) &&
            ("anim" !== b[g].currentAnimation && b[g].gotoAndPlay("anim"),
                e[g].increaseBet(h));
    };
    this._onPlaceClicked = function(g) {
        var h = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        s_oBetPanel.setSimpleBet(g, 2, h, m[g]) &&
            ("anim" !== b[g].currentAnimation && b[g].gotoAndPlay("anim"),
                m[g].increaseBet(h));
    };
    this._onShowClicked = function(g) {
        var h = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        s_oBetPanel.setSimpleBet(g, 3, h, f[g]) &&
            ("anim" !== b[g].currentAnimation && b[g].gotoAndPlay("anim"),
                f[g].increaseBet(h));
    };
    this.getContainer = function() {
        return d;
    };
    var r = c;
    this._init(a, k);
}

function CForecastPanel(a, k, c) {
    var b, e;
    this._init = function() {
        e = new createjs.Container();
        e.x = a;
        e.y = k;
        m.addChild(e);
        var f = createBitmap(s_oSpriteLibrary.getSprite("forecast_panel"));
        e.addChild(f);
        this._initForecastBets();
    };
    this.unload = function() {
        for (var f in b) - 1 < f.indexOf("forecast_") && b[f].unload();
    };
    this._initForecastBets = function() {
        b = [];
        for (
            var f = [
                    { x: 26, y: 5 },
                    { x: 250, y: 5 },
                    { x: 474, y: 5 },
                    { x: 698, y: 5 },
                    { x: 26, y: 252 },
                    { x: 250, y: 252 },
                    { x: 474, y: 252 },
                    { x: 698, y: 252 },
                ],
                d = 0; d < NUM_HORSES; d++
        )
            this._placeForecastBetForHorse(d, f[d].x, f[d].y);
    };
    this._placeForecastBetForHorse = function(f, d, r) {
        var g = s_oSpriteLibrary.getSprite("odd_bg"),
            h = s_oSpriteLibrary.getSprite("bet_place"),
            l = s_oSpriteLibrary.getSprite("bibs"),
            n = l.width / 4,
            q = l.height / 2;
        l = new createjs.SpriteSheet({
            images: [l],
            frames: { width: n, height: q },
            animations: {
                bib_0: [0],
                bib_1: [1],
                bib_2: [2],
                bib_3: [3],
                bib_4: [4],
                bib_5: [5],
                bib_6: [6],
                bib_7: [7],
            },
        });
        for (var p = 0; p < NUM_HORSES; p++)
            if (p !== f) {
                var u = createSprite(l, "bib_" + f, 0, 0, n, q);
                u.x = d;
                u.y = r;
                u.scaleX = u.scaleY = 0.55;
                e.addChild(u);
                var x = new createjs.Text("X", "12px " + PRIMARY_FONT, "#fff");
                x.textAlign = "center";
                x.textBaseline = "middle";
                x.x = d + 0.55 * n + 10;
                x.y = r + (0.55 * q) / 2;
                e.addChild(x);
                var B = createSprite(l, "bib_" + p, 0, 0, n / 3, q / 2);
                B.x = x.x + 10;
                B.y = u.y;
                B.scaleX = B.scaleY = 0.55;
                e.addChild(B);
                x = createBitmap(g);
                x.x = B.x + 0.55 * n + 10;
                x.y = u.y + 2;
                e.addChild(x);
                u = new createjs.Text(
                    s_oGameSettings.getForecastOdd(f, p),
                    "18px " + PRIMARY_FONT,
                    "#fff"
                );
                u.textAlign = "center";
                u.textBaseline = "alphabetic";
                u.x = x.x + g.width / 2;
                u.y = x.y + g.height / 2 + 8;
                e.addChild(u);
                u = new CButBet(
                    x.x + g.width + (0.72 * h.width) / 2 + 5,
                    x.y + (0.72 * h.height) / 2 - 2,
                    h,
                    0.45,
                    e
                );
                u.setScale(0.6);
                u.addEventListenerWithParams(
                    ON_MOUSE_UP,
                    this._onForecastClicked,
                    this, { first: f, second: p }
                );
                b["forecast_" + f + "_" + p] = u;
                r += 0.55 * (q - 14) + 3;
            }
    };
    this.setX = function(f) {
        e.x = f;
    };
    this._onForecastClicked = function(f) {
        var d = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        s_oBetPanel.setForecastBet(
            f.first,
            f.second,
            d,
            b["forecast_" + f.first + "_" + f.second]
        ) && b["forecast_" + f.first + "_" + f.second].increaseBet(d);
    };
    var m = c;
    this._init(a, k);
}

function CBetList() {
    var a, k, c;
    this._init = function() {
        this.reset();
    };
    this.reset = function() {
        a = [];
        for (var b = 0; b < NUM_HORSES; b++)
            (a[b] = []),
            (a[b].place_1 = 0),
            (a[b].place_2 = 0),
            (a[b].place_3 = 0);
        k = [];
        for (b = 0; b < NUM_HORSES; b++) {
            k[b] = [];
            for (var e = 0; e < NUM_HORSES; e++) k[b][e] = 0;
        }
        c = [];
    };
    this.addSimpleBet = function(b, e, m) {
        a[b]["place_" + e] += m;
        var f = 0;
        switch (e) {
            case 1:
                f = m * s_oGameSettings.getOddWin(b);
                break;
            case 2:
                f = m * s_oGameSettings.getOddPlace(b);
                break;
            case 3:
                f = m * s_oGameSettings.getOddShow(b);
        }
        c.push({
            type_bet: "simple",
            horses: [{ index: b, place: e }],
            bet: m,
            win: f,
        });
    };
    this.addForecastBet = function(b, e, m) {
        k[b][e] += m;
        c.push({
            type_bet: "forecast",
            horses: [
                { index: b, place: 1 },
                { index: e, place: 2 },
            ],
            bet: m,
            win: m * s_oGameSettings.getForecastOdd(b, e),
        });
    };
    this.getMinWin = function() {
        if (0 < c.length) {
            for (var b = c[0].win, e = 1; e < c.length; e++)
                b > c[e].win && (b = c[e].win);
            return b;
        }
        return 0;
    };
    this.getTotWinWithCurRank = function(b) {
        var e = 0,
            m = [];
        if (0 < a[b[0]].place_1) {
            var f = a[b[0]].place_1 * s_oGameSettings.getOddWin(b[0]);
            f = parseFloat(f.toFixed(2));
            e += f;
            m.push({ win: f, horses: b[0], bet: a[b[0]].place_1, type: "win" });
        }
        0 < a[b[0]].place_2 &&
            ((f = a[b[0]].place_2 * s_oGameSettings.getOddPlace(b[0])),
                (f = parseFloat(f.toFixed(2))),
                (e += f),
                m.push({
                    win: f,
                    horses: b[0],
                    bet: a[b[0]].place_2,
                    type: "place",
                }));
        0 < a[b[1]].place_2 &&
            ((f = a[b[1]].place_2 * s_oGameSettings.getOddPlace(b[1])),
                (f = parseFloat(f.toFixed(2))),
                (e += f),
                m.push({
                    win: f,
                    horses: b[1],
                    bet: a[b[1]].place_2,
                    type: "place",
                }));
        0 < a[b[0]].place_3 &&
            ((f =
                    a[b[0]].place_3 * parseFloat(s_oGameSettings.getOddShow(b[0]))),
                (f = parseFloat(f.toFixed(2))),
                (e += f),
                m.push({
                    win: f,
                    horses: b[0],
                    bet: a[b[0]].place_3,
                    type: "show",
                }));
        0 < a[b[1]].place_3 &&
            ((f = a[b[1]].place_3 * s_oGameSettings.getOddShow(b[1])),
                (f = parseFloat(f.toFixed(2))),
                (e += f),
                m.push({
                    win: f,
                    horses: b[1],
                    bet: a[b[1]].place_3,
                    type: "show",
                }));
        0 < a[b[2]].place_3 &&
            ((f = a[b[2]].place_3 * s_oGameSettings.getOddShow(b[2])),
                (f = parseFloat(f.toFixed(2))),
                (e += f),
                m.push({
                    win: f,
                    horses: b[2],
                    bet: a[b[2]].place_3,
                    type: "show",
                }));
        0 < k[b[0]][b[1]] &&
            ((f = k[b[0]][b[1]] * s_oGameSettings.getForecastOdd(b[0], b[1])),
                (f = parseFloat(f.toFixed(2))),
                (e += f),
                m.push({
                    win: f,
                    horses: [b[0], b[1]],
                    bet: k[b[0]][b[1]],
                    type: "forecast",
                }));
        return { tot_win: e, win_list: m };
    };
    s_oBetList = this;
    this._init();
}
var s_oBetList = null;

function CFichesController(a, k) {
    var c, b, e, m, f, d, r, g, h, l, n, q;
    this._init = function(u) {
        m = u;
        h = new createjs.Container();
        p.addChild(h);
        d = new CVector2();
        d.set(h.x, h.y);
        l = new createjs.Container();
        p.addChild(l);
        u *= 18;
        q = new createjs.Text("", u + "px " + PRIMARY_FONT, "#000");
        q.textAlign = "center";
        l.addChild(q);
        n = new createjs.Text("", u + "px " + PRIMARY_FONT, "#fff");
        n.textAlign = "center";
        l.addChild(n);
        e = f = b = 0;
        c = !1;
    };
    this.addEventListener = function(u, x, B) {};
    this.reset = function() {
        c = !1;
        e = 0;
        h.removeAllChildren();
        h.x = d.getX();
        h.y = d.getY();
        q.text = "";
        n.text = "";
    };
    this.setPrevValue = function(u) {
        f = u;
    };
    this.refreshFiches = function(u, x, B) {
        u = u.sortOn("value", "index");
        for (
            var t = x + (FICHE_WIDTH * a) / 2,
                D = B + (FICHE_WIDTH * a) / 2,
                z = (e = 0),
                w = 0; w < u.length; w++
        )
            new CFicheBut(u[w].index, t, D, a, h).disable(),
            (D -= 5),
            z++,
            9 < z && ((z = 0), (t += FICHE_WIDTH), (D = B)),
            (e += u[w].value);
        playSound("chip", 1, 0);
        n.x = x;
        n.y = B + 25 * m;
        n.text = e.toFixed(2) + TEXT_CURRENCY;
        q.x = x + 2;
        q.y = B + 27 * m;
        q.text = e.toFixed(2) + TEXT_CURRENCY;
    };
    this.createFichesPile = function(u, x, B) {
        this.reset();
        var t = CHIP_VALUES,
            D = [];
        do {
            for (var z = t[t.length - 1], w = t.length - 1; z > u;)
                w--, (z = t[w]);
            w = Math.floor(u / z);
            for (var y = 0; y < w; y++)
                D.push({
                    value: z,
                    index: s_oGameSettings.getIndexForFiches(z),
                });
            z = Math.floor(u / z) === u / z ? 0 : u % z;
            u = z.toFixed(2);
        } while (0 < z);
        this.refreshFiches(D, x, B * m);
    };
    this.initMovement = function(u, x) {
        f = e;
        r = new CVector2(h.x, h.y);
        g = new CVector2(u, x);
        n.text = "";
        q.text = "";
        c = !0;
    };
    this.getValue = function() {
        return e;
    };
    this.getPrevBet = function() {
        return f;
    };
    this.update = function(u) {
        if (c)
            if (((b += u), b > TIME_FICHES_MOV))(b = 0), (c = !1);
            else {
                u = easeInOutCubic(b, 0, 1, TIME_FICHES_MOV);
                var x = new CVector2();
                x = tweenVectors(r, g, u, x);
                h.x = x.getX();
                h.y = x.getY();
            }
    };
    var p = k;
    this._init(a);
}

function CButBet(a, k, c, b, e) {
    var m,
        f,
        d,
        r,
        g,
        h,
        l,
        n,
        q,
        p = !1,
        u,
        x;
    this._init = function(t, D, z, w) {
        m = 0;
        f = [];
        d = [];
        g = [];
        x = new createjs.Container();
        x.x = t;
        x.y = D;
        B.addChild(x);
        r = createBitmap(z);
        l = h = 1;
        r.regX = z.width / 2;
        r.regY = z.height / 2;
        s_bMobile || (r.cursor = "pointer");
        x.addChild(r);
        this._initListener();
        u = new CFichesController(w, x);
    };
    this.unload = function() {
        createjs.Tween.removeTweens(r);
        r.off("mousedown", n);
        r.off("pressup", q);
        B.removeChild(x);
    };
    this.setVisible = function(t) {
        r.visible = t;
    };
    this.setCursorType = function(t) {
        r.cursor = t;
    };
    this._initListener = function() {
        n = r.on("mousedown", this.buttonDown);
        q = r.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(t, D, z) {
        f[t] = D;
        d[t] = z;
    };
    this.addEventListenerWithParams = function(t, D, z, w) {
        f[t] = D;
        d[t] = z;
        g[t] = w;
    };
    this.buttonRelease = function() {
        p ||
            ((r.scaleX = 0 < h ? h : -h),
                (r.scaleY = l),
                playSound("chip", 1, 0),
                f[ON_MOUSE_UP] &&
                f[ON_MOUSE_UP].call(d[ON_MOUSE_UP], g[ON_MOUSE_UP]));
    };
    this.buttonDown = function() {
        p ||
            ((r.scaleX = 0 < h ? 0.9 * h : 0.9 * -h),
                (r.scaleY = 0.9 * l),
                f[ON_MOUSE_DOWN] &&
                f[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN], g[ON_MOUSE_DOWN]));
    };
    this.rotation = function(t) {
        r.rotation = t;
    };
    this.getButton = function() {
        return r;
    };
    this.setPosition = function(t, D) {
        r.x = t;
        r.y = D;
    };
    this.setX = function(t) {
        r.x = t;
    };
    this.setY = function(t) {
        r.y = t;
    };
    this.getButtonImage = function() {
        return r;
    };
    this.block = function(t) {
        p = t;
        r.scaleX = h;
        r.scaleY = l;
    };
    this.setScaleX = function(t) {
        h = r.scaleX = t;
    };
    this.setScale = function(t) {
        l = h = t;
        r.scaleX = r.scaleY = t;
    };
    this.increaseBet = function(t) {
        m += t;
        u.createFichesPile(m.toFixed(2), 0, -4);
    };
    this.clearBet = function() {
        m = 0;
        u.reset();
    };
    this.getX = function() {
        return r.x;
    };
    this.getY = function() {
        return r.y;
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(r, { loop: -1 })
            .to({ scaleX: 0.9 * h, scaleY: 0.9 * l },
                850,
                createjs.Ease.quadOut
            )
            .to({ scaleX: h, scaleY: l }, 650, createjs.Ease.quadIn);
    };
    this.removeAllTweens = function() {
        createjs.Tween.removeTweens(r);
    };
    this.getTotBet = function() {
        return m;
    };
    var B = void 0 !== e ? e : s_oStage;
    this._init(a, k, c, b);
    return this;
}

function CVector2(a, k) {
    var c, b;
    this._init = function(e, m) {
        c = e;
        b = m;
    };
    this.add = function(e, m) {
        c += e;
        b += m;
    };
    this.addV = function(e) {
        c += e.getX();
        b += e.getY();
    };
    this.scalarDivision = function(e) {
        c /= e;
        b /= e;
    };
    this.subV = function(e) {
        c -= e.getX();
        b -= e.getY();
    };
    this.scalarProduct = function(e) {
        c *= e;
        b *= e;
    };
    this.invert = function() {
        c *= -1;
        b *= -1;
    };
    this.dotProduct = function(e) {
        return c * e.getX() + b * e.getY();
    };
    this.set = function(e, m) {
        c = e;
        b = m;
    };
    this.setV = function(e) {
        c = e.getX();
        b = e.getY();
    };
    this.length = function() {
        return Math.sqrt(c * c + b * b);
    };
    this.length2 = function() {
        return c * c + b * b;
    };
    this.normalize = function() {
        var e = this.length();
        0 < e && ((c /= e), (b /= e));
    };
    this.getNormalize = function(e) {
        this.length();
        e.set(c, b);
        e.normalize();
    };
    this.rot90CCW = function() {
        var e = c;
        c = -b;
        b = e;
    };
    this.rot90CW = function() {
        var e = c;
        c = b;
        b = -e;
    };
    this.getRotCCW = function(e) {
        e.set(c, b);
        e.rot90CCW();
    };
    this.getRotCW = function(e) {
        e.set(c, b);
        e.rot90CW();
    };
    this.ceil = function() {
        c = Math.ceil(c);
        b = Math.ceil(b);
    };
    this.round = function() {
        c = Math.round(c);
        b = Math.round(b);
    };
    this.toString = function() {
        return "Vector2: " + c + ", " + b;
    };
    this.print = function() {
        trace("Vector2: " + c + ", " + b);
    };
    this.getX = function() {
        return c;
    };
    this.getY = function() {
        return b;
    };
    this._init(a, k);
}

function CMsgBox() {
    var a, k, c, b, e;
    this._init = function() {
        c = new createjs.Container();
        c.alpha = 0;
        c.visible = !1;
        s_oStage.addChild(c);
        a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        c.addChild(a);
        k = new CTLText(
            c,
            CANVAS_WIDTH / 2 - 200,
            CANVAS_HEIGHT / 2 - 100,
            400,
            130,
            34,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            " ", !0, !0, !0, !1
        );
        b = new CTextButton(
            CANVAS_WIDTH / 2,
            500,
            s_oSpriteLibrary.getSprite("fiche_panel"),
            TEXT_RECHARGE,
            PRIMARY_FONT,
            "#fff",
            30,
            c
        );
        b.setVisible(!1);
        b.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        e = new CGfxButton(
            CANVAS_WIDTH / 2 + 205,
            CANVAS_HEIGHT / 2 - 130,
            s_oSpriteLibrary.getSprite("but_exit"),
            c
        );
        e.addEventListener(ON_MOUSE_UP, this._onExit, this);
    };
    this.unload = function() {
        b.unload();
        e.unload();
    };
    this.show = function(m, f) {
        k.refreshText(m);
        c.visible = !0;
        createjs.Tween.get(c).to({ alpha: 1 }, 500);
        f ? b.setVisible(!0) : b.setVisible(!1);
    };
    this._onExit = function() {
        c.visible = !1;
    };
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");
        c.visible = !1;
    };
    this._init();
    return this;
}

function CTrackBg(a) {
    var k, c, b, e, m, f;
    this._init = function() {
        f = new createjs.Container();
        d.addChild(f);
        c = 0;
        b = 3;
        e = 0;
        m = [];
        for (var r = 0; r < NUM_TRACK_BG; r++) {
            var g = createBitmap(s_oSpriteLibrary.getSprite("bg_track_" + r));
            g.scaleX = g.scaleY = 1.25;
            0 < r && (g.visible = !1);
            f.addChild(g);
            m[r] = g;
        }
        k = !1;
    };
    this.startTrack = function() {
        k = !0;
    };
    this.update = function() {
        if (!k) return c;
        e++;
        e === b &&
            ((e = 0),
                c++,
                (m[c].visible = !0),
                (m[c - 1].visible = !1),
                c === m.length - 1 ?
                ((k = !1), s_oGame.checkHorseArrival()) :
                5 > c ?
                s_oGame.moveCages(c) :
                (b = 2));
        return c;
    };
    var d = a;
    this._init();
}

function CHorse(a, k, c, b, e, m) {
    var f, d, r, g, h, l, n, q, p, u, x, B;
    this._init = function(D, z, w, y, E) {
        d = !1;
        r = z;
        n = 0;
        q = ARRIVAL_X - (HORSE_WIDTH / 2) * y + 70;
        p = w;
        u = E;
        B = new createjs.Container();
        B.x = D.x;
        B.y = D.y;
        B.scaleX = B.scaleY = 1.25 * y;
        B.regX = HORSE_WIDTH / 2;
        B.regY = HORSE_HEIGHT;
        t.addChild(B);
        D = s_oSpriteLibrary.getSprite("horse_" + z + "_a");
        z = s_oSpriteLibrary.getSprite("horse_" + z + "_b");
        z = new createjs.SpriteSheet({
            framerate: 30,
            images: [D, z],
            frames: [
                [1, 1, 249, 191, 0, -56, -19],
                [252, 1, 307, 193, 0, -8, -19],
                [561, 1, 308, 196, 0, -4, -16],
                [1, 199, 307, 198, 0, -2, -14],
                [310, 199, 306, 201, 0, -1, -11],
                [618, 199, 307, 205, 0, 0, -7],
                [1, 406, 305, 209, 0, -1, -3],
                [308, 406, 304, 211, 0, -3, -1],
                [614, 406, 301, 209, 0, -8, 0],
                [1, 619, 295, 207, 0, -17, -2],
                [298, 619, 295, 204, 0, -19, -5],
                [595, 619, 301, 203, 0, -21, -8],
                [1, 1, 284, 200, 1, -35, -11],
                [287, 1, 293, 198, 1, -31, -14],
                [582, 1, 306, 196, 1, -20, -16],
            ],
            animations: {
                idle: [0, 0],
                anim: [1, 14],
                start: [15],
                anim_1: [1, 14, "anim"],
                anim_2: [6, 14, "anim"],
                anim_3: [11, 14, "anim"],
            },
        });
        x = createSprite(
            z,
            "idle",
            HORSE_WIDTH / 2,
            HORSE_HEIGHT,
            HORSE_WIDTH,
            HORSE_HEIGHT
        );
        B.addChild(x);
    };
    this.startRace = function() {
        x.gotoAndPlay("anim_" + (Math.floor(3 * Math.random()) + 1));
        l = B.x;
        g = 0;
        h = u[n].frame;
        f = !0;
    };
    this.pauseAnim = function() {
        x.paused = !0;
    };
    this.unpauseAnim = function() {
        x.paused = !1;
    };
    this.getX = function() {
        return B.x;
    };
    this.update = function(D) {
        if (f) {
            g++;
            if (g >= h)
                n++,
                n < u.length ?
                ((g = 0), (h = u[n].frame), (l = B.x)) :
                (f = !1);
            else {
                var z = s_oTweenController.easeLinear(g, 0, 1, h);
                z = s_oTweenController.tweenValue(l, u[n].x, z);
                B.x = z;
            }
            D &&
                !d &&
                B.x >= q &&
                ((d = !0), s_oGame.horsePhotofinish(r - 1, p));
        }
    };
    var t = m;
    this._init(a, k, c, b, e);
}

function CTweenController() {
    this.tweenValue = function(a, k, c) {
        return a + c * (k - a);
    };
    this.easeLinear = function(a, k, c, b) {
        return (c * a) / b + k;
    };
    this.easeInCubic = function(a, k, c, b) {
        b = (a /= b) * a * a;
        return k + c * b;
    };
    this.easeBackInQuart = function(a, k, c, b) {
        b = (a /= b) * a;
        return k + c * (2 * b * b + 2 * b * a + -3 * b);
    };
    this.easeInBack = function(a, k, c, b) {
        return c * (a /= b) * a * (2.70158 * a - 1.70158) + k;
    };
    this.easeOutCubic = function(a, k, c, b) {
        return c * ((a = a / b - 1) * a * a + 1) + k;
    };
    this.getTrajectoryPoint = function(a, k) {
        var c = new createjs.Point(),
            b = (1 - a) * (1 - a),
            e = a * a;
        c.x = b * k.start.x + 2 * (1 - a) * a * k.traj.x + e * k.end.x;
        c.y = b * k.start.y + 2 * (1 - a) * a * k.traj.y + e * k.end.y;
        return c;
    };
}

function CRankingGui(a, k) {
    var c, b, e, m, f, d, r, g;
    this._init = function(l) {
        var n = s_oSpriteLibrary.getSprite("rank_panel");
        c = CANVAS_HEIGHT - n.height + 4;
        g = new createjs.Container();
        g.x = 0;
        g.y = c;
        h.addChild(g);
        n = createBitmap(n);
        g.addChild(n);
        f = [];
        f[0] = new createjs.Point(938, 44);
        f[1] = new createjs.Point(818, 44);
        f[2] = new createjs.Point(695, 44);
        f[3] = new createjs.Point(570, 44);
        f[4] = new createjs.Point(450, 44);
        f[5] = new createjs.Point(320, 44);
        f[6] = new createjs.Point(201, 44);
        f[7] = new createjs.Point(86, 44);
        this._initBibs(l);
        l = s_oSpriteLibrary.getSprite("fill_bar");
        d = createBitmap(l);
        d.x = 130;
        d.y = 114;
        g.addChild(d);
        b = l.width;
        e = b / NUM_TRACK_BG;
        r = new createjs.Shape();
        r.graphics
            .beginFill("rgba(255,255,255,0.01)")
            .drawRect(d.x, d.y - 2, 0.01, 10);
        g.addChild(r);
        d.mask = r;
        this.refreshButtonPos();
    };
    this.refreshButtonPos = function() {
        g.y = c - s_iOffsetY;
    };
    this._initBibs = function(l) {
        m = [];
        for (var n = 0; n < NUM_HORSES; n++) {
            var q = new createjs.Container();
            q.x = f[n].x;
            q.y = f[n].y;
            g.addChild(q);
            var p = createBitmap(s_oSpriteLibrary.getSprite("bib_gui_" + n));
            q.addChild(p);
            new CTLText(
                q, -5,
                2,
                60,
                12,
                12,
                "right",
                "#fff",
                TERTIARY_FONT,
                1,
                0,
                0,
                l[n].toUpperCase(), !0, !0, !1, !1
            );
            m.push(q);
        }
    };
    this.refreshRank = function(l) {
        for (var n = 0; n < l.length; n++)
            createjs.Tween.get(m[l[n].index]).to({ x: f[n].x },
                1e3,
                createjs.Ease.cubicOut
            );
    };
    this.refreshRadar = function(l) {
        r.graphics.clear();
        r.graphics
            .beginFill("rgba(255,255,255,0.01)")
            .drawRect(d.x, d.y - 2, e * l, 10);
    };
    var h = k;
    this._init(a);
}

function CArrivalPanel(a, k, c) {
    var b, e, m, f, d, r, g, h;
    this._init = function(n, q) {
        f = !1;
        d = 0;
        e = n;
        m = q;
        h = new createjs.Container();
        h.x = e;
        h.y = m;
        l.addChild(h);
        var p = s_oSpriteLibrary.getSprite("panel_arrival"),
            u = createBitmap(p);
        h.addChild(u);
        b = CANVAS_WIDTH - p.width - s_iOffsetX;
        p = s_oSpriteLibrary.getSprite("bibs");
        u = p.width / 4;
        var x = p.height / 2;
        p = new createjs.SpriteSheet({
            images: [p],
            frames: { width: u, height: x },
            animations: {
                bib_0: [0],
                bib_1: [1],
                bib_2: [2],
                bib_3: [3],
                bib_4: [4],
                bib_5: [5],
                bib_6: [6],
                bib_7: [7],
            },
        });
        r = [];
        g = [];
        for (var B = 4, t = 0; t < NUM_HORSES; t++) {
            var D = createSprite(p, "bib_0", 0, 0, u, x);
            D.x = 10;
            D.y = B;
            D.visible = !1;
            D.scaleX = D.scaleY = 0.45;
            h.addChild(D);
            g.push(D);
            D = new CTLText(
                h,
                D.x + 0.45 * u + 5,
                D.y + 5,
                120,
                20,
                16,
                "left",
                "#fff",
                TERTIARY_FONT,
                1,
                0,
                0,
                " ", !0, !0, !1, !1
            );
            r.push(D);
            B += 0.45 * x + 1;
        }
    };
    this.refreshButtonPos = function() {
        h.x = f ? b - s_iOffsetX : e - s_iOffsetX;
    };
    this.show = function() {
        f = !0;
        createjs.Tween.get(h).to({ x: b }, 500, createjs.Ease.cubicOut);
    };
    this.hide = function() {
        f = !1;
        createjs.Tween.get(h).to({ x: e }, 500, createjs.Ease.cubicOut);
    };
    this.refreshRank = function(n, q) {
        r[d].refreshText(q);
        g[d].gotoAndStop("bib_" + n);
        g[d].visible = !0;
        0 === d && this.show();
        d++;
    };
    var l = c;
    this._init(a, k);
}

function CWinPanel(a) {
    var k, c, b, e, m, f, d;
    this._init = function() {
        d = new createjs.Container();
        e = d.on("click", function() {});
        d.visible = !1;
        r.addChild(d);
        var g = createBitmap(s_oSpriteLibrary.getSprite("win_panel"));
        d.addChild(g);
        g = s_oSpriteLibrary.getSprite("bibs");
        k = g.width / 4;
        c = g.height / 2;
        b = new createjs.SpriteSheet({
            images: [g],
            frames: { width: k, height: c },
            animations: {
                bib_0: [0],
                bib_1: [1],
                bib_2: [2],
                bib_3: [3],
                bib_4: [4],
                bib_5: [5],
                bib_6: [6],
                bib_7: [7],
            },
        });
        f = new CTLText(
            d,
            CANVAS_WIDTH / 2 + 16,
            470,
            120,
            80,
            30,
            "center",
            "#ffde00",
            SECONDARY_FONT,
            1,
            0,
            0,
            TEXT_WIN, !0, !0, !0, !1
        );
        m = new CGfxButton(800, 510, s_oSpriteLibrary.getSprite("but_skip"), d);
        m.addEventListener(ON_MOUSE_UP, this.onSkip, this);
    };
    this.unload = function() {
        d.off("click", e);
        m.unload();
    };
    this.show = function(g, h, l) {
        f.refreshText(TEXT_WIN + "\n" + g + TEXT_CURRENCY);
        g = 240;
        for (var n = 0; 3 > n; n++) {
            var q = s_oSpriteLibrary.getSprite("horse_" + (l[n] + 1) + "_a"),
                p = s_oSpriteLibrary.getSprite("horse_" + (l[n] + 1) + "_b");
            q = new createjs.SpriteSheet({
                images: [q, p],
                frames: [
                    [1, 1, 249, 191, 0, -56, -19],
                    [252, 1, 307, 193, 0, -8, -19],
                    [561, 1, 308, 196, 0, -4, -16],
                    [1, 199, 307, 198, 0, -2, -14],
                    [310, 199, 306, 201, 0, -1, -11],
                    [618, 199, 307, 205, 0, 0, -7],
                    [1, 406, 305, 209, 0, -1, -3],
                    [308, 406, 304, 211, 0, -3, -1],
                    [614, 406, 301, 209, 0, -8, 0],
                    [1, 619, 295, 207, 0, -17, -2],
                    [298, 619, 295, 204, 0, -19, -5],
                    [595, 619, 301, 203, 0, -21, -8],
                    [1, 1, 284, 200, 1, -35, -11],
                    [287, 1, 293, 198, 1, -31, -14],
                    [582, 1, 306, 196, 1, -20, -16],
                ],
                animations: {
                    idle: [1, 1],
                    anim: [1, 14],
                    start: [15],
                    anim_1: [1, 14, "anim"],
                    anim_2: [6, 14, "anim"],
                    anim_3: [11, 14, "anim"],
                },
            });
            q = createSprite(
                q,
                "idle",
                HORSE_WIDTH / 2,
                HORSE_HEIGHT,
                HORSE_WIDTH,
                HORSE_HEIGHT
            );
            q.scaleX = q.scaleY = 0.35;
            q.x = CANVAS_WIDTH / 2 + 90;
            q.y = g;
            d.addChild(q);
            g += 68;
        }
        g = CANVAS_HEIGHT / 2 - 150;
        for (l = 0; l < h.length; l++)
            "forecast" === h[l].type ?
            ((q = h[l].horses),
                (p = createSprite(b, "bib_" + q[0], 0, 0, k, c)),
                (p.x = 380),
                (p.y = g),
                (p.scaleX = p.scaleY = 0.5),
                d.addChild(p),
                (n = new createjs.Text("X", "20px " + PRIMARY_FONT, "#fff")),
                (n.textAlign = "center"),
                (n.textBaseline = "middle"),
                (n.x = p.x + 0.5 * k + 10),
                (n.y = g + 18),
                d.addChild(n),
                (q = createSprite(b, "bib_" + q[1], 0, 0, k, c)),
                (q.x = n.x + 10),
                (q.y = g),
                (q.scaleX = q.scaleY = 0.5),
                d.addChild(q),
                (n = q.x + 35)) :
            ((p = createSprite(b, "bib_" + h[l].horses, 0, 0, k, c)),
                (p.x = 380),
                (p.y = g),
                (p.scaleX = p.scaleY = 0.5),
                d.addChild(p),
                (n = p.x + 35)),
            new CTLText(
                d,
                n,
                g + 8,
                80,
                20,
                20,
                "left",
                "#ffb400",
                PRIMARY_FONT,
                1,
                0,
                0,
                h[l].type.toUpperCase(), !0, !0, !1, !1
            ),
            new CTLText(
                d,
                n + 84,
                g + 8,
                80,
                20,
                20,
                "left",
                "#fff",
                PRIMARY_FONT,
                1,
                0,
                0,
                TEXT_WIN + ": " + h[l].win + TEXT_CURRENCY, !0, !0, !1, !1
            ),
            (g += 35);
        d.visible = !0;
        d.alpha = 0;
        createjs.Tween.get(d)
            .wait(1e3)
            .to({ alpha: 1 }, 500, createjs.Ease.cubicOut);
    };
    this.onSkip = function() {
        s_oGame.returnInBetPanel();
    };
    var r = a;
    this._init();
}

function CLosePanel(a) {
    var k, c, b, e, m, f, d;
    this._init = function() {
        d = new createjs.Container();
        d.visible = !1;
        m = d.on("click", function() {});
        r.addChild(d);
        var g = createBitmap(s_oSpriteLibrary.getSprite("lose_panel"));
        d.addChild(g);
        new CTLText(
            d,
            CANVAS_WIDTH / 2 - 200,
            260,
            400,
            50,
            50,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_NO_WIN, !0, !0, !1, !1
        );
        g = s_oSpriteLibrary.getSprite("bibs");
        k = g.width / 4;
        c = g.height / 2;
        e = new createjs.SpriteSheet({
            images: [g],
            frames: { width: k, height: c },
            animations: {
                bib_0: [0],
                bib_1: [1],
                bib_2: [2],
                bib_3: [3],
                bib_4: [4],
                bib_5: [5],
                bib_6: [6],
                bib_7: [7],
            },
        });
        b = [];
        g = createSprite(e, "bib_0", 0, 0, k, c);
        g.x = CANVAS_WIDTH / 2 - 100 - k / 2;
        g.y = 360;
        d.addChild(g);
        b.push(g);
        g = createSprite(e, "bib_0", 0, 0, k, c);
        g.x = CANVAS_WIDTH / 2 - k / 2;
        g.y = 360;
        d.addChild(g);
        b.push(g);
        g = createSprite(e, "bib_0", 0, 0, k, c);
        g.x = CANVAS_WIDTH / 2 + 100 - k / 2;
        g.y = 360;
        d.addChild(g);
        b.push(g);
        new CTLText(
            d,
            CANVAS_WIDTH / 2 - 120,
            450,
            240,
            30,
            30,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_WIN + ": 0.00 " + TEXT_CURRENCY, !0, !0, !1, !1
        );
        f = new CGfxButton(800, 510, s_oSpriteLibrary.getSprite("but_skip"), d);
        f.addEventListener(ON_MOUSE_UP, this.onSkip, this);
    };
    this.unload = function() {
        d.off("click", m);
        f.unload();
    };
    this.show = function(g) {
        for (var h = 0; 3 > h; h++) b[h].gotoAndStop("bib_" + g[h]);
        d.visible = !0;
        d.alpha = 0;
        createjs.Tween.get(d)
            .wait(1e3)
            .to({ alpha: 1 }, 500, createjs.Ease.cubicOut);
    };
    this.onSkip = function() {
        s_oGame.returnInBetPanel();
    };
    var r = a;
    this._init();
}

function CButStartRace(a, k, c, b, e, m, f) {
    var d, r, g, h, l;
    this._init = function(q, p, u, x, B, t) {
        d = [];
        r = [];
        x = createBitmap(u);
        g = new createjs.Container();
        g.x = q;
        g.y = p;
        g.regX = u.width / 2;
        g.regY = u.height / 2;
        g.addChild(x);
        n.addChild(g);
        s_bMobile || (g.cursor = "pointer");
        this._initListener();
    };
    this.unload = function() {
        g.off("mousedown", h);
        g.off("pressup", l);
        n.removeChild(g);
    };
    this.setVisible = function(q) {
        g.visible = q;
    };
    this._initListener = function() {
        h = g.on("mousedown", this.buttonDown);
        l = g.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(q, p, u) {
        d[q] = p;
        r[q] = u;
    };
    this.buttonRelease = function() {
        g.scaleX = 1;
        g.scaleY = 1;
        playSound("click", 1, 0);
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(r[ON_MOUSE_UP]);
    };
    this.buttonDown = function() {
        g.scaleX = 0.9;
        g.scaleY = 0.9;
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN]);
    };
    this.setPosition = function(q, p) {
        g.x = q;
        g.y = p;
    };
    this.setX = function(q) {
        g.x = q;
    };
    this.setY = function(q) {
        g.y = q;
    };
    this.getButtonImage = function() {
        return g;
    };
    this.getX = function() {
        return g.x;
    };
    this.getY = function() {
        return g.y;
    };
    var n = f;
    this._init(a, k, c, b, e, m);
    return this;
}

function CAreYouSurePanel(a) {
    var k, c, b, e;
    this._init = function() {
        e = new createjs.Container();
        k = e.on("click", function() {});
        e.visible = !1;
        m.addChild(e);
        var f = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        e.addChild(f);
        new CTLText(
            e,
            CANVAS_WIDTH / 2 - 200,
            290,
            400,
            100,
            50,
            "center",
            "#fff",
            PRIMARY_FONT,
            1,
            0,
            0,
            TEXT_ARE_YOU_SURE, !0, !0, !0, !1
        );
        c = new CGfxButton(
            CANVAS_WIDTH / 2 + 180,
            500,
            s_oSpriteLibrary.getSprite("but_yes"),
            e
        );
        c.addEventListener(ON_MOUSE_UP, this._onReleaseYes, this);
        b = new CGfxButton(
            CANVAS_WIDTH / 2 - 180,
            500,
            s_oSpriteLibrary.getSprite("but_no"),
            e
        );
        b.addEventListener(ON_MOUSE_UP, this._onReleaseNo, this);
    };
    this.unload = function() {
        e.off("click", k);
        b.unload();
        c.unload();
    };
    this.show = function() {
        e.visible = !0;
        e.alpha = 0;
        createjs.Tween.get(e).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);
    };
    this._onReleaseYes = function() {
        s_oGame.onExit();
    };
    this._onReleaseNo = function() {
        e.visible = !1;
        s_oGame.unpause();
    };
    var m = a;
    this._init(a);
}

function CGate(a, k, c, b) {
    var e;
    this._init = function(f, d, r) {
        r = s_oSpriteLibrary.getSprite("gate_" + r);
        var g = new createjs.SpriteSheet({
            images: [r],
            frames: { width: r.width / 5, height: r.height },
            animations: {
                idle: [0, 0],
                anim: [0, 4, "stop_anim"],
                stop_anim: [4, 4],
            },
        });
        e = createSprite(g, "idle", 0, 0, r.width / 5, r.height);
        e.x = f;
        e.y = d;
        m.addChild(e);
    };
    this.unload = function() {
        m.removeChild(e);
    };
    this.playAnim = function() {
        e.gotoAndPlay("anim");
    };
    this.decreaseX = function(f) {
        e.x -= f;
    };
    var m = b;
    this._init(a, k, c);
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (
                var a = this._iFontSize;
                (this._oText.getBounds().height >
                    this._iHeight - 2 * this._iPaddingV ||
                    this._oText.getBounds().width >
                    this._iWidth - 2 * this._iPaddingH) &&
                !(a--,
                    (this._oText.font = a + "px " + this._szFont),
                    (this._oText.lineHeight = Math.round(
                        a * this._fLineHeightFactor
                    )),
                    this.__updateY(),
                    this.__verticalAlign(),
                    8 > a);

            );
            this._iFontSize = a;
        }
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV;
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y +=
                    this._oText.lineHeight / 2 +
                    (this._iFontSize * this._fLineHeightFactor -
                        this._iFontSize);
        }
    },
    __createText: function(a) {
        this._bDebug &&
            ((this._oDebugShape = new createjs.Shape()),
                this._oDebugShape.graphics
                .beginFill("rgba(255,0,0,0.5)")
                .drawRect(this._x, this._y, this._iWidth, this._iHeight),
                this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(
            a,
            this._iFontSize + "px " + this._szFont,
            this._szColor
        );
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(
            this._iFontSize * this._fLineHeightFactor
        );
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ?
            this._iWidth - 2 * this._iPaddingH :
            null;
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._x + this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._x + this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._x + this._iWidth - this._iPaddingH;
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a);
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a;
    },
    setOutline: function(a) {
        null !== this._oText && (this._oText.outline = a);
    },
    setShadow: function(a, k, c, b) {
        null !== this._oText &&
            (this._oText.shadow = new createjs.Shadow(a, k, c, b));
    },
    setColor: function(a) {
        this._oText.color = a;
    },
    setAlpha: function(a) {
        this._oText.alpha = a;
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText);
    },
    getText: function() {
        return this._oText;
    },
    getY: function() {
        return this._y;
    },
    getFontSize: function() {
        return this._iFontSize;
    },
    refreshText: function(a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(
            this._iFontSize * this._fLineHeightFactor
        );
        this.__autofit();
        this.__updateY();
        this.__verticalAlign();
    },
};

function CTLText(a, k, c, b, e, m, f, d, r, g, h, l, n, q, p, u, x) {
    this._oContainer = a;
    this._x = k;
    this._y = c;
    this._iWidth = b;
    this._iHeight = e;
    this._bMultiline = u;
    this._iFontSize = m;
    this._szAlign = f;
    this._szColor = d;
    this._szFont = r;
    this._iPaddingH = h;
    this._iPaddingV = l;
    this._bVerticalAlign = p;
    this._bFitText = q;
    this._bDebug = x;
    this._oDebugShape = null;
    this._fLineHeightFactor = g;
    this._oText = null;
    n && this.__createText(n);
}

function CFicheBut(a, k, c, b, e) {
    var m,
        f,
        d,
        r = [],
        g,
        h;
    this._init = function(l, n) {
        var q = s_oSpriteLibrary.getSprite("fiche_" + a);
        m = !1;
        h = new createjs.Container();
        h.x = l;
        h.y = n;
        h.regX = q.width / 2;
        h.regY = q.height / 2;
        e.addChild(h);
        f = [];
        d = [];
        g = createBitmap(q);
        g.regX = q.width / 2;
        g.regY = q.height / 2;
        g.cursor = "pointer";
        h.addChild(g);
        h.scaleX = h.scaleY = b;
        new CTLText(
            h, -10, -10,
            18,
            18,
            20,
            "center",
            COLOR_FICHES[a],
            PRIMARY_FONT,
            1.1,
            0,
            0,
            CHIP_VALUES[a], !0, !0, !1, !1
        );
        this._initListener();
    };
    this.unload = function() {
        h.off("mousedown", this.buttonDown);
        h.off("pressup", this.buttonRelease);
        e.removeChild(h);
    };
    this.select = function() {};
    this.deselect = function() {};
    this.enable = function() {
        m = !1;
    };
    this.disable = function() {
        m = !0;
    };
    this.setVisible = function(l) {
        h.visible = l;
    };
    this._initListener = function() {
        h.on("mousedown", this.buttonDown);
        h.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function(l, n, q) {
        f[l] = n;
        d[l] = q;
    };
    this.addEventListenerWithParams = function(l, n, q, p) {
        f[l] = n;
        d[l] = q;
        r = p;
    };
    this.buttonRelease = function() {
        m ||
            (playSound("click", 1, !1),
                (h.scaleX = b),
                (h.scaleY = b),
                f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(d[ON_MOUSE_UP], r));
    };
    this.buttonDown = function() {
        m ||
            ((h.scaleX = 0.9 * b),
                (h.scaleY = 0.9 * b),
                f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN], r));
    };
    this.setPosition = function(l, n) {
        h.x = l;
        h.y = n;
    };
    this.setX = function(l) {
        h.x = l;
    };
    this.setY = function(l) {
        h.y = l;
    };
    this.getX = function() {
        return h.x;
    };
    this.getY = function() {
        return h.y;
    };
    this._init(k, c);
}

function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
    a = extractHostname(a);
    var k = a.split("."),
        c = k.length;
    2 < c && (a = k[c - 2] + "." + k[c - 1]);
    return a;
}
var getClosestTop = function() {
        var a = window,
            k = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    k = !0;
                    break;
                }
        } catch (c) {
            k = !0;
        }
        return { topFrame: a, err: k };
    },
    getBestPageUrl = function(a) {
        var k = a.topFrame,
            c = "";
        if (a.err)
            try {
                try {
                    c = window.top.location.href;
                } catch (e) {
                    var b = window.location.ancestorOrigins;
                    c = b[b.length - 1];
                }
            } catch (e) {
                c = k.document.referrer;
            }
        else c = k.location.href;
        return c;
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    return true;
}