import request from "supertest";
// Since this test is in the 'config' folder, these files are in the same directory
import app, { setupRoutes } from "./app.js"; 
import AppDataSource from "./data-source.js"; 

// Use '../' because 'entities' is one level up from the 'config' folder
import User from "../entities/User.js"; 

describe("User API Integration Tests", () => {
  let userRepository;

  beforeAll(async () => {
    // Connect to the real PostgreSQL Assignment-2-db
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    userRepository = AppDataSource.getRepository(User);

    // Pass real repository to routes (No Mocking)
    setupRoutes(userRepository);
  });

  afterAll(async () => {
    // Close database connection after all tests are done
    await AppDataSource.destroy();
  });

  afterEach(async () => {
    // Requirement: Clean up test data after execution
    // We delete only the user created by this test to keep the DB clean
    await userRepository.delete({ email: "test-integration@example.com" });
  });

  test("POST /users should store a user in the real database", async () => {
    const testUser = {
      name: "Integration Test User",
      email: "test-integration@example.com",
      password: "password123",
      age: 25
    };

    // 1. Make the API request
    const response = await request(app)
      .post("/users")
      .send(testUser);

    // 2. Verify API response
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");

    // 3. Verify Database Persistence (Requirement: Verify stored in DB)
    const dbUser = await userRepository.findOneBy({ email: testUser.email });
    
    expect(dbUser).toBeDefined();
    expect(dbUser.name).toBe(testUser.name);
    expect(dbUser.email).toBe(testUser.email);
    
    console.log("Integration Test Passed: User found in database with ID:", dbUser.id);
  });
});