"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Options_1 = require("./Options");
var ScrollType_1 = __importDefault(require("./ScrollType"));
var ScrollDetector = /** @class */ (function () {
    function ScrollDetector(options) {
        if (options === void 0) { options = null; }
        this.options = __assign(__assign({}, options), Options_1.defaultOptions);
    }
    ScrollDetector.prototype.getWrapperElements = function () {
        if (!this.options.wrapperClass) {
            return null;
        }
        return Array.from(document.querySelectorAll(this.options.wrapperClass));
    };
    ScrollDetector.prototype.debugLog = function () {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        if (this.options.debug) {
            console.log(options);
        }
    };
    ScrollDetector.prototype.init = function () {
        var _this = this;
        // CHECK IF THERE ARE ANY ELEMENTS
        if (!this.getWrapperElements()) {
            this.debugLog("%cscrollDetector - init(): No wrapper elements found, try checking your classnames", "color: red", this.options.wrapperClass);
            return;
        }
        this.debugLog("scrollDetector - init(): Found elements", this.getWrapperElements());
        var _loop_1 = function (wrapper) {
            // PREVENT DOUBLE-INIT WHICH WOULD RESULT IN CALLING THIS CODE TWICE OR MORE
            if (wrapper.classList.contains("-js-scrollDetector-init")) {
                return "continue";
            }
            wrapper.classList.add("-js-scrollDetector-init");
            var scroller = Array.from(wrapper.getElementsByClassName(this_1.options.scrollClass))[0];
            if (!scroller) {
                this_1.debugLog("%cscrollDetector - init(): This wrapper does not have scroll element inside.", "color: red", wrapper);
                return "continue";
            }
            switch (wrapper.getAttribute("data-scrollType")) {
                case ScrollType_1.default.horizontal: {
                    // RUN ONCE ON DOMREADY
                    document.addEventListener("DOMContentLoaded", function () { return _this.detectXScrollPosition(scroller); });
                    // KEEP CHECKING WHEN SCROLLING THROUGH
                    scroller.addEventListener("scroll", function () { return _this.detectXScrollPosition(scroller); });
                }
                case ScrollType_1.default.vertical: {
                    // RUN ONCE ON DOMREADY
                    document.addEventListener("DOMContentLoaded", function () { return _this.detectYScrollPosition(scroller); });
                    // KEEP CHECKING WHEN SCROLLING THROUGH
                    scroller.addEventListener("scroll", function () { return _this.detectYScrollPosition(scroller); });
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.getWrapperElements(); _i < _a.length; _i++) {
            var wrapper = _a[_i];
            _loop_1(wrapper);
        }
    };
    ScrollDetector.prototype.detectXScrollPosition = function (scroller) {
        var offset = 5; // @todo: Add this to options
        var widthContainer = scroller.offsetWidth;
        var widthContent = scroller.getElementsByClassName(this.options.contentClass)[0].offsetWidth;
        var areaWrapper = scroller.closest("." + this.options.wrapperClass);
        var toStart = scroller.scrollLeft;
        var toEnd = (widthContainer - Math.ceil(widthContent) + Math.ceil(toStart)) * -1;
        if (toStart > 0 + offset) {
            areaWrapper.classList.add("-js-start-shadow"); // @todo: Add this class to options
        }
        else {
            areaWrapper.classList.remove("-js-start-shadow"); // @todo: Add this class to options
        }
        if (toEnd > 0 + offset) {
            areaWrapper.classList.add("-js-end-shadow"); // @todo: Add this class to options
        }
        else {
            areaWrapper.classList.remove("-js-end-shadow"); // @todo: Add this class to options
        }
    };
    ScrollDetector.prototype.detectYScrollPosition = function (scroller) {
        var offset = 5; // @todo: Add this to options
        var heightContainer = scroller.offsetHeight;
        var heightContent = scroller.getElementsByClassName(this.options.contentClass)[0].offsetHeight;
        var areaWrapper = scroller.closest("." + this.options.wrapperClass);
        var toStart = scroller.scrollTop;
        var toEnd = (heightContainer - Math.ceil(heightContent) + Math.ceil(toStart)) * -1;
        if (toStart > 0 + offset) {
            areaWrapper.classList.add("-js-start-shadow"); // @todo: Add this class to options
        }
        else {
            areaWrapper.classList.remove("-js-start-shadow"); // @todo: Add this class to options
        }
        if (toEnd > 0 + offset) {
            areaWrapper.classList.add("-js-end-shadow"); // @todo: Add this class to options
        }
        else {
            areaWrapper.classList.remove("-js-end-shadow"); // @todo: Add this class to options
        }
    };
    return ScrollDetector;
}());
exports.default = ScrollDetector;
