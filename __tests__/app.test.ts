import app from "../app";

import supertest, { Response, SuperTest } from "supertest";
import { Server } from "http";

let server: Server;
let request: SuperTest<any>;

beforeAll(async () => {
  server = app.listen();
  request = supertest(server);
});

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

afterAll(async () => {
  server.close();
});
