import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id",updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", getUsers);

export default router;
