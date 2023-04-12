import express from "express";
const router = express.Router();
import {
    addRelationships,
    deleteRelationships,
    getRelationships,
} from "../controllers/relationships.js";

router.get("/", getRelationships);
router.post("/", addRelationships);
router.delete("/", deleteRelationships);

export default router;
