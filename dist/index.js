"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/test');
mongoose_1.default.connection.on('open', function (_) { return console.log('Connection!'); });
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });
var User = mongoose_1.default.model('User', userSchema);
var user = new User({ username: 'Adria' });
user.save();
