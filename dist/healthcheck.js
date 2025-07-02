"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * GET /health
 * 回傳 HTTP 200
 */
router.get('/health', (_req, res) => {
    res.sendStatus(200);
});
exports.default = router;
