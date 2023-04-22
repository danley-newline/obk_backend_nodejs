import Credit from "../models/Credit.js";
import Product from "../models/Product.js";

export const createCredit = async (req, res, next) => {

    try {

      let postedCredit = req.body;

      try {
        let product = await Product.findById(
          req.body.productId
        );

        postedCredit.isGranted = postedCredit.montant <= product.maxAmount ? true : false;
        postedCredit.limitDate = new Date(postedCredit.limitDate);

        console.log(product);

        const newCredit = new Credit(postedCredit);

        let saveCredit = await newCredit.save();
        saveCredit.product = product;

        res.status(201).json(saveCredit);


      } catch (error) {
        console.log("OK ", error);
        return res.status(404).json(error)
      }

      
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