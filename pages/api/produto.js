import nc from "next-connect";
const db = require("../../db");

const handler = nc()
  .get(async (req, res) => {
    res.json({
      produtos: db.produtos,
    });
  })

  .post(async (req, res) => {
    const { id, name, quantityTotal, quantity } = req.body;

    const novoProduto = {
      id,
      name,
      quantityTotal,
      quantity,
    };

    db.produtos.push(novoProduto);

    return res.status(200).json({ ok: true });
  })

  .put(async (req, res) => {
    const { id } = req.query;
    const produto = db.produtos.find((produto) => produto.id == id);
    const indice = db.produtos.findIndex((produto) => produto.id == id);

    const { quantity } = req.body;

    produto.quantity = quantity;

    const novoProduto = {
      ...produto,
      ...quantity,
    };

    db.produtos.splice(indice, 1, novoProduto);

    return res.status(201).json({ ok: true });
  })

  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
