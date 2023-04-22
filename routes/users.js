import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("Hello user your are logged!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("Hello user your are logged and you can delete your account!")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("Hello Admin your are logged and you can delete all account!")
// })

//UPDATE
router.put("/:id", verifyUser,updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET 
router.get("/:id", verifyUser, getUser);


//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
