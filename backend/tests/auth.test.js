import request from "supertest";
import app from "../src/index.js"; 
import { sequelize } from "../src/db/database.js";

// Ensure we close the connection so Jest exits properly
afterAll(async () => {
  await sequelize.close();
});

describe("Auth Integration Tests", () => {
  
  // 1. REGISTER: Missing Fields
  it("should return 400 if required fields are missing on register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "incomplete_user" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  // 2. REGISTER: Missing Role
  it("should return 400 if role is missing on register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "johndoe",
        email: `test${Date.now()}@test.com`,
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("role missing");
  });

  // 3. REGISTER: Duplicate Email
  it("should return 400 if email already exists", async () => {
    const email = `dup${Date.now()}@test.com`;
    const userData = {
      username: "firstuser",
      email,
      password: "password123",
      role: "user",
    };

    await request(app).post("/api/auth/register").send(userData);
    const res = await request(app).post("/api/auth/register").send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("already exists");
  });

  // 4. LOGIN: Missing Credentials
  it("should return 400 if email or password is not provided", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "", password: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("no email or password provided");
  });

  // 5. LOGIN: Wrong Password
  it("should return 400 for wrong password", async () => {
    // First, register a user to test against
    const email = `wrongpass${Date.now()}@test.com`;
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email,
      password: "correctpassword",
      role: "user"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: email, password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("email or password mismatched");
  });

  // 6. LOGIN: Unverified User
  it("should return 400 if user is not verified", async () => {
    const email = `unverified${Date.now()}@test.com`;
    
    // In your User model, isVerified defaults to true. 
    // To test this, your addUser controller must be sending a verification email
    // and setting isVerified to false (or you manually change it in the DB for this test).
    
    await request(app).post("/api/auth/register").send({
      username: "unverifieduser",
      email,
      password: "Pa$$w0rd!",
      role: "user",
    });

    // Note: If your model default is true, this test will fail unless 
    // you update the User model to defaultValue: false for isVerified.
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "Pa$$w0rd!" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("user not verified");
  });
});