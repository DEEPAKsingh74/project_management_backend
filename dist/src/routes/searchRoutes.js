"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchControllers_1 = require("../controllers/searchControllers");
const router = (0, express_1.Router)();
router.get("/", searchControllers_1.getSearch);
exports.default = router;
