import { Response } from "supertest";

import { request } from "../config";

describe("Get Posts", () => {
  it("GET /api/posts", async () => {
    const response: Response = await request.get("/api/posts");
    expect(response.status).toBe(200);
  });
});
