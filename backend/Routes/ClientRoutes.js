import express from "express";
import { createClient,updateClient,deleteClient,getAllClients } from "../Controllers/ClientControllers.js";

const router = express.Router();

router.post("/AddClient", createClient);
router.put("/UpdateClient/:id", updateClient);
router.delete("/DeleteClient/:id", deleteClient);
router.get("/getAllClients", getAllClients);

export default router;