import express from "express";
import { createCredit, deleteCredit, getCredit, getCredits} from "../controllers/Credit.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", createCredit);

//UPDATE

//DELETE
router.delete("/:id",verifyUser, deleteCredit);

//GET 
router.get("/:id", verifyUser, getCredit);


//GET ALL
router.get("/", verifyUser,  getCredits);

export default router;
