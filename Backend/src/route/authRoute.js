import login from "../controller/auth/Login.js";
import register from "../controller/auth/Register.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
