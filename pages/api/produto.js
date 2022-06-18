import nc from "next-connect";

import connectToDatabase from "../../src/db/dbConnect";
import productsModel from "../../src/models/products";

const handler = nc()
  .get(async (req, res) => {
    await connectToDatabase();
    const data = await productsModel.find();

    res.json({
      produtos: data,
    });
  })

  .post(async (req, res) => {
    await connectToDatabase();
    const { name, quantityTotal, quantity, weight } = req.body;

    const product = new productsModel({
      name,
      quantityTotal,
      quantity,
      weight,
      updatedAt: new Date(),
    });

    const register = await product.save();

    if (register) {
      res.status(201).json({ success: true });
    } else {
      res.status(201).json({ success: false });
    }
  })

  .put(async (req, res) => {
    await connectToDatabase();
    const { id } = req.query;

    const produto = await productsModel.findById({ _id: id });

    const { quantity } = req.body;

    produto.quantity = quantity;

    const update = await produto.save();

    if (update) {
      res.status(201).json({ success: true });
    } else {
      res.status(201).json({ success: false });
    }
  });

export default handler;
