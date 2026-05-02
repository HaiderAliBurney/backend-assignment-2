import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" }); // Load variables first!

import app, { setupRoutes } from "./config/app.js"; 
import AppDataSource from "./config/data-source.js"; 
import User from "./entities/User.js";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Assignment-2-db successfully!");
    
    const userRepository = AppDataSource.getRepository(User);
    setupRoutes(userRepository);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));