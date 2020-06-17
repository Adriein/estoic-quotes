"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
exports.isEmpty = function (obj) {
    return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
};
