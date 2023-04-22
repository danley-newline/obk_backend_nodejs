import Credit from "../models/Credit.js";
import Product from "../models/Product.js";

export const createCredit = async (req, res, next) => {

    // const newCredit = new Credit(req.body);

    // let product = req.body.productId;
    // const product = await Product.findById(
    //   req.body.productId
    // );


    let postedCredit = req.body;

    const findProduct = await Product.findOne({code: postedCredit.product.code})
    if(!findProduct) return res.status(404).json("Produit introuvable, erreur sur le nom!")

    postedCredit.isGranted = postedCredit.montant <= postedCredit.product.maxAmount ? true : false;
    postedCredit.productId = postedCredit.product._id;
    postedCredit.product = postedCredit.product;
    postedCredit.limitDate = new Date(postedCredit.limitDate);

    const newCredit = new Credit(postedCredit);


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