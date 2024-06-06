import express from "express";
import { register, login, deleteUser } from "../controllers/auth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/user/:id', deleteUser);

export default router;
