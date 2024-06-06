import express from "express";
import { getUser, getUserById } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUser);
router.get('/:id', getUserById);

export default router