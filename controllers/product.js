import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
      const saveProduct = await newProduct.save();
      res.status(201).json(saveProduct);
    } catch (err) {
      next(err);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        next(err);
      }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(
          req.params.id
          );
        res.status(200).json("Product has been delected!");
      } catch (err) {

      next(err);
    }
}

export const getProduct = async (req, res, next) => {
   try {
      const product = await Product.findById(
        req.params.id
      );
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
}


export const getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    const datas = {
      count: product.length,
      data: product
    }
    res.status(200).json(datas);
  } catch (err) {
  next(err);
}
}
