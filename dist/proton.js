/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(4);


var Proton = {
    install: function install(Vue) {
        var nameReg = /([a-z0-9]+)\./i;

        Object.values(__WEBPACK_IMPORTED_MODULE_0__components__).forEach(function (pComponent) {
            Vue.use(pComponent);
        });
    }
};

// Auto-install plugin
var GlobalVue = null;

if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.vue;
}

if (GlobalVue) {
    GlobalVue.use(Proton);
}

/* harmony default export */ __webpack_exports__["default"] = (Proton);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pButton__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pButton", function() { return __WEBPACK_IMPORTED_MODULE_0__pButton__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pCard__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pCard", function() { return __WEBPACK_IMPORTED_MODULE_1__pCard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pChart__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pChart", function() { return __WEBPACK_IMPORTED_MODULE_2__pChart__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pInput__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pInput", function() { return __WEBPACK_IMPORTED_MODULE_3__pInput__["a"]; });





/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pButton__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pButton__);


/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
    Vue.component(__WEBPACK_IMPORTED_MODULE_0__pButton___default.a.name, __WEBPACK_IMPORTED_MODULE_0__pButton___default.a);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(7)
/* template */
var __vue_template__ = __webpack_require__(8)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/pButton/pButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6accbd6", Component.options)
  } else {
    hotAPI.reload("data-v-b6accbd6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'p-button',

    data: function data() {
        return {
            themes: {
                default: '',
                primary: 'button--primary',
                secondary: 'button--secondary',
                info: 'button--info',
                success: 'button--success',
                warning: 'button--warning',
                danger: 'button--danger',
                dark: 'button--dark'
            },

            sizes: {
                normal: '',
                small: 'button--small',
                large: 'button--large'
            }
        };
    },


    props: {
        type: {
            required: false,
            type: String,
            default: 'button'
        },

        to: {
            required: false,
            type: String | Object
        },

        href: {
            required: false,
            type: String
        },

        theme: {
            required: false,
            type: String,
            default: 'default'
        },

        size: {
            required: false,
            type: String,
            default: 'normal'
        },

        disabled: {
            required: false,
            type: Boolean,
            default: false
        }
    },

    computed: {
        variant: function variant() {
            //
        }
    }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "button",
      class: [_vm.themes[_vm.theme], _vm.sizes[_vm.size]],
      attrs: { type: _vm.type, disabled: _vm.disabled },
      nativeOn: {
        click: function($event) {
          _vm.$emit("click", $event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b6accbd6", module.exports)
  }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pCard__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pCard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pCard__);


/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
    Vue.component(__WEBPACK_IMPORTED_MODULE_0__pCard___default.a.name, __WEBPACK_IMPORTED_MODULE_0__pCard___default.a);
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(11)
/* template */
var __vue_template__ = __webpack_require__(12)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/pCard/pCard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b96e211", Component.options)
  } else {
    hotAPI.reload("data-v-4b96e211", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'p-card',

    data: function data() {
        return {
            themes: {
                default: '',
                primary: 'card--primary',
                secondary: 'card--secondary',
                info: 'card--info',
                success: 'card--success',
                warning: 'card--warning',
                danger: 'card--danger',
                dark: 'card--dark'
            }
        };
    },


    props: {
        noBody: {
            required: false,
            type: Boolean,
            default: false
        },

        theme: {
            required: false,
            type: String,
            default: 'default'
        }
    },

    computed: {
        styles: function styles() {
            var styles = {};

            styles['card__body'] = !this.noBody;
            styles[this.themes[this.theme]] = true;

            return styles;
        }
    }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [
    _c("div", { class: _vm.styles }, [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4b96e211", module.exports)
  }
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pChart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pChart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pChart__);


/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
    Vue.component(__WEBPACK_IMPORTED_MODULE_0__pChart___default.a.name, __WEBPACK_IMPORTED_MODULE_0__pChart___default.a);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(15)
/* template */
var __vue_template__ = __webpack_require__(17)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/pChart/pChart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-444cfc62", Component.options)
  } else {
    hotAPI.reload("data-v-444cfc62", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_frappe_charts_dist_frappe_charts_min_esm__ = __webpack_require__(16);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'p-chart',

    data: function data() {
        return {
            chart: null,
            data: {
                labels: this.labels,
                datasets: this.dataSets
            },
            heatmapData: {
                dataPoints: this.dataPoints,
                start: this.startDate,
                end: this.endDate,
                countLabel: this.countLabel
            }
        };
    },


    props: {
        name: {
            required: true,
            type: String,
            default: null
        },

        dataSets: {
            required: false,
            type: Array,
            default: function _default() {
                return [];
            }
        },

        labels: {
            required: false,
            type: Array,
            default: function _default() {
                return [];
            }
        },

        startDate: {
            required: false,
            type: Date,
            default: null
        },

        endDate: {
            required: false,
            type: Date,
            default: null
        },

        dataPoints: {
            required: false,
            type: Object,
            default: function _default() {}
        },

        countLabel: {
            required: false,
            type: String,
            deefault: 'Count'
        },

        title: {
            required: false,
            type: String
        },

        height: {
            required: false,
            type: Number,
            default: 300
        },

        type: {
            required: false,
            type: String,
            default: 'bar'
        },

        yMarkers: {
            required: false,
            type: Array,
            default: function _default() {
                return [{
                    label: 'Marker',
                    value: 70,
                    options: {
                        labelPos: 'left'
                    }
                }];
            }
        },

        yRegions: {
            required: false,
            type: Array,
            default: function _default() {
                return [{
                    label: 'Region',
                    start: -10,
                    end: 50,
                    options: {
                        labelPos: 'right'
                    }
                }];
            }
        },

        colors: {
            required: false,
            type: Array,
            default: function _default() {
                return ['purple', '#ffa3ef', 'light-blue'];
            }
        },

        isNavigable: {
            required: false,
            type: Boolean,
            default: false
        },

        valuesOverPoints: {
            required: false,
            type: Boolean,
            default: false
        },

        lineOptions: {
            required: false,
            type: Object,
            default: function _default() {
                return {
                    dotSize: 4,
                    hideLine: 0,
                    hideDots: 0,
                    heatLine: 0,
                    regionFill: 0,
                    areaFill: 0
                };
            }
        },

        axisOptions: {
            required: false,
            type: Object,
            default: function _default() {
                return {
                    yAxisMode: '',
                    xAxisMode: '',
                    xIsSeries: 0
                };
            }
        },

        maxLegendPoints: {
            required: false,
            type: Number,
            default: 20
        },

        maxSlices: {
            required: false,
            type: Number,
            default: 20
        },

        barOptions: {
            required: false,
            type: Object,
            default: function _default() {
                return {
                    height: 20,
                    depth: 2,
                    spaceRatio: 0.5,
                    stacked: 0
                };
            }
        },

        discreteDomains: {
            required: false,
            type: Boolean,
            default: true
        },

        tooltipOptions: {
            required: false,
            type: Object,
            default: function _default() {
                return {
                    formatTooltipX: function formatTooltipX(d) {
                        return (d + '').toUpperCase();
                    },
                    formatTooltipY: function formatTooltipY(d) {
                        return d + ' pts';
                    }
                };
            }
        }
    },

    mounted: function mounted() {
        this.mount();
    },


    methods: {
        mount: function mount() {
            var mountedOptions = {
                type: this.type,
                discreteDomains: this.discreteDomains,
                colors: this.colors,
                height: this.height,
                title: this.title,
                isNavigable: this.isNavigable
            };

            var heatMapOptions = {
                data: this.heatmapData
            };

            var chartOptions = {
                data: this.data,
                tooltipOptions: this.tooltipOptions,
                valuesOverPoints: this.valuesOverPoints,
                barOptions: this.barOptions,
                lineOptions: this.lineOptions,
                axisOptions: this.axisOptions,
                maxLegendPoints: this.maxLegendPoints,
                maxSlices: this.maxSlices
            };

            var options = this.type === 'heatmap' ? _extends({}, mountedOptions, heatMapOptions) : _extends({}, mountedOptions, chartOptions);

            this.chart = new __WEBPACK_IMPORTED_MODULE_0_frappe_charts_dist_frappe_charts_min_esm__["a" /* Chart */]('#proton-chart-' + this.name, options);
        },
        export: function _export() {
            this.chart.export();
        },
        addDataPoint: function addDataPoint(label, valueFromEachDataset, index) {
            this.chart.addDataPoint(label, valueFromEachDataset, index);
        },
        removeDataPoint: function removeDataPoint(index) {
            this.chart.removeDataPoint(index);
        },
        updateDataset: function updateDataset(datasetValues, index) {
            this.chart.updateDataset(datasetValues, index);
        },
        unbindWindowEvents: function unbindWindowEvents() {
            this.chart.unbindWindowEvents();
        }
    }
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chart; });
/* unused harmony export PercentageChart */
/* unused harmony export PieChart */
/* unused harmony export Heatmap */
/* unused harmony export AxisChart */
function __$styleInject(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&i.firstChild?i.insertBefore(a,i.firstChild):i.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))}}function $(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function getOffset(t){var e=t.getBoundingClientRect();return{top:e.top+(document.documentElement.scrollTop||document.body.scrollTop),left:e.left+(document.documentElement.scrollLeft||document.body.scrollLeft)}}function isElementInViewport(t){var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function getElementContentWidth(t){var e=window.getComputedStyle(t),n=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight);return t.clientWidth-n}function fire(t,e,n){var i=document.createEvent("HTMLEvents");i.initEvent(e,!0,!0);for(var a in n)i[a]=n[a];return t.dispatchEvent(i)}function getTopOffset(t){return t.titleHeight+t.margins.top+t.paddings.top}function getLeftOffset(t){return t.margins.left+t.paddings.left}function getExtraHeight(t){return t.margins.top+t.margins.bottom+t.paddings.top+t.paddings.bottom+t.titleHeight+t.legendHeight}function getExtraWidth(t){return t.margins.left+t.margins.right+t.paddings.left+t.paddings.right}function _classCallCheck$4(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function floatTwo(t){return parseFloat(t.toFixed(2))}function fillArray(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];n||(n=i?t[0]:t[t.length-1]);var a=new Array(Math.abs(e)).fill(n);return t=i?a.concat(t):t.concat(a)}function getStringWidth(t,e){return(t+"").length*e}function getPositionByAngle(t,e){return{x:Math.sin(t*ANGLE_RATIO)*e,y:Math.cos(t*ANGLE_RATIO)*e}}function getBarHeightAndYAttr(t,e){var n=void 0,i=void 0;return t<=e?(n=e-t,i=t):(n=t-e,i=e),[n,i]}function equilizeNoOfElements(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length-t.length;return n>0?t=fillArray(t,n):e=fillArray(e,n),[t,e]}function limitColor(t){return t>255?255:t<0?0:t}function lightenDarkenColor(t,e){var n=getColor(t),i=!1;"#"==n[0]&&(n=n.slice(1),i=!0);var a=parseInt(n,16),r=limitColor((a>>16)+e),o=limitColor((a>>8&255)+e),s=limitColor((255&a)+e);return(i?"#":"")+(s|o<<8|r<<16).toString(16)}function isValidColor(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)}function $$1(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function createSVG(t,e){var n=document.createElementNS("http://www.w3.org/2000/svg",t);for(var i in e){var a=e[i];if("inside"===i)$$1(a).appendChild(n);else if("around"===i){var r=$$1(a);r.parentNode.insertBefore(n,r),n.appendChild(r)}else"styles"===i?"object"===(void 0===a?"undefined":_typeof$2(a))&&Object.keys(a).map(function(t){n.style[t]=a[t]}):("className"===i&&(i="class"),"innerHTML"===i?n.textContent=a:n.setAttribute(i,a))}return n}function renderVerticalGradient(t,e){return createSVG("linearGradient",{inside:t,id:e,x1:0,x2:0,y1:0,y2:1})}function setGradientStop(t,e,n,i){return createSVG("stop",{inside:t,style:"stop-color: "+n,offset:e,"stop-opacity":i})}function makeSVGContainer(t,e,n,i){return createSVG("svg",{className:e,inside:t,width:n,height:i})}function makeSVGDefs(t){return createSVG("defs",{inside:t})}function makeSVGGroup(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,i={className:t,transform:e};return n&&(i.inside=n),createSVG("g",i)}function makePath(t){return createSVG("path",{className:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",d:t,styles:{stroke:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",fill:arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none"}})}function makeArcPathStr(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=n.x+t.x,o=n.y+t.y,s=n.x+e.x,l=n.y+e.y;return"M"+n.x+" "+n.y+"\n\t\tL"+r+" "+o+"\n\t\tA "+i+" "+i+" 0 0 "+(a?1:0)+"\n\t\t"+s+" "+l+" z"}function makeGradient(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i="path-fill-gradient-"+e+"-"+(n?"lighter":"default"),a=renderVerticalGradient(t,i),r=[1,.6,.2];return n&&(r=[.4,.2,0]),setGradientStop(a,"0%",e,r[0]),setGradientStop(a,"50%",e,r[1]),setGradientStop(a,"100%",e,r[2]),i}function percentageBar(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:PERCENTAGE_BAR_DEFAULT_DEPTH,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none";return createSVG("rect",{className:"percentage-bar",x:t,y:e,width:n,height:i,fill:r,styles:{stroke:lightenDarkenColor(r,-25),"stroke-dasharray":"0, "+(i+n)+", "+n+", "+i,"stroke-width":a}})}function heatSquare(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"none",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},o={className:t,x:e,y:n,width:i,height:i,fill:a};return Object.keys(r).map(function(t){o[t]=r[t]}),createSVG("rect",o)}function legendBar(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",a=arguments[4],r={className:"legend-bar",x:0,y:0,width:n,height:"2px",fill:i},o=createSVG("text",{className:"legend-dataset-text",x:0,y:0,dy:2*FONT_SIZE+"px","font-size":1.2*FONT_SIZE+"px","text-anchor":"start",fill:FONT_FILL,innerHTML:a}),s=createSVG("g",{transform:"translate("+t+", "+e+")"});return s.appendChild(createSVG("rect",r)),s.appendChild(o),s}function legendDot(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",a=arguments[4],r={className:"legend-dot",cx:0,cy:0,r:n,fill:i},o=createSVG("text",{className:"legend-dataset-text",x:0,y:0,dx:FONT_SIZE+"px",dy:FONT_SIZE/3+"px","font-size":1.2*FONT_SIZE+"px","text-anchor":"start",fill:FONT_FILL,innerHTML:a}),s=createSVG("g",{transform:"translate("+t+", "+e+")"});return s.appendChild(createSVG("circle",r)),s.appendChild(o),s}function makeText(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=a.fontSize||FONT_SIZE;return createSVG("text",{className:t,x:e,y:n,dy:(void 0!==a.dy?a.dy:r/2)+"px","font-size":r+"px",fill:a.fill||FONT_FILL,"text-anchor":a.textAnchor||"start",innerHTML:i})}function makeVertLine(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};a.stroke||(a.stroke=BASE_LINE_COLOR);var r=createSVG("line",{className:"line-vertical "+a.className,x1:0,x2:0,y1:n,y2:i,styles:{stroke:a.stroke}}),o=createSVG("text",{x:0,y:n>i?n+LABEL_MARGIN:n-LABEL_MARGIN-FONT_SIZE,dy:FONT_SIZE+"px","font-size":FONT_SIZE+"px","text-anchor":"middle",innerHTML:e+""}),s=createSVG("g",{transform:"translate("+t+", 0)"});return s.appendChild(r),s.appendChild(o),s}function makeHoriLine(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};a.stroke||(a.stroke=BASE_LINE_COLOR),a.lineType||(a.lineType="");var r=createSVG("line",{className:"line-horizontal "+a.className+("dashed"===a.lineType?"dashed":""),x1:n,x2:i,y1:0,y2:0,styles:{stroke:a.stroke}}),o=createSVG("text",{x:n<i?n-LABEL_MARGIN:n+LABEL_MARGIN,y:0,dy:FONT_SIZE/2-2+"px","font-size":FONT_SIZE+"px","text-anchor":n<i?"end":"start",innerHTML:e+""}),s=createSVG("g",{transform:"translate(0, "+t+")","stroke-opacity":1});return 0!==o&&"0"!==o||(s.style.stroke="rgba(27, 31, 35, 0.6)"),s.appendChild(r),s.appendChild(o),s}function yLine(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};i.pos||(i.pos="left"),i.offset||(i.offset=0),i.mode||(i.mode="span"),i.stroke||(i.stroke=BASE_LINE_COLOR),i.className||(i.className="");var a=-1*AXIS_TICK_LENGTH,r="span"===i.mode?n+AXIS_TICK_LENGTH:0;return"tick"===i.mode&&"right"===i.pos&&(a=n+AXIS_TICK_LENGTH,r=n),a+=i.offset,r+=i.offset,makeHoriLine(t,e,a,r,{stroke:i.stroke,className:i.className,lineType:i.lineType})}function xLine(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};i.pos||(i.pos="bottom"),i.offset||(i.offset=0),i.mode||(i.mode="span"),i.stroke||(i.stroke=BASE_LINE_COLOR),i.className||(i.className="");var a=n+AXIS_TICK_LENGTH,r="span"===i.mode?-1*AXIS_TICK_LENGTH:n;return"tick"===i.mode&&"top"===i.pos&&(a=-1*AXIS_TICK_LENGTH,r=0),makeVertLine(t,e,a,r,{stroke:i.stroke,className:i.className,lineType:i.lineType})}function yMarker(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};i.labelPos||(i.labelPos="right");var a=createSVG("text",{className:"chart-label",x:"left"===i.labelPos?LABEL_MARGIN:n-getStringWidth(e,5)-LABEL_MARGIN,y:0,dy:FONT_SIZE/-2+"px","font-size":FONT_SIZE+"px","text-anchor":"start",innerHTML:e+""}),r=makeHoriLine(t,"",0,n,{stroke:i.stroke||BASE_LINE_COLOR,className:i.className||"",lineType:i.lineType});return r.appendChild(a),r}function yRegion(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=t-e,o=createSVG("rect",{className:"bar mini",styles:{fill:"rgba(228, 234, 239, 0.49)",stroke:BASE_LINE_COLOR,"stroke-dasharray":n+", "+r},x:0,y:0,width:n,height:r});a.labelPos||(a.labelPos="right");var s=createSVG("text",{className:"chart-label",x:"left"===a.labelPos?LABEL_MARGIN:n-getStringWidth(i+"",4.5)-LABEL_MARGIN,y:0,dy:FONT_SIZE/-2+"px","font-size":FONT_SIZE+"px","text-anchor":"start",innerHTML:i+""}),l=createSVG("g",{transform:"translate(0, "+e+")"});return l.appendChild(o),l.appendChild(s),l}function datasetBar(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:{},l=getBarHeightAndYAttr(e,s.zeroLine),u=_slicedToArray(l,2),c=u[0],h=u[1];h-=o,0===c&&(c=s.minHeight,h-=s.minHeight);var d=createSVG("rect",{className:"bar mini",style:"fill: "+i,"data-point-index":r,x:t,y:h,width:n,height:c});if((a+="")||a.length){d.setAttribute("y",0),d.setAttribute("x",0);var f=createSVG("text",{className:"data-point-value",x:n/2,y:0,dy:FONT_SIZE/2*-1+"px","font-size":FONT_SIZE+"px","text-anchor":"middle",innerHTML:a}),p=createSVG("g",{"data-point-index":r,transform:"translate("+t+", "+h+")"});return p.appendChild(d),p.appendChild(f),p}return d}function datasetDot(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=createSVG("circle",{style:"fill: "+i,"data-point-index":r,cx:t,cy:e,r:n});if((a+="")||a.length){o.setAttribute("cy",0),o.setAttribute("cx",0);var s=createSVG("text",{className:"data-point-value",x:0,y:0,dy:FONT_SIZE/2*-1-n+"px","font-size":FONT_SIZE+"px","text-anchor":"middle",innerHTML:a}),l=createSVG("g",{"data-point-index":r,transform:"translate("+t+", "+e+")"});return l.appendChild(o),l.appendChild(s),l}return o}function getPaths(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},r=e.map(function(e,n){return t[n]+","+e}).join("L"),o=makePath("M"+r,"line-graph-path",n);if(i.heatline){var s=makeGradient(a.svgDefs,n);o.style.stroke="url(#"+s+")"}var l={path:o};if(i.regionFill){var u=makeGradient(a.svgDefs,n,!0),c="M"+t[0]+","+a.zeroLine+"L"+r+"L"+t.slice(-1)[0]+","+a.zeroLine;l.region=makePath(c,"region-fill","none","url(#"+u+")")}return l}function translate(t,e,n,i){var a="string"==typeof e?e:e.join(", ");return[t,{transform:n.join(", ")},i,STD_EASING,"translate",{transform:a}]}function translateVertLine(t,e,n){return translate(t,[n,0],[e,0],MARKER_LINE_ANIM_DUR)}function translateHoriLine(t,e,n){return translate(t,[0,n],[0,e],MARKER_LINE_ANIM_DUR)}function animateRegion(t,e,n,i){var a=e-n,r=t.childNodes[0];return[[r,{height:a,"stroke-dasharray":r.getAttribute("width")+", "+a},MARKER_LINE_ANIM_DUR,STD_EASING],translate(t,[0,i],[0,n],MARKER_LINE_ANIM_DUR)]}function animateBar(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=getBarHeightAndYAttr(n,(arguments.length>5&&void 0!==arguments[5]?arguments[5]:{}).zeroLine),o=_slicedToArray$2(r,2),s=o[0],l=o[1];return l-=a,"rect"!==t.nodeName?[[t.childNodes[0],{width:i,height:s},UNIT_ANIM_DUR,STD_EASING],translate(t,t.getAttribute("transform").split("(")[1].slice(0,-1),[e,l],MARKER_LINE_ANIM_DUR)]:[[t,{width:i,height:s,x:e,y:l},UNIT_ANIM_DUR,STD_EASING]]}function animateDot(t,e,n){return"circle"!==t.nodeName?[translate(t,t.getAttribute("transform").split("(")[1].slice(0,-1),[e,n],MARKER_LINE_ANIM_DUR)]:[[t,{cx:e,cy:n},UNIT_ANIM_DUR,STD_EASING]]}function animatePath(t,e,n,i){var a=[],r=n.map(function(t,n){return e[n]+","+t}).join("L"),o=[t.path,{d:"M"+r},PATH_ANIM_DUR,STD_EASING];if(a.push(o),t.region){var s=e[0]+","+i+"L",l="L"+e.slice(-1)[0]+", "+i,u=[t.region,{d:"M"+s+r+l},PATH_ANIM_DUR,STD_EASING];a.push(u)}return a}function animatePathStr(t,e){return[t,{d:e},UNIT_ANIM_DUR,STD_EASING]}function _toConsumableArray$1(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function animateSVGElement(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"linear",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},o=t.cloneNode(!0),s=t.cloneNode(!0);for(var l in e){var u=void 0;u="transform"===l?document.createElementNS("http://www.w3.org/2000/svg","animateTransform"):document.createElementNS("http://www.w3.org/2000/svg","animate");var c=r[l]||t.getAttribute(l),h=e[l],d={attributeName:l,from:c,to:h,begin:"0s",dur:n/1e3+"s",values:c+";"+h,keySplines:EASING[i],keyTimes:"0;1",calcMode:"spline",fill:"freeze"};a&&(d.type=a);for(var f in d)u.setAttribute(f,d[f]);o.appendChild(u),a?s.setAttribute(l,"translate("+h+")"):s.setAttribute(l,h)}return[o,s]}function transform(t,e){t.style.transform=e,t.style.webkitTransform=e,t.style.msTransform=e,t.style.mozTransform=e,t.style.oTransform=e}function animateSVG(t,e){var n=[],i=[];e.map(function(t){var e=t[0],a=e.parentNode,r=void 0,o=void 0;t[0]=e;var s=animateSVGElement.apply(void 0,_toConsumableArray$1(t)),l=_slicedToArray$1(s,2);r=l[0],o=l[1],n.push(o),i.push([r,a]),a.replaceChild(r,e)});var a=t.cloneNode(!0);return i.map(function(t,i){t[1].replaceChild(n[i],t[0]),e[i][0]=n[i]}),a}function runSMILAnimation(t,e,n){if(0!==n.length){var i=animateSVG(e,n);e.parentNode==t&&(t.removeChild(e),t.appendChild(i)),setTimeout(function(){i.parentNode==t&&(t.removeChild(i),t.appendChild(e))},REPLACE_ALL_NEW_DUR)}}function downloadFile(t,e){var n=document.createElement("a");n.style="display: none";var i=new Blob(e,{type:"image/svg+xml; charset=utf-8"}),a=window.URL.createObjectURL(i);n.href=a,n.download=t,document.body.appendChild(n),n.click(),setTimeout(function(){document.body.removeChild(n),window.URL.revokeObjectURL(a)},300)}function prepareForExport(t){var e=t.cloneNode(!0);e.classList.add("chart-container"),e.setAttribute("xmlns","http://www.w3.org/2000/svg"),e.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");var n=$.create("style",{innerHTML:CSSTEXT});e.insertBefore(n,e.firstChild);var i=$.create("div");return i.appendChild(e),i.innerHTML}function _classCallCheck$3(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck$2(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$1(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$1(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function treatAsUtc(t){var e=new Date(t);return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e}function getYyyyMmDd(t){var e=t.getDate(),n=t.getMonth()+1;return[t.getFullYear(),(n>9?"":"0")+n,(e>9?"":"0")+e].join("-")}function clone(t){return new Date(t.getTime())}function getWeeksBetween(t,e){var n=setDayToSunday(t);return Math.ceil(getDaysBetween(n,e)/NO_OF_DAYS_IN_WEEK)}function getDaysBetween(t,e){var n=SEC_IN_DAY*NO_OF_MILLIS;return(treatAsUtc(e)-treatAsUtc(t))/n}function areInSameMonth(t,e){return t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear()}function getMonthName(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=MONTH_NAMES[t];return e?n.slice(0,3):n}function getLastDateInMonth(t,e){return new Date(e,t+1,0)}function setDayToSunday(t){var e=clone(t),n=e.getDay();return 0!==n&&addDays(e,-1*n),e}function addDays(t,e){t.setDate(t.getDate()+e)}function _classCallCheck$5(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getComponent(t,e,n){var i=Object.keys(componentConfigs).filter(function(e){return t.includes(e)}),a=componentConfigs[i[0]];return Object.assign(a,{constants:e,getData:n}),new ChartComponent(a)}function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$1(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _toConsumableArray$2(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$6(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$2(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$2(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _toConsumableArray$4(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function normalize(t){if(0===t)return[0,0];if(isNaN(t))return{mantissa:-6755399441055744,exponent:972};var e=t>0?1:-1;if(!isFinite(t))return{mantissa:4503599627370496*e,exponent:972};t=Math.abs(t);var n=Math.floor(Math.log10(t));return[e*(t/Math.pow(10,n)),n]}function getChartRangeIntervals(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=Math.ceil(t),i=Math.floor(e),a=n-i,r=a,o=1;a>5&&(a%2!=0&&(a=++n-i),r=a/2,o=2),a<=2&&(o=a/(r=4)),0===a&&(r=5,o=1);for(var s=[],l=0;l<=r;l++)s.push(i+o*l);return s}function getChartIntervals(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=normalize(t),i=_slicedToArray$4(n,2),a=i[0],r=i[1],o=e?e/Math.pow(10,r):0,s=getChartRangeIntervals(a=a.toFixed(6),o);return s=s.map(function(t){return t*Math.pow(10,r)})}function calcChartIntervals(t){function e(t,e){for(var n=getChartIntervals(t),i=n[1]-n[0],a=0,r=1;a<e;r++)a+=i,n.unshift(-1*a);return n}var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=Math.max.apply(Math,_toConsumableArray$4(t)),a=Math.min.apply(Math,_toConsumableArray$4(t)),r=[];if(i>=0&&a>=0)normalize(i)[1],r=n?getChartIntervals(i,a):getChartIntervals(i);else if(i>0&&a<0){var o=Math.abs(a);i>=o?(normalize(i)[1],r=e(i,o)):(normalize(o)[1],r=e(o,i).map(function(t){return-1*t}))}else if(i<=0&&a<=0){var s=Math.abs(a),l=Math.abs(i);normalize(s)[1],r=(r=n?getChartIntervals(s,l):getChartIntervals(s)).reverse().map(function(t){return-1*t})}return r}function getZeroIndex(t){var e=getIntervalSize(t);return t.indexOf(0)>=0?t.indexOf(0):t[0]>0?-1*t[0]/e:-1*t[t.length-1]/e+(t.length-1)}function getIntervalSize(t){return t[1]-t[0]}function getValueRange(t){return t[t.length-1]-t[0]}function scale(t,e){return floatTwo(e.zeroLine-t*e.scaleMultiplier)}function getClosestInArray(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e});return n?e.indexOf(i):i}function calcDistribution(t,e){for(var n=Math.max.apply(Math,_toConsumableArray$4(t)),i=1/(e-1),a=[],r=0;r<e;r++){var o=n*(i*r);a.push(o)}return a}function getMaxCheckpoint(t,e){return e.filter(function(e){return e<t}).length}function _toConsumableArray$3(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$7(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$3(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$3(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function dataPrep(t,e){t.labels=t.labels||[];var n=t.labels.length,i=t.datasets,a=new Array(n).fill(0);return i||(i=[{values:a}]),i.map(function(t){if(t.values){var i=t.values;i=(i=i.map(function(t){return isNaN(t)?0:t})).length>n?i.slice(0,n):fillArray(i,n-i.length,0)}else t.values=a;t.chartType||(AXIS_DATASET_CHART_TYPES.includes(e),t.chartType=e)}),t.yRegions&&t.yRegions.map(function(t){if(t.end<t.start){var e=[t.end,t.start];t.start=e[0],t.end=e[1]}}),t}function zeroDataPrep(t){var e=t.labels.length,n=new Array(e).fill(0),i={labels:t.labels.slice(0,-1),datasets:t.datasets.map(function(t){return{name:"",values:n.slice(0,-1),chartType:t.chartType}})};return t.yMarkers&&(i.yMarkers=[{value:0,label:""}]),t.yRegions&&(i.yRegions=[{start:0,end:0,label:""}]),i}function getShortenedLabels(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=t/e.length;i<=0&&(i=1);var a=i/DEFAULT_CHAR_WIDTH;return e.map(function(t,e){return(t+="").length>a&&(n?e%Math.ceil(t.length/a)!=0&&(t=""):t=a-3>0?t.slice(0,a-3)+" ...":t.slice(0,a)+".."),t})}function _toConsumableArray$5(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck$8(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn$4(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits$4(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getChartByType(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"line",e=arguments[1],n=arguments[2];return"axis-mixed"===t?(n.type="line",new AxisChart(e,n)):chartTypes[t]?new chartTypes[t](e,n):void console.error("Undefined chart type: "+t)}__$styleInject('.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:1;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}',{});var asyncGenerator=function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,a){var s={key:t,arg:e,resolve:n,reject:a,next:null};o?o=o.next=s:(r=o=s,i(t,e))})}function i(n,r){try{var o=e[n](r),s=o.value;s instanceof t?Promise.resolve(s.value).then(function(t){i("next",t)},function(t){i("throw",t)}):a(o.done?"return":"normal",o.value)}catch(t){a("throw",t)}}function a(t,e){switch(t){case"return":r.resolve({value:e,done:!0});break;case"throw":r.reject(e);break;default:r.resolve({value:e,done:!1})}(r=r.next)?i(r.key,r.arg):o=null}var r,o;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};$.create=function(t,e){var n=document.createElement(t);for(var i in e){var a=e[i];if("inside"===i)$(a).appendChild(n);else if("around"===i){var r=$(a);r.parentNode.insertBefore(n,r),n.appendChild(r)}else"styles"===i?"object"===(void 0===a?"undefined":_typeof(a))&&Object.keys(a).map(function(t){n.style[t]=a[t]}):i in n?n[i]=a:n.setAttribute(i,a)}return n};var BASE_MEASURES={margins:{top:10,bottom:10,left:20,right:20},paddings:{top:20,bottom:40,left:30,right:10},baseHeight:240,titleHeight:20,legendHeight:30,titleFontSize:12},INIT_CHART_UPDATE_TIMEOUT=700,CHART_POST_ANIMATE_TIMEOUT=400,DEFAULT_AXIS_CHART_TYPE="line",AXIS_DATASET_CHART_TYPES=["line","bar"],AXIS_LEGEND_BAR_SIZE=100,BAR_CHART_SPACE_RATIO=.5,MIN_BAR_PERCENT_HEIGHT=.01,LINE_CHART_DOT_SIZE=4,DOT_OVERLAY_SIZE_INCR=4,PERCENTAGE_BAR_DEFAULT_HEIGHT=20,PERCENTAGE_BAR_DEFAULT_DEPTH=2,HEATMAP_DISTRIBUTION_SIZE=5,HEATMAP_SQUARE_SIZE=10,HEATMAP_GUTTER_SIZE=2,DEFAULT_CHAR_WIDTH=7,TOOLTIP_POINTER_TRIANGLE_HEIGHT=5,DEFAULT_CHART_COLORS=["light-blue","blue","violet","red","orange","yellow","green","light-green","purple","magenta","light-grey","dark-grey"],HEATMAP_COLORS_GREEN=["#ebedf0","#c6e48b","#7bc96f","#239a3b","#196127"],DEFAULT_COLORS={bar:DEFAULT_CHART_COLORS,line:DEFAULT_CHART_COLORS,pie:DEFAULT_CHART_COLORS,percentage:DEFAULT_CHART_COLORS,heatmap:HEATMAP_COLORS_GREEN},ANGLE_RATIO=Math.PI/180,FULL_ANGLE=360,_createClass$3=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),SvgTip=function(){function t(e){var n=e.parent,i=void 0===n?null:n,a=e.colors,r=void 0===a?[]:a;_classCallCheck$4(this,t),this.parent=i,this.colors=r,this.titleName="",this.titleValue="",this.listValues=[],this.titleValueFirst=0,this.x=0,this.y=0,this.top=0,this.left=0,this.setup()}return _createClass$3(t,[{key:"setup",value:function(){this.makeTooltip()}},{key:"refresh",value:function(){this.fill(),this.calcPosition()}},{key:"makeTooltip",value:function(){var t=this;this.container=$.create("div",{inside:this.parent,className:"graph-svg-tip comparison",innerHTML:'<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>'}),this.hideTip(),this.title=this.container.querySelector(".title"),this.dataPointList=this.container.querySelector(".data-point-list"),this.parent.addEventListener("mouseleave",function(){t.hideTip()})}},{key:"fill",value:function(){var t=this,e=void 0;this.index&&this.container.setAttribute("data-point-index",this.index),e=this.titleValueFirst?"<strong>"+this.titleValue+"</strong>"+this.titleName:this.titleName+"<strong>"+this.titleValue+"</strong>",this.title.innerHTML=e,this.dataPointList.innerHTML="",this.listValues.map(function(e,n){var i=t.colors[n]||"black",a=0===e.formatted||e.formatted?e.formatted:e.value,r=$.create("li",{styles:{"border-top":"3px solid "+i},innerHTML:'<strong style="display: block;">'+(0===a||a?a:"")+"</strong>\n\t\t\t\t\t"+(e.title?e.title:"")});t.dataPointList.appendChild(r)})}},{key:"calcPosition",value:function(){var t=this.container.offsetWidth;this.top=this.y-this.container.offsetHeight-TOOLTIP_POINTER_TRIANGLE_HEIGHT,this.left=this.x-t/2;var e=this.parent.offsetWidth-t,n=this.container.querySelector(".svg-pointer");if(this.left<0)n.style.left="calc(50% - "+-1*this.left+"px)",this.left=0;else if(this.left>e){var i="calc(50% + "+(this.left-e)+"px)";n.style.left=i,this.left=e}else n.style.left="50%"}},{key:"setValues",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1;this.titleName=n.name,this.titleValue=n.value,this.listValues=i,this.x=t,this.y=e,this.titleValueFirst=n.valueFirst||0,this.index=a,this.refresh()}},{key:"hideTip",value:function(){this.container.style.top="0px",this.container.style.left="0px",this.container.style.opacity="0"}},{key:"showTip",value:function(){this.container.style.top=this.top+"px",this.container.style.left=this.left+"px",this.container.style.opacity="1"}}]),t}(),PRESET_COLOR_MAP={"light-blue":"#7cd6fd",blue:"#5e64ff",violet:"#743ee2",red:"#ff5858",orange:"#ffa00a",yellow:"#feef72",green:"#28a745","light-green":"#98d85b",purple:"#b554ff",magenta:"#ffa3ef",black:"#36114C",grey:"#bdd3e6","light-grey":"#f0f4f7","dark-grey":"#b8c2cc"},getColor=function(t){return PRESET_COLOR_MAP[t]||t},_slicedToArray=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_typeof$2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},AXIS_TICK_LENGTH=6,LABEL_MARGIN=4,FONT_SIZE=10,BASE_LINE_COLOR="#dadada",FONT_FILL="#555b51",makeOverlay={bar:function(t){var e=void 0;"rect"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var n=t.cloneNode();return n.style.fill="#000000",n.style.opacity="0.4",e&&n.setAttribute("transform",e),n},dot:function(t){var e=void 0;"circle"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var n=t.cloneNode(),i=t.getAttribute("r"),a=t.getAttribute("fill");return n.setAttribute("r",parseInt(i)+DOT_OVERLAY_SIZE_INCR),n.setAttribute("fill",a),n.style.opacity="0.6",e&&n.setAttribute("transform",e),n},heat_square:function(t){var e=void 0;"circle"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var n=t.cloneNode(),i=t.getAttribute("r"),a=t.getAttribute("fill");return n.setAttribute("r",parseInt(i)+DOT_OVERLAY_SIZE_INCR),n.setAttribute("fill",a),n.style.opacity="0.6",e&&n.setAttribute("transform",e),n}},updateOverlay={bar:function(t,e){var n=void 0;"rect"!==t.nodeName&&(n=t.getAttribute("transform"),t=t.childNodes[0]);var i=["x","y","width","height"];Object.values(t.attributes).filter(function(t){return i.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue)}),n&&e.setAttribute("transform",n)},dot:function(t,e){var n=void 0;"circle"!==t.nodeName&&(n=t.getAttribute("transform"),t=t.childNodes[0]);var i=["cx","cy"];Object.values(t.attributes).filter(function(t){return i.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue)}),n&&e.setAttribute("transform",n)},heat_square:function(t,e){var n=void 0;"circle"!==t.nodeName&&(n=t.getAttribute("transform"),t=t.childNodes[0]);var i=["cx","cy"];Object.values(t.attributes).filter(function(t){return i.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue)}),n&&e.setAttribute("transform",n)}},_slicedToArray$2=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),UNIT_ANIM_DUR=350,PATH_ANIM_DUR=350,MARKER_LINE_ANIM_DUR=UNIT_ANIM_DUR,REPLACE_ALL_NEW_DUR=250,STD_EASING="easein",_slicedToArray$1=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),EASING={ease:"0.25 0.1 0.25 1",linear:"0 0 1 1",easein:"0.1 0.8 0.2 1",easeout:"0 0 0.58 1",easeinout:"0.42 0 0.58 1"},CSSTEXT=".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",_createClass$2=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),BOUND_DRAW_FN=void 0,BaseChart=function(){function t(e,n){if(_classCallCheck$3(this,t),this.parent="string"==typeof e?document.querySelector(e):e,!(this.parent instanceof HTMLElement))throw new Error("No `parent` element to render on was provided.");this.rawChartArgs=n,this.title=n.title||"",this.type=n.type||"",this.realData=this.prepareData(n.data),this.data=this.prepareFirstData(this.realData),this.colors=this.validateColors(n.colors,this.type),this.config={showTooltip:1,showLegend:1,isNavigable:n.isNavigable||0,animate:1},this.measures=JSON.parse(JSON.stringify(BASE_MEASURES));var i=this.measures;this.setMeasures(n),this.title.length||(i.titleHeight=0),this.config.showLegend||(i.legendHeight=0),this.argHeight=n.height||i.baseHeight,this.state={},this.options={},this.initTimeout=INIT_CHART_UPDATE_TIMEOUT,this.config.isNavigable&&(this.overlays=[]),this.configure(n)}return _createClass$2(t,[{key:"prepareData",value:function(t){return t}},{key:"prepareFirstData",value:function(t){return t}},{key:"validateColors",value:function(t,e){var n=[];return(t=(t||[]).concat(DEFAULT_COLORS[e])).forEach(function(t){var e=getColor(t);isValidColor(e)?n.push(e):console.warn('"'+t+'" is not a valid color.')}),n}},{key:"setMeasures",value:function(){}},{key:"configure",value:function(){var t=this.argHeight;this.baseHeight=t,this.height=t-getExtraHeight(this.measures),BOUND_DRAW_FN=this.boundDrawFn.bind(this),window.addEventListener("resize",BOUND_DRAW_FN),window.addEventListener("orientationchange",this.boundDrawFn.bind(this))}},{key:"boundDrawFn",value:function(){this.draw(!0)}},{key:"unbindWindowEvents",value:function(){window.removeEventListener("resize",BOUND_DRAW_FN),window.removeEventListener("orientationchange",this.boundDrawFn.bind(this))}},{key:"setup",value:function(){this.makeContainer(),this.updateWidth(),this.makeTooltip(),this.draw(!1,!0)}},{key:"makeContainer",value:function(){this.parent.innerHTML="";var t={inside:this.parent,className:"chart-container"};this.independentWidth&&(t.styles={width:this.independentWidth+"px"}),this.container=$.create("div",t)}},{key:"makeTooltip",value:function(){this.tip=new SvgTip({parent:this.container,colors:this.colors}),this.bindTooltip()}},{key:"bindTooltip",value:function(){}},{key:"draw",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.updateWidth(),this.calc(e),this.makeChartArea(),this.setupComponents(),this.components.forEach(function(e){return e.setup(t.drawArea)}),this.render(this.components,!1),n&&(this.data=this.realData,setTimeout(function(){t.update(t.data)},this.initTimeout)),this.renderLegend(),this.setupNavigation(n)}},{key:"calc",value:function(){}},{key:"updateWidth",value:function(){this.baseWidth=getElementContentWidth(this.parent),this.width=this.baseWidth-getExtraWidth(this.measures)}},{key:"makeChartArea",value:function(){this.svg&&this.container.removeChild(this.svg);var t=this.measures;this.svg=makeSVGContainer(this.container,"frappe-chart chart",this.baseWidth,this.baseHeight),this.svgDefs=makeSVGDefs(this.svg),this.title.length&&(this.titleEL=makeText("title",t.margins.left,t.margins.top,this.title,{fontSize:t.titleFontSize,fill:"#666666",dy:t.titleFontSize}));var e=getTopOffset(t);this.drawArea=makeSVGGroup(this.type+"-chart chart-draw-area","translate("+getLeftOffset(t)+", "+e+")"),this.config.showLegend&&(e+=this.height+t.paddings.bottom,this.legendArea=makeSVGGroup("chart-legend","translate("+getLeftOffset(t)+", "+e+")")),this.title.length&&this.svg.appendChild(this.titleEL),this.svg.appendChild(this.drawArea),this.config.showLegend&&this.svg.appendChild(this.legendArea),this.updateTipOffset(getLeftOffset(t),getTopOffset(t))}},{key:"updateTipOffset",value:function(t,e){this.tip.offset={x:t,y:e}}},{key:"setupComponents",value:function(){this.components=new Map}},{key:"update",value:function(t){t||console.error("No data to update."),this.data=this.prepareData(t),this.calc(),this.render()}},{key:"render",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.components,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.config.isNavigable&&this.overlays.map(function(t){return t.parentNode.removeChild(t)});var i=[];e.forEach(function(t){i=i.concat(t.update(n))}),i.length>0?(runSMILAnimation(this.container,this.svg,i),setTimeout(function(){e.forEach(function(t){return t.make()}),t.updateNav()},CHART_POST_ANIMATE_TIMEOUT)):(e.forEach(function(t){return t.make()}),this.updateNav())}},{key:"updateNav",value:function(){this.config.isNavigable&&(this.makeOverlay(),this.bindUnits())}},{key:"renderLegend",value:function(){}},{key:"setupNavigation",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.config.isNavigable&&e&&(this.bindOverlay(),this.keyActions={13:this.onEnterKey.bind(this),37:this.onLeftArrow.bind(this),38:this.onUpArrow.bind(this),39:this.onRightArrow.bind(this),40:this.onDownArrow.bind(this)},document.addEventListener("keydown",function(e){isElementInViewport(t.container)&&(e=e||window.event,t.keyActions[e.keyCode]&&t.keyActions[e.keyCode]())}))}},{key:"makeOverlay",value:function(){}},{key:"updateOverlay",value:function(){}},{key:"bindOverlay",value:function(){}},{key:"bindUnits",value:function(){}},{key:"onLeftArrow",value:function(){}},{key:"onRightArrow",value:function(){}},{key:"onUpArrow",value:function(){}},{key:"onDownArrow",value:function(){}},{key:"onEnterKey",value:function(){}},{key:"addDataPoint",value:function(){}},{key:"removeDataPoint",value:function(){}},{key:"getDataPoint",value:function(){}},{key:"setCurrentDataPoint",value:function(){}},{key:"updateDataset",value:function(){}},{key:"export",value:function(){var t=prepareForExport(this.svg);downloadFile(this.title||"Chart",[t])}}]),t}(),_createClass$1=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$1=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var o=a.get;if(void 0!==o)return o.call(i)},AggregationChart=function(t){function e(t,n){return _classCallCheck$2(this,e),_possibleConstructorReturn$1(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return _inherits$1(e,t),_createClass$1(e,[{key:"configure",value:function(t){_get$1(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),this.config.maxSlices=t.maxSlices||20,this.config.maxLegendPoints=t.maxLegendPoints||20}},{key:"calc",value:function(){var t=this,e=this.state,n=this.config.maxSlices;e.sliceTotals=[];var i=this.data.labels.map(function(e,n){var i=0;return t.data.datasets.map(function(t){i+=t.values[n]}),[i,e]}).filter(function(t){return t[0]>=0}),a=i;if(i.length>n){i.sort(function(t,e){return e[0]-t[0]}),a=i.slice(0,n-1);var r=0;i.slice(n-1).map(function(t){r+=t[0]}),a.push([r,"Rest"]),this.colors[n-1]="grey"}e.labels=[],a.map(function(t){e.sliceTotals.push(t[0]),e.labels.push(t[1])}),e.grandTotal=e.sliceTotals.reduce(function(t,e){return t+e},0),this.center={x:this.width/2,y:this.height/2}}},{key:"renderLegend",value:function(){var t=this,e=this.state;this.legendArea.textContent="",this.legendTotals=e.sliceTotals.slice(0,this.config.maxLegendPoints);var n=0,i=0;this.legendTotals.map(function(a,r){var o=Math.floor((t.width-getExtraWidth(t.measures))/110);n>o&&(n=0,i+=20);var s=legendDot(110*n+5,i,5,t.colors[r],e.labels[r]+": "+a);t.legendArea.appendChild(s),n++})}}]),e}(BaseChart),NO_OF_YEAR_MONTHS=12,NO_OF_DAYS_IN_WEEK=7,NO_OF_MILLIS=1e3,SEC_IN_DAY=86400,MONTH_NAMES=["January","February","March","April","May","June","July","August","September","October","November","December"],DAY_NAMES_SHORT=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],_slicedToArray$3=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass$4=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),ChartComponent=function(){function t(e){var n=e.layerClass,i=void 0===n?"":n,a=e.layerTransform,r=void 0===a?"":a,o=e.constants,s=e.getData,l=e.makeElements,u=e.animateElements;_classCallCheck$5(this,t),this.layerTransform=r,this.constants=o,this.makeElements=l,this.getData=s,this.animateElements=u,this.store=[],this.labels=[],this.layerClass=i,this.layerClass="function"==typeof this.layerClass?this.layerClass():this.layerClass,this.refresh()}return _createClass$4(t,[{key:"refresh",value:function(t){this.data=t||this.getData()}},{key:"setup",value:function(t){this.layer=makeSVGGroup(this.layerClass,this.layerTransform,t)}},{key:"make",value:function(){this.render(this.data),this.oldData=this.data}},{key:"render",value:function(t){var e=this;this.store=this.makeElements(t),this.layer.textContent="",this.store.forEach(function(t){e.layer.appendChild(t)}),this.labels.forEach(function(t){e.layer.appendChild(t)})}},{key:"update",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.refresh();var e=[];return t&&(e=this.animateElements(this.data)||[]),e}}]),t}(),componentConfigs={pieSlices:{layerClass:"pie-slices",makeElements:function(t){return t.sliceStrings.map(function(e,n){var i=makePath(e,"pie-path","none",t.colors[n]);return i.style.transition="transform .3s;",i})},animateElements:function(t){return this.store.map(function(e,n){return animatePathStr(e,t.sliceStrings[n])})}},percentageBars:{layerClass:"percentage-bars",makeElements:function(t){var e=this;return t.xPositions.map(function(n,i){return percentageBar(n,0,t.widths[i],e.constants.barHeight,e.constants.barDepth,t.colors[i])})},animateElements:function(t){if(t)return[]}},yAxis:{layerClass:"y axis",makeElements:function(t){var e=this;return t.positions.map(function(n,i){return yLine(n,t.labels[i],e.constants.width,{mode:e.constants.mode,pos:e.constants.pos})})},animateElements:function(t){var e=t.positions,n=t.labels,i=this.oldData.positions,a=this.oldData.labels,r=equilizeNoOfElements(i,e),o=_slicedToArray$3(r,2);i=o[0],e=o[1];var s=equilizeNoOfElements(a,n),l=_slicedToArray$3(s,2);return a=l[0],n=l[1],this.render({positions:i,labels:n}),this.store.map(function(t,n){return translateHoriLine(t,e[n],i[n])})}},xAxis:{layerClass:"x axis",makeElements:function(t){var e=this;return t.positions.map(function(n,i){return xLine(n,t.calcLabels[i],e.constants.height,{mode:e.constants.mode,pos:e.constants.pos})})},animateElements:function(t){var e=t.positions,n=t.calcLabels,i=this.oldData.positions,a=this.oldData.calcLabels,r=equilizeNoOfElements(i,e),o=_slicedToArray$3(r,2);i=o[0],e=o[1];var s=equilizeNoOfElements(a,n),l=_slicedToArray$3(s,2);return a=l[0],n=l[1],this.render({positions:i,calcLabels:n}),this.store.map(function(t,n){return translateVertLine(t,e[n],i[n])})}},yMarkers:{layerClass:"y-markers",makeElements:function(t){var e=this;return t.map(function(t){return yMarker(t.position,t.label,e.constants.width,{labelPos:t.options.labelPos,mode:"span",lineType:"dashed"})})},animateElements:function(t){var e=equilizeNoOfElements(this.oldData,t),n=_slicedToArray$3(e,2);this.oldData=n[0];var i=(t=n[1]).map(function(t){return t.position}),a=t.map(function(t){return t.label}),r=t.map(function(t){return t.options}),o=this.oldData.map(function(t){return t.position});return this.render(o.map(function(t,e){return{position:o[e],label:a[e],options:r[e]}})),this.store.map(function(t,e){return translateHoriLine(t,i[e],o[e])})}},yRegions:{layerClass:"y-regions",makeElements:function(t){var e=this;return t.map(function(t){return yRegion(t.startPos,t.endPos,e.constants.width,t.label,{labelPos:t.options.labelPos})})},animateElements:function(t){var e=equilizeNoOfElements(this.oldData,t),n=_slicedToArray$3(e,2);this.oldData=n[0];var i=(t=n[1]).map(function(t){return t.endPos}),a=t.map(function(t){return t.label}),r=t.map(function(t){return t.startPos}),o=t.map(function(t){return t.options}),s=this.oldData.map(function(t){return t.endPos}),l=this.oldData.map(function(t){return t.startPos});this.render(s.map(function(t,e){return{startPos:l[e],endPos:s[e],label:a[e],options:o[e]}}));var u=[];return this.store.map(function(t,e){u=u.concat(animateRegion(t,r[e],i[e],s[e]))}),u}},heatDomain:{layerClass:function(){return"heat-domain domain-"+this.constants.index},makeElements:function(t){var e=this,n=this.constants,i=n.index,a=n.colWidth,r=n.rowHeight,o=n.squareSize,s=n.xTranslate,l=0;return this.serializedSubDomains=[],t.cols.map(function(t,n){1===n&&e.labels.push(makeText("domain-name",s,-12,getMonthName(i,!0).toUpperCase(),{fontSize:9})),t.map(function(t,n){if(t.fill){var i={"data-date":t.yyyyMmDd,"data-value":t.dataValue,"data-day":n},a=heatSquare("day",s,l,o,t.fill,i);e.serializedSubDomains.push(a)}l+=r}),l=0,s+=a}),this.serializedSubDomains},animateElements:function(t){if(t)return[]}},barGraph:{layerClass:function(){return"dataset-units dataset-bars dataset-"+this.constants.index},makeElements:function(t){var e=this.constants;return this.unitType="bar",this.units=t.yPositions.map(function(n,i){return datasetBar(t.xPositions[i],n,t.barWidth,e.color,t.labels[i],i,t.offsets[i],{zeroLine:t.zeroLine,barsWidth:t.barsWidth,minHeight:e.minHeight})}),this.units},animateElements:function(t){var e=t.xPositions,n=t.yPositions,i=t.offsets,a=t.labels,r=this.oldData.xPositions,o=this.oldData.yPositions,s=this.oldData.offsets,l=this.oldData.labels,u=equilizeNoOfElements(r,e),c=_slicedToArray$3(u,2);r=c[0],e=c[1];var h=equilizeNoOfElements(o,n),d=_slicedToArray$3(h,2);o=d[0],n=d[1];var f=equilizeNoOfElements(s,i),p=_slicedToArray$3(f,2);s=p[0],i=p[1];var v=equilizeNoOfElements(l,a),y=_slicedToArray$3(v,2);l=y[0],a=y[1],this.render({xPositions:r,yPositions:o,offsets:s,labels:a,zeroLine:this.oldData.zeroLine,barsWidth:this.oldData.barsWidth,barWidth:this.oldData.barWidth});var g=[];return this.store.map(function(a,r){g=g.concat(animateBar(a,e[r],n[r],t.barWidth,i[r],{zeroLine:t.zeroLine}))}),g}},lineGraph:{layerClass:function(){return"dataset-units dataset-line dataset-"+this.constants.index},makeElements:function(t){var e=this.constants;return this.unitType="dot",this.paths={},e.hideLine||(this.paths=getPaths(t.xPositions,t.yPositions,e.color,{heatline:e.heatline,regionFill:e.regionFill},{svgDefs:e.svgDefs,zeroLine:t.zeroLine})),this.units=[],e.hideDots||(this.units=t.yPositions.map(function(n,i){return datasetDot(t.xPositions[i],n,t.radius,e.color,e.valuesOverPoints?t.values[i]:"",i)})),Object.values(this.paths).concat(this.units)},animateElements:function(t){var e=t.xPositions,n=t.yPositions,i=t.values,a=this.oldData.xPositions,r=this.oldData.yPositions,o=this.oldData.values,s=equilizeNoOfElements(a,e),l=_slicedToArray$3(s,2);a=l[0],e=l[1];var u=equilizeNoOfElements(r,n),c=_slicedToArray$3(u,2);r=c[0],n=c[1];var h=equilizeNoOfElements(o,i),d=_slicedToArray$3(h,2);o=d[0],i=d[1],this.render({xPositions:a,yPositions:r,values:i,zeroLine:this.oldData.zeroLine,radius:this.oldData.radius});var f=[];return Object.keys(this.paths).length&&(f=f.concat(animatePath(this.paths,e,n,t.zeroLine))),this.units.length&&this.units.map(function(t,i){f=f.concat(animateDot(t,e[i],n[i]))}),f}}},_createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var o=a.get;if(void 0!==o)return o.call(i)},PercentageChart=function(t){function e(t,n){_classCallCheck$1(this,e);var i=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.type="percentage",i.setup(),i}return _inherits(e,t),_createClass(e,[{key:"setMeasures",value:function(t){var e=this.measures;this.barOptions=t.barOptions||{};var n=this.barOptions;n.height=n.height||PERCENTAGE_BAR_DEFAULT_HEIGHT,n.depth=n.depth||PERCENTAGE_BAR_DEFAULT_DEPTH,e.paddings.right=30,e.legendHeight=80,e.baseHeight=8*(n.height+.5*n.depth)}},{key:"setupComponents",value:function(){var t=this.state,e=[["percentageBars",{barHeight:this.barOptions.height,barDepth:this.barOptions.depth},function(){return{xPositions:t.xPositions,widths:t.widths,colors:this.colors}}.bind(this)]];this.components=new Map(e.map(function(t){var e=getComponent.apply(void 0,_toConsumableArray(t));return[t[0],e]}))}},{key:"calc",value:function(){var t=this;_get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"calc",this).call(this);var n=this.state;n.xPositions=[],n.widths=[];var i=0;n.sliceTotals.map(function(e){var a=t.width*e/n.grandTotal;n.widths.push(a),n.xPositions.push(i),i+=a})}},{key:"makeDataByIndex",value:function(){}},{key:"bindTooltip",value:function(){var t=this,e=this.state;this.container.addEventListener("mousemove",function(n){var i=t.components.get("percentageBars").store,a=n.target;if(i.includes(a)){var r=i.indexOf(a),o=getOffset(t.container),s=getOffset(a),l=s.left-o.left+parseInt(a.getAttribute("width"))/2,u=s.top-o.top,c=(t.formattedLabels&&t.formattedLabels.length>0?t.formattedLabels[r]:t.state.labels[r])+": ",h=e.sliceTotals[r]/e.grandTotal;t.tip.setValues(l,u,{name:c,value:(100*h).toFixed(1)+"%"}),t.tip.showTip()}})}}]),e}(AggregationChart),_createClass$5=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$2=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var o=a.get;if(void 0!==o)return o.call(i)},PieChart=function(t){function e(t,n){_classCallCheck$6(this,e);var i=_possibleConstructorReturn$2(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.type="pie",i.initTimeout=0,i.init=1,i.setup(),i}return _inherits$2(e,t),_createClass$5(e,[{key:"configure",value:function(t){_get$2(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=t.hoverRadio||.1,this.config.startAngle=t.startAngle||0,this.clockWise=t.clockWise||!1}},{key:"calc",value:function(){var t=this;_get$2(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"calc",this).call(this);var n=this.state;this.radius=this.height>this.width?this.center.x:this.center.y;var i=this.radius,a=this.clockWise,r=n.slicesProperties||[];n.sliceStrings=[],n.slicesProperties=[];var o=180-this.config.startAngle;n.sliceTotals.map(function(e,s){var l=o,u=e/n.grandTotal*FULL_ANGLE,c=a?-u:u,h=o+=c,d=getPositionByAngle(l,i),f=getPositionByAngle(h,i),p=t.init&&r[s],v=void 0,y=void 0;t.init?(v=p?p.startPosition:d,y=p?p.endPosition:d):(v=d,y=f);var g=makeArcPathStr(v,y,t.center,t.radius,t.clockWise);n.sliceStrings.push(g),n.slicesProperties.push({startPosition:d,endPosition:f,value:e,total:n.grandTotal,startAngle:l,endAngle:h,angle:c})}),this.init=0}},{key:"setupComponents",value:function(){var t=this.state,e=[["pieSlices",{},function(){return{sliceStrings:t.sliceStrings,colors:this.colors}}.bind(this)]];this.components=new Map(e.map(function(t){var e=getComponent.apply(void 0,_toConsumableArray$2(t));return[t[0],e]}))}},{key:"calTranslateByAngle",value:function(t){var e=this.radius,n=this.hoverRadio,i=getPositionByAngle(t.startAngle+t.angle/2,e);return"translate3d("+i.x*n+"px,"+i.y*n+"px,0)"}},{key:"hoverSlice",value:function(t,e,n,i){if(t){var a=this.colors[e];if(n){transform(t,this.calTranslateByAngle(this.state.slicesProperties[e])),t.style.fill=lightenDarkenColor(a,50);var r=getOffset(this.svg),o=i.pageX-r.left+10,s=i.pageY-r.top-10,l=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[e]:this.state.labels[e])+": ",u=(100*this.state.sliceTotals[e]/this.state.grandTotal).toFixed(1);this.tip.setValues(o,s,{name:l,value:u+"%"}),this.tip.showTip()}else transform(t,"translate3d(0,0,0)"),this.tip.hideTip(),t.style.fill=a}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave)}},{key:"mouseMove",value:function(t){var e=t.target,n=this.components.get("pieSlices").store,i=this.curActiveSliceIndex,a=this.curActiveSlice;if(n.includes(e)){var r=n.indexOf(e);this.hoverSlice(a,i,!1),this.curActiveSlice=e,this.curActiveSliceIndex=r,this.hoverSlice(e,r,!0,t)}else this.mouseLeave()}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1)}}]),e}(AggregationChart),_slicedToArray$4=function(){function t(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t}finally{try{!i&&s.return&&s.return()}finally{if(a)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass$6=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),COL_WIDTH=HEATMAP_SQUARE_SIZE+HEATMAP_GUTTER_SIZE,ROW_HEIGHT=COL_WIDTH,Heatmap=function(t){function e(t,n){_classCallCheck$7(this,e);var i=_possibleConstructorReturn$3(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.type="heatmap",i.countLabel=n.countLabel||"";var a=["Sunday","Monday"],r=a.includes(n.startSubDomain)?n.startSubDomain:"Sunday";return i.startSubDomainIndex=a.indexOf(r),i.setup(),i}return _inherits$3(e,t),_createClass$6(e,[{key:"setMeasures",value:function(t){var e=this.measures;this.discreteDomains=0===t.discreteDomains?0:1,e.paddings.top=3*ROW_HEIGHT,e.paddings.bottom=0,e.legendHeight=2*ROW_HEIGHT,e.baseHeight=ROW_HEIGHT*NO_OF_DAYS_IN_WEEK+getExtraHeight(e);var n=this.data,i=this.discreteDomains?NO_OF_YEAR_MONTHS:0;this.independentWidth=(getWeeksBetween(n.start,n.end)+i)*COL_WIDTH+getExtraWidth(e)}},{key:"updateWidth",value:function(){var t=this.discreteDomains?NO_OF_YEAR_MONTHS:0,e=this.state.noOfWeeks?this.state.noOfWeeks:52;this.baseWidth=(e+t)*COL_WIDTH+getExtraWidth(this.measures)}},{key:"prepareData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data;if(t.start&&t.end&&t.start>t.end)throw new Error("Start date cannot be greater than end date.");if(t.start||(t.start=new Date,t.start.setFullYear(t.start.getFullYear()-1)),t.end||(t.end=new Date),t.dataPoints=t.dataPoints||{},parseInt(Object.keys(t.dataPoints)[0])>1e5){var e={};Object.keys(t.dataPoints).forEach(function(n){var i=new Date(n*NO_OF_MILLIS);e[getYyyyMmDd(i)]=t.dataPoints[n]}),t.dataPoints=e}return t}},{key:"calc",value:function(){var t=this.state;t.start=clone(this.data.start),t.end=clone(this.data.end),t.firstWeekStart=clone(t.start),t.noOfWeeks=getWeeksBetween(t.start,t.end),t.distribution=calcDistribution(Object.values(this.data.dataPoints),HEATMAP_DISTRIBUTION_SIZE),t.domainConfigs=this.getDomains()}},{key:"setupComponents",value:function(){var t=this,e=this.state,n=this.discreteDomains?0:1,i=e.domainConfigs.map(function(i,a){return["heatDomain",{index:i.index,colWidth:COL_WIDTH,rowHeight:ROW_HEIGHT,squareSize:HEATMAP_SQUARE_SIZE,xTranslate:e.domainConfigs.filter(function(t,e){return e<a}).map(function(t){return t.cols.length-n}).reduce(function(t,e){return t+e},0)*COL_WIDTH},function(){return e.domainConfigs[a]}.bind(t)]});this.components=new Map(i.map(function(t,e){var n=getComponent.apply(void 0,_toConsumableArray$3(t));return[t[0]+"-"+e,n]}));var a=0;DAY_NAMES_SHORT.forEach(function(e,n){if([1,3,5].includes(n)){var i=makeText("subdomain-name",-COL_WIDTH/2,a,e,{fontSize:HEATMAP_SQUARE_SIZE,dy:8,textAnchor:"end"});t.drawArea.appendChild(i)}a+=ROW_HEIGHT})}},{key:"update",value:function(t){t||console.error("No data to update."),this.data=this.prepareData(t),this.draw(),this.bindTooltip()}},{key:"bindTooltip",value:function(){var t=this;this.container.addEventListener("mousemove",function(e){t.components.forEach(function(n){var i=n.store,a=e.target;if(i.includes(a)){var r=a.getAttribute("data-value"),o=a.getAttribute("data-date").split("-"),s=getMonthName(parseInt(o[1])-1,!0),l=t.container.getBoundingClientRect(),u=a.getBoundingClientRect(),c=parseInt(e.target.getAttribute("width")),h=u.left-l.left+c/2,d=u.top-l.top,f=r+" "+t.countLabel,p=" on "+s+" "+o[0]+", "+o[2];t.tip.setValues(h,d,{name:p,value:f,valueFirst:1},[]),t.tip.showTip()}})})}},{key:"renderLegend",value:function(){var t=this;this.legendArea.textContent="";var e=0,n=ROW_HEIGHT,i=makeText("subdomain-name",e,n,"Less",{fontSize:HEATMAP_SQUARE_SIZE+1,dy:9});e=2*COL_WIDTH+COL_WIDTH/2,this.legendArea.appendChild(i),this.colors.slice(0,HEATMAP_DISTRIBUTION_SIZE).map(function(i,a){var r=heatSquare("heatmap-legend-unit",e+(COL_WIDTH+3)*a,n,HEATMAP_SQUARE_SIZE,i);t.legendArea.appendChild(r)});var a=makeText("subdomain-name",e+HEATMAP_DISTRIBUTION_SIZE*(COL_WIDTH+3)+COL_WIDTH/4,n,"More",{fontSize:HEATMAP_SQUARE_SIZE+1,dy:9});this.legendArea.appendChild(a)}},{key:"getDomains",value:function(){for(var t=this.state,e=[t.start.getMonth(),t.start.getFullYear()],n=e[0],i=e[1],a=[t.end.getMonth(),t.end.getFullYear()],r=a[0]-n+1+12*(a[1]-i),o=[],s=clone(t.start),l=0;l<r;l++){var u=t.end;if(!areInSameMonth(s,t.end)){var c=[s.getMonth(),s.getFullYear()];u=getLastDateInMonth(c[0],c[1])}o.push(this.getDomainConfig(s,u)),addDays(u,1),s=u}return o}},{key:"getDomainConfig",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=[t.getMonth(),t.getFullYear()],i=n[0],a=n[1],r=setDayToSunday(t),o={index:i,cols:[]};addDays(e=clone(e)||getLastDateInMonth(i,a),1);for(var s=getWeeksBetween(r,e),l=[],u=void 0,c=0;c<s;c++)u=this.getCol(r,i),l.push(u),addDays(r=new Date(u[NO_OF_DAYS_IN_WEEK-1].yyyyMmDd),1);return void 0!==u[NO_OF_DAYS_IN_WEEK-1].dataValue&&(addDays(r,1),l.push(this.getCol(r,i,!0))),o.cols=l,o}},{key:"getCol",value:function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.state,a=clone(t),r=[],o=0;o<NO_OF_DAYS_IN_WEEK;o++,addDays(a,1)){var s={},l=a>=i.start&&a<=i.end;n||a.getMonth()!==e||!l?s.yyyyMmDd=getYyyyMmDd(a):s=this.getSubDomainConfig(a),r.push(s)}return r}},{key:"getSubDomainConfig",value:function(t){var e=getYyyyMmDd(t),n=this.data.dataPoints[e];return{yyyyMmDd:e,dataValue:n||0,fill:this.colors[getMaxCheckpoint(n,this.state.distribution)]}}}]),e}(BaseChart),_createClass$7=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_get$3=function t(e,n,i){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,n);if(void 0===a){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,n,i)}if("value"in a)return a.value;var o=a.get;if(void 0!==o)return o.call(i)},AxisChart=function(t){function e(t,n){_classCallCheck$8(this,e);var i=_possibleConstructorReturn$4(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.barOptions=n.barOptions||{},i.lineOptions=n.lineOptions||{},i.type=n.type||"line",i.init=1,i.setup(),i}return _inherits$4(e,t),_createClass$7(e,[{key:"setMeasures",value:function(){this.data.datasets.length<=1&&(this.config.showLegend=0,this.measures.paddings.bottom=30)}},{key:"configure",value:function(t){_get$3(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),t.axisOptions=t.axisOptions||{},t.tooltipOptions=t.tooltipOptions||{},this.config.xAxisMode=t.axisOptions.xAxisMode||"span",this.config.yAxisMode=t.axisOptions.yAxisMode||"span",this.config.xIsSeries=t.axisOptions.xIsSeries||0,this.config.formatTooltipX=t.tooltipOptions.formatTooltipX,this.config.formatTooltipY=t.tooltipOptions.formatTooltipY,this.config.valuesOverPoints=t.valuesOverPoints}},{key:"prepareData",value:function(){return dataPrep(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data,this.type)}},{key:"prepareFirstData",value:function(){return zeroDataPrep(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data)}},{key:"calc",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.calcXPositions(),t||this.calcYAxisParameters(this.getAllYValues(),"line"===this.type),this.makeDataByIndex()}},{key:"calcXPositions",value:function(){var t=this.state,e=this.data.labels;t.datasetLength=e.length,t.unitWidth=this.width/t.datasetLength,t.xOffset=t.unitWidth/2,t.xAxis={labels:e,positions:e.map(function(e,n){return floatTwo(t.xOffset+n*t.unitWidth)})}}},{key:"calcYAxisParameters",value:function(t){var e=calcChartIntervals(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"false"),n=this.height/getValueRange(e),i=getIntervalSize(e)*n,a=this.height-getZeroIndex(e)*i;this.state.yAxis={labels:e,positions:e.map(function(t){return a-t*n}),scaleMultiplier:n,zeroLine:a},this.calcDatasetPoints(),this.calcYExtremes(),this.calcYRegions()}},{key:"calcDatasetPoints",value:function(){var t=this.state,e=function(e){return e.map(function(e){return scale(e,t.yAxis)})};t.datasets=this.data.datasets.map(function(t,n){var i=t.values,a=t.cumulativeYs||[];return{name:t.name,index:n,chartType:t.chartType,values:i,yPositions:e(i),cumulativeYs:a,cumulativeYPos:e(a)}})}},{key:"calcYExtremes",value:function(){var t=this.state;if(this.barOptions.stacked)return void(t.yExtremes=t.datasets[t.datasets.length-1].cumulativeYPos);t.yExtremes=new Array(t.datasetLength).fill(9999),t.datasets.map(function(e){e.yPositions.map(function(e,n){e<t.yExtremes[n]&&(t.yExtremes[n]=e)})})}},{key:"calcYRegions",value:function(){var t=this.state;this.data.yMarkers&&(this.state.yMarkers=this.data.yMarkers.map(function(e){return e.position=scale(e.value,t.yAxis),e.options||(e.options={}),e})),this.data.yRegions&&(this.state.yRegions=this.data.yRegions.map(function(e){return e.startPos=scale(e.start,t.yAxis),e.endPos=scale(e.end,t.yAxis),e.options||(e.options={}),e}))}},{key:"getAllYValues",value:function(){var t,e=this,n="values";if(this.barOptions.stacked){n="cumulativeYs";var i=new Array(this.state.datasetLength).fill(0);this.data.datasets.map(function(t,a){var r=e.data.datasets[a].values;t[n]=i=i.map(function(t,e){return t+r[e]})})}var a=this.data.datasets.map(function(t){return t[n]});return this.data.yMarkers&&a.push(this.data.yMarkers.map(function(t){return t.value})),this.data.yRegions&&this.data.yRegions.map(function(t){a.push([t.end,t.start])}),(t=[]).concat.apply(t,_toConsumableArray$5(a))}},{key:"setupComponents",value:function(){var t=this,e=[["yAxis",{mode:this.config.yAxisMode,width:this.width},function(){return this.state.yAxis}.bind(this)],["xAxis",{mode:this.config.xAxisMode,height:this.height},function(){var t=this.state;return t.xAxis.calcLabels=getShortenedLabels(this.width,t.xAxis.labels,this.config.xIsSeries),t.xAxis}.bind(this)],["yRegions",{width:this.width,pos:"right"},function(){return this.state.yRegions}.bind(this)]],n=this.state.datasets.filter(function(t){return"bar"===t.chartType}),i=this.state.datasets.filter(function(t){return"line"===t.chartType}),a=n.map(function(e){var i=e.index;return["barGraph-"+e.index,{index:i,color:t.colors[i],stacked:t.barOptions.stacked,valuesOverPoints:t.config.valuesOverPoints,minHeight:t.height*MIN_BAR_PERCENT_HEIGHT},function(){var t=this.state,e=t.datasets[i],a=this.barOptions.stacked,r=this.barOptions.spaceRatio||BAR_CHART_SPACE_RATIO,o=t.unitWidth*(1-r),s=o/(a?1:n.length),l=t.xAxis.positions.map(function(t){return t-o/2});a||(l=l.map(function(t){return t+s*i}));var u=new Array(t.datasetLength).fill("");this.config.valuesOverPoints&&(u=a&&e.index===t.datasets.length-1?e.cumulativeYs:e.values);var c=new Array(t.datasetLength).fill(0);return a&&(c=e.yPositions.map(function(t,n){return t-e.cumulativeYPos[n]})),{xPositions:l,yPositions:e.yPositions,offsets:c,labels:u,zeroLine:t.yAxis.zeroLine,barsWidth:o,barWidth:s}}.bind(t)]}),r=i.map(function(e){var n=e.index;return["lineGraph-"+e.index,{index:n,color:t.colors[n],svgDefs:t.svgDefs,heatline:t.lineOptions.heatline,regionFill:t.lineOptions.regionFill,hideDots:t.lineOptions.hideDots,hideLine:t.lineOptions.hideLine,valuesOverPoints:t.config.valuesOverPoints},function(){var t=this.state,e=t.datasets[n],i=t.yAxis.positions[0]<t.yAxis.zeroLine?t.yAxis.positions[0]:t.yAxis.zeroLine;return{xPositions:t.xAxis.positions,yPositions:e.yPositions,values:e.values,zeroLine:i,radius:this.lineOptions.dotSize||LINE_CHART_DOT_SIZE}}.bind(t)]}),o=[["yMarkers",{width:this.width,pos:"right"},function(){return this.state.yMarkers}.bind(this)]];e=e.concat(a,r,o);var s=["yMarkers","yRegions"];this.dataUnitComponents=[],this.components=new Map(e.filter(function(e){return!s.includes(e[0])||t.state[e[0]]}).map(function(e){var n=getComponent.apply(void 0,_toConsumableArray$5(e));return(e[0].includes("lineGraph")||e[0].includes("barGraph"))&&t.dataUnitComponents.push(n),[e[0],n]}))}},{key:"makeDataByIndex",value:function(){var t=this;this.dataByIndex={};var e=this.state,n=this.config.formatTooltipX,i=this.config.formatTooltipY;e.xAxis.labels.map(function(a,r){var o=t.state.datasets.map(function(e,n){var a=e.values[r];return{title:e.name,value:a,yPos:e.yPositions[r],color:t.colors[n],formatted:i?i(a):a}});t.dataByIndex[r]={label:a,formattedLabel:n?n(a):a,xPos:e.xAxis.positions[r],values:o,yExtreme:e.yExtremes[r]}})}},{key:"bindTooltip",value:function(){var t=this;this.container.addEventListener("mousemove",function(e){var n=t.measures,i=getOffset(t.container),a=e.pageX-i.left-getLeftOffset(n),r=e.pageY-i.top;r<t.height+getTopOffset(n)&&r>getTopOffset(n)?t.mapTooltipXPosition(a):t.tip.hideTip()})}},{key:"mapTooltipXPosition",value:function(t){var e=this.state;if(e.yExtremes){var n=getClosestInArray(t,e.xAxis.positions,!0),i=this.dataByIndex[n];this.tip.setValues(i.xPos+this.tip.offset.x,i.yExtreme+this.tip.offset.y,{name:i.formattedLabel,value:""},i.values,n),this.tip.showTip()}}},{key:"renderLegend",value:function(){var t=this,e=this.data;e.datasets.length>1&&(this.legendArea.textContent="",e.datasets.map(function(e,n){var i=AXIS_LEGEND_BAR_SIZE,a=legendBar(i*n,"0",i,t.colors[n],e.name);t.legendArea.appendChild(a)}))}},{key:"makeOverlay",value:function(){var t=this;if(this.init)return void(this.init=0);this.overlayGuides&&this.overlayGuides.forEach(function(t){var e=t.overlay;e.parentNode.removeChild(e)}),this.overlayGuides=this.dataUnitComponents.map(function(t){return{type:t.unitType,overlay:void 0,units:t.units}}),void 0===this.state.currentIndex&&(this.state.currentIndex=this.state.datasetLength-1),this.overlayGuides.map(function(e){var n=e.units[t.state.currentIndex];e.overlay=makeOverlay[e.type](n),t.drawArea.appendChild(e.overlay)})}},{key:"updateOverlayGuides",value:function(){this.overlayGuides&&this.overlayGuides.forEach(function(t){var e=t.overlay;e.parentNode.removeChild(e)})}},{key:"bindOverlay",value:function(){var t=this;this.parent.addEventListener("data-select",function(){t.updateOverlay()})}},{key:"bindUnits",value:function(){var t=this;this.dataUnitComponents.map(function(e){e.units.map(function(e){e.addEventListener("click",function(){var n=e.getAttribute("data-point-index");t.setCurrentDataPoint(n)})})}),this.tip.container.addEventListener("click",function(){var e=t.tip.container.getAttribute("data-point-index");t.setCurrentDataPoint(e)})}},{key:"updateOverlay",value:function(){var t=this;this.overlayGuides.map(function(e){var n=e.units[t.state.currentIndex];updateOverlay[e.type](n,e.overlay)})}},{key:"onLeftArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex-1)}},{key:"onRightArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex+1)}},{key:"getDataPoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.currentIndex,e=this.state;return{index:t,label:e.xAxis.labels[t],values:e.datasets.map(function(e){return e.values[t]})}}},{key:"setCurrentDataPoint",value:function(t){var e=this.state;(t=parseInt(t))<0&&(t=0),t>=e.xAxis.labels.length&&(t=e.xAxis.labels.length-1),t!==e.currentIndex&&(e.currentIndex=t,fire(this.parent,"data-select",this.getDataPoint()))}},{key:"addDataPoint",value:function(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.state.datasetLength;_get$3(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"addDataPoint",this).call(this,t,n,i),this.data.labels.splice(i,0,t),this.data.datasets.map(function(t,e){t.values.splice(i,0,n[e])}),this.update(this.data)}},{key:"removeDataPoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.datasetLength-1;this.data.labels.length<=1||(_get$3(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"removeDataPoint",this).call(this,t),this.data.labels.splice(t,1),this.data.datasets.map(function(e){e.values.splice(t,1)}),this.update(this.data))}},{key:"updateDataset",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.data.datasets[e].values=t,this.update(this.data)}},{key:"updateDatasets",value:function(t){this.data.datasets.map(function(e,n){t[n]&&(e.values=t[n])}),this.update(this.data)}}]),e}(BaseChart),chartTypes={bar:AxisChart,line:AxisChart,percentage:PercentageChart,heatmap:Heatmap,pie:PieChart},Chart=function t(e,n){return _classCallCheck(this,t),getChartByType(n.type,e,n)};
//# sourceMappingURL=frappe-charts.min.esm.js.map


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "proton-chart-" + this.name } })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-444cfc62", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pInput__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pInput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pInput__);


