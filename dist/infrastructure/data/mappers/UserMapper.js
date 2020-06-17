"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
var UserMapper = /** @class */ (function () {
    function UserMapper() {
    }
    UserMapper.prototype.userSchemaToDomainUser = function (_a) {
        var _id = _a._id, username = _a.username;
        return { _id: _id, username: username };
    };
    return UserMapper;
}());
exports.UserMapper = UserMapper;
