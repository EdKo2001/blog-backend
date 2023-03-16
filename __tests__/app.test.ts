import app from "../app";
import request from "supertest";

describe("Get Routes", () => {
  test("GET /error", async () => {
    await request(app).get("/error").expect(500);
  });
});
