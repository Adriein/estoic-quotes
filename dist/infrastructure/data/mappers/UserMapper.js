"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
var UserMapper = /** @class */ (function () {
    function UserMapper() {
    }
    UserMapper.prototype.userSchemaToDomainUser = function (_a) {
        var _id = _a._id, username = _a.username, email = _a.email, password = _a.password;
        return { _id: _id, username: username, email: email, password: password };
    };
    return UserMapper;
}());
exports.UserMapper = UserMapper;
