import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routes/OrderRouter.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true })); // to parse body in json format (body parser)
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const PORT = process.env.PORT || 5000;
const uri =
  "mongodb://root:verysecret@16.171.0.193:27017/data_db?authSource=admin";

mongoose.connect(uri, (err) => {
  if (err) throw err;
  console.log("connected..." + uri);
});

app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
