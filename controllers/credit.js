import Credit from "../models/Credit.js";
import Product from "../models/Product.js";

export const createCredit = async (req, res, next) => {

    const newCredit = new Credit(req.body);

    // let product = req.body.productId;

    // return console.log("HOLA ", product);

    try {
      let saveCredit = await newCredit.save();

      res.status(201).json(saveCredit);
    } catch (err) {
      next(err);
    }

}


export const deleteCredit = async (req, res, next) => {
  try {
    await Credit.findByIdAndDelete(
      req.params.id
      );
    res.status(200).json("Product has been delected!");
  } catch (err) {

  next(err);
}
}

export const getCredit = async (req, res, next) => {
   try {
      const credit = await Credit.findById(
        req.params.id
      );
      res.status(200).json(credit);
    } catch (err) {
      next(err);
    }
}

export const getCredits = async (req, res, next) => {
    try {
        const credits = await Credit.find();

        const datas = {
          count: credits.length,
          data: credits
        }
        res.status(200).json(datas);
      } catch (err) {
      next(err);
    }
}