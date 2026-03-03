import "reflect-metadata";
import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./config/datasource";
import { createDefaultAdmin } from "./bootstrap/createDefaultAdmin";

const PORT = Number(process.env.PORT) || 8000;

  AppDataSource.initialize()
   .then(async () => {
      console.log("Database connected...");

      await createDefaultAdmin();

      app.listen(PORT, () => {
         console.log(`Server running on http://localhost:${PORT}`);
      });
   }).catch((error) => {
    console.error("Database connection failed", error);
  });