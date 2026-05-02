import express from "express";
import { createUser, logoutUser } from "./controllers/userController.js";
// Import your auth middleware here for the logout route

const app = express();
app.use(express.json());

export const setupRoutes = (userRepository) => {
  app.post("/users", createUser(userRepository));
  
  // Note: /logout would typically have auth middleware
  app.post("/logout", logoutUser(userRepository)); 
};

export default app;