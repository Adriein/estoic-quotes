"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var errors_1 = require("../../core/errors");
// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   }
//   try {
//     const payload = jwt.verify(
//       req.session.jwt,
//       process.env.JWT_KEY!
//     ) as UserPayload;
//     req.currentUser = payload;
//   } catch (err) {}
//   next();
// };
exports.requireAuth = function (req, res, next) {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        throw new errors_1.NotAuthorizedError();
    }
    try {
        var payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
        next();
    }
    catch (err) {
        throw new errors_1.NotAuthorizedError();
    }
};
