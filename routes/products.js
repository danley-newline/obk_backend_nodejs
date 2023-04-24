import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/Product.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createProduct);

//UPDATE
router.put("/:id", verifyUser, updateProduct);

//DELETE
router.delete("/:id", verifyUser, deleteProduct);

//GET 
router.get("/find/:id", getProduct);


//GET ALL
router.get("/", getProducts);

export default router;
