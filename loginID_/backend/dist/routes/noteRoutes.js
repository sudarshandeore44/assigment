"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const noteController_1 = require("../controllers/noteController");
const router = express_1.default.Router();
// ✅ Get all notes for authenticated user
router.get('/', authMiddleware_1.protect, noteController_1.getNotes);
// ✅ Create a new note
router.post('/', authMiddleware_1.protect, noteController_1.createNote);
// ✅ Delete a note by ID
router.delete('/:id', authMiddleware_1.protect, noteController_1.deleteNote);
exports.default = router;
