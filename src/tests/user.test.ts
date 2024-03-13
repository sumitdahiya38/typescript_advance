import * as request from "supertest"; // Install this package for making HTTP requests in tests.
import app from "../index";

describe("User API", () => {
  it("should return user data when a valid token is provided", async () => {
    const token = "thisisavalidtokenrequiredforauthentication"; 

    const response = await request(app)
      .get("/users")
      .set("Authorization", token);

    const data = response.body;
    expect(response.statusCode).toBe(200);
    data.forEach((user: { id: number; username: string; email: string }) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("email");
    });
  });

  it("should return an error when an invalid token is provided", async () => {
    const token = "invalidToken"; 

    const response = await request(app)
      .get("/users")
      .set("Authorization", token);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Access denied. Invalid token."
    );
  });
});
