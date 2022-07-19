import app from "../app";
import request from "supertest";

describe("Get Routes", () => {
  test("GET /", async () => {
    await request(app).get("/").expect(200);
  });
});
