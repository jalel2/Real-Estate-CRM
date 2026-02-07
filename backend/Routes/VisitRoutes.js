import express from "express";
import {createVisit,updateVisit,deleteVisit,getAllVisits,getVisitById} from "../Controllers/VisitControllers.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/AddVisit", protect, createVisit);
router.put("/UpdateVisit/:id", protect, updateVisit);
router.delete("/DeleteVisit/:id", protect, deleteVisit);
router.get("/getAllVisits", protect, getAllVisits);
router.get("/getVisitById/:id", protect, getVisitById);

export default router;