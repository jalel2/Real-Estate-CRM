import express from "express";
import { createLead,updateLead,deleteLead,getLeads,getLeadById,convertLeadToClient } from "../Controllers/LeadController.js";
import { protect } from "../Middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/AddLead", protect, createLead);
router.put("/UpdateLead/:id", protect, updateLead);
router.delete("/DeleteLead/:id", protect, deleteLead);
router.get("/getLeads", protect, getLeads);
router.get("/getLeadById/:id", protect, getLeadById);
router.post("/convertLeadToClient/:id", protect, convertLeadToClient);

export default router;