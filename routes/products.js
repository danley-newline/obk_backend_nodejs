import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/Product.js";
import { verifyToken , verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/",  createProduct);

//UPDATE
router.put("/:id",  updateProduct);

//DELETE
router.delete("/:id", deleteProduct);

//GET 
router.get("/find/:id", getProduct);


//GET ALL
router.get("/", getProducts);

export default router;
