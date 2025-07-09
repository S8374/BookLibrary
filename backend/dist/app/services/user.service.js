"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Default role to 'user' if not provided
    const userWithRole = Object.assign(Object.assign({}, userData), { role: userData.role || 'user' });
    const user = new user_model_1.default(userWithRole);
    return yield user.save();
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find().select('+password');
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findById(id).select('-password');
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ email });
});
exports.getUserByEmail = getUserByEmail;
