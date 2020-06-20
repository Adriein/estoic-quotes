"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errors_1 = require("../../core/errors");
var chalk_1 = __importDefault(require("chalk"));
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof errors_1.CustomError) {
        console.log(chalk_1.default.red.bold("Controled Application Error: " + err.message));
        return res
            .status(err.statusCode)
            .send({ errors: err.serialize() });
    }
    console.log(chalk_1.default.red.bold(err));
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