/* harmony default export */ __webpack_exports__["a"] = (function (Vue) {
    Vue.component(__WEBPACK_IMPORTED_MODULE_0__pInput___default.a.name, __WEBPACK_IMPORTED_MODULE_0__pInput___default.a);
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(20)
/* template */
var __vue_template__ = __webpack_require__(21)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/pInput/pInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-516ec04f", Component.options)
  } else {
    hotAPI.reload("data-v-516ec04f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'p-input',

    props: {
        name: String,
        placeholder: String,
        label: String,
        help: String,
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        monospaced: {
            type: Boolean,
            default: false
        }
    }
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "mb-3" }, [
    _vm.label
      ? _c("label", {
          staticClass: "form__label",
          attrs: { for: _vm.name },
          domProps: { innerHTML: _vm._s(_vm.label) }
        })
      : _vm._e(),
    _vm._v(" "),
    _c("input", {
      staticClass: "form__control",
      class: { "font-mono": _vm.monospaced },
      attrs: {
        id: _vm.name,
        type: _vm.type,
        placeholder: _vm.placeholder,
        readonly: _vm.readonly,
        disabled: _vm.disabled
      },
      domProps: { value: _vm.value },
      on: {
        input: function($event) {
          _vm.$emit("input", $event.target.value)
        }
      }
    }),
    _vm._v(" "),
    _vm.help
      ? _c("p", {
          staticClass: "form__help",
          domProps: { innerHTML: _vm._s(_vm.help) }
        })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-516ec04f", module.exports)
  }
}

/***/ })
/******/ ]);