// index.js
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mariana0510:ALeByTF7oArrB99x@cluster0.aya4vo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://192.168.18.194:${PORT}/api`);
    });
  } catch (err) {
    console.error("❌ Error al conectar MongoDB:", err);
    process.exit(1);
  }
}

start();
