import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/products", productRoutes);

export default app;
