import express from "express";
import {
    findUser,
    getUser,
    updateUser,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.get("/:userId", findUser);

export default router;
