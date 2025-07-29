"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/signup', authController_1.signup);
router.post('/verify-otp', authController_1.verifyOtp);
router.post('/login', authController_1.login);
router.post('/google-login', authController_1.googleLogin);
exports.default = router;
