import Router from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const getProduct = await collection.find({}).toArray();
  return res.json({
    data: getProduct,
  });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const newProductData = { ...req.body };
  await collection.insertOne(newProductData);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  const editProductData = { ...req.body };

  await collection.updateOne({ _id: productId }, { $set: editProductData });
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);

  await collection.deleteOne({ _id: productId });
  return res.json({
    message: "Product has been deleted successfully",
  });
});
export default productRouter;
