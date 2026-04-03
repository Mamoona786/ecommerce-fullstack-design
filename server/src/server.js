import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT || 5000;

console.log("GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
console.log("CLIENT_URL:", process.env.CLIENT_URL);

connectDB();

const startServer = async () => {
  const { default: app } = await import("./app.js");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
