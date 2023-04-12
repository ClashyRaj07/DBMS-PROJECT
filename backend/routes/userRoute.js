import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
// import makeQuery from '../dbQuery.js'
const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);

export default router;
