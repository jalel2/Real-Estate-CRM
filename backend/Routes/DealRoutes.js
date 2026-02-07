import express from "express";
import { createDeal } from "../Controllers/DealController.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/AddDeal", protect, createDeal);

export default router;