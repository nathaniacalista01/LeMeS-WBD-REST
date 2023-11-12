"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = exports.STATUS = void 0;
var STATUS;
(function (STATUS) {
    STATUS[STATUS["ACCEPTED"] = 0] = "ACCEPTED";
    STATUS[STATUS["WAITING"] = 1] = "WAITING";
    STATUS[STATUS["REJECTED"] = 2] = "REJECTED";
})(STATUS || (exports.STATUS = STATUS = {}));
var Source;
(function (Source) {
    Source["PDF"] = "PDF";
    Source["VIDEO"] = "VIDEO";
})(Source || (exports.Source = Source = {}));
