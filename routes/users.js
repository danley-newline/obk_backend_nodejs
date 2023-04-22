import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyUser,updateUser);

router.delete("/:id",verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyUser, getUsers);

export default router;
