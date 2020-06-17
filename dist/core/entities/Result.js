"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(_data) {
        this._data = _data;
    }
    Object.defineProperty(Result.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    return Result;
}());
exports.Result = Result;
