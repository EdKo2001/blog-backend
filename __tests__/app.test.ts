import { Response } from "supertest";

import { request } from "../config";

describe("Get Routes", () => {
  test("GET /404", async () => {
    const response: Response = await request.get("/404");
    expect(response.status).toBe(404);
  });

  test("GET /error", async () => {
    const response: Response = await request.get("/error");
    expect(response.status).toBe(500);
  });
});
