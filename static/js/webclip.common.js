!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.WebClip = e() : t.WebClip = e()
}(this, function() {
    return function(t) {
        function e(o) {
            if (n[o])
                return n[o].exports;
            var i = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return t[o].call(i.exports, i, i.exports, e),
            i.loaded = !0,
            i.exports
        }
        var n = {};
        return e.m = t,
        e.c = n,
        e.p = "",
        e(0)
    }([function(t, e, n) {
        "use strict";
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            var n = document.createElement("ul")
              , o = this;
            return n.classList.add("webclip-toolbar"),
            this.plugins.map(function(t) {
                var e = document.createElement("li");
                if (e.classList.add("webclip-item"),
                e.setAttribute("title", t.description || t.name),
                t.icon) {
                    var i = document.createElement("i");
                    e.classList.add("webclip-icon", "fa", "fa-" + t.icon),
                    e.appendChild(i)
                } else
                    e.textContent = t.name.charAt(0).toUpperCase();
                e.addEventListener("click", function(e) {
                    t.action(o.selectedContent, o.selection.getRangeAt(0).cloneRange())
                }),
                n.appendChild(e)
            }),
            this.el.appendChild(n)
        }
        function l(t) {
            setTimeout(t, 100)
        }
        var s = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(t, o.key, o)
                }
            }
            return function(e, n, o) {
                return n && t(e.prototype, n),
                o && t(e, o),
                e
            }
        }();
        n(1);
        var r = function() {
            function t(e) {
                var n = this;
                o(this, t),
                this.el = e,
                this.plugins = [],
                this.selectedContent = null,
                this.selection = null,
                this.toolbar = null,
                this.el.addEventListener("mousedown", function(t) {
                    n.selectedContent
                }),
                this.el.addEventListener("mouseup", function(t) {
                    l(function() {
                        if (n.selection = window.getSelection(),
                        n.selectedContent = n.selection.toString(),
                        "Range" === n.selection.type) {
                            var t = n.selection.getRangeAt(0).cloneRange()
                              , e = t.getBoundingClientRect();
                            n.showToolbar(e)
                        } else
                            n.hideToolbar()
                    })
                })
            }
            return s(t, [{
                key: "use",
                value: function(t) {
                    Array.isArray(t) ? this.plugins = t : this.plugins.push(t)
                }
            }, {
                key: "showToolbar",
                value: function(t, e) {
                    this.toolbar || (this.toolbar = i.call(this)),
                    this.toolbar.style.display = "",
                    this.toolbar.style.opacity = "1";
                    var n = this.toolbar.offsetWidth
                      , o = this.toolbar.offsetHeight;
                    this.toolbar.style.left = (t.right - t.left) / 2 + t.left - n / 2 + "px",
                    this.toolbar.style.top = t.top - o - 4 + document.body.scrollTop + "px"
                }
            }, {
                key: "hideToolbar",
                value: function() {
                    var t = this;
                    this.toolbar && (this.toolbar.style.opacity = "0",
                    l(function() {
                        t.toolbar.style.display = "none"
                    }))
                }
            }]),
            t
        }();
        t.exports = r
    }
    , function(t, e) {}
    ])
});