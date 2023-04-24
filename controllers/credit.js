import Credit from "../models/Credit.js";
import Product from "../models/Product.js";

export const createCredit = async (req, res, next) => {

    
  try {
    let postedCredit = req.body;

    let product = await Product.findById(
      req.body.productId
    );

    postedCredit.isGranted = postedCredit.montant <= product.maxAmount ? true : false;
    postedCredit.limitDate = new Date(postedCredit.limitDate);


    const newCredit = new Credit(postedCredit);

    let saveCredit = await newCredit.save();
    saveCredit.product = product;

    res.status(201).json(saveCredit);


  } catch (error) {

    return res.status(404).json({
      status: 404,
      message: `Product Id is unknow , check it ! 🙆‍♂️ ${error}`
  });
  }

}


export const deleteCredit = async (req, res, next) => {
  try {
    await Credit.findByIdAndDelete(
      req.params.id
      );
    res.status(200).json("Credit has been delected!");
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
      let credits = await Credit.find();
      let creditList = [];

      for (let credit of credits) {
        const productId = credit.productId;

        const product = await Product.findOne({ _id: productId });

        if (product) {
          credit.product = product;
          creditList.push(credit);
        }
      }

      const datas = {
        count: creditList.length,
        data: creditList.reverse()
      };
        res.status(200).json(datas);
      } catch (err) {
      next(err);
    }
}