import express from "express";
import { addProperty, updateProperty, deleteProperty,getAllProperties,getPropertyById } from "../Controllers/PropertyControllers.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const router = express.Router();


router.post("/AddProperty", protect, addProperty);
router.post("/UpdateProperty", protect, updateProperty);
router.post("/DeleteProperty", protect, deleteProperty);
router.get("/getAllProperties", getAllProperties);
router.get("/getPropertyById/:id", getPropertyById);

export default router;
