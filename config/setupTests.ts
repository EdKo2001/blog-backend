import app from "../app";
import supertest from "supertest";

export const request = supertest(app);
export let server: any;

if (process.env.NODE_ENV === "test") {
  beforeAll((done) => {
    server = app.listen(done());
  });

  afterAll((done) => {
    server.close(done());
  });
}
