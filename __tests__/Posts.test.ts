import chai from "chai";
const expect = chai.expect;
import request from "supertest";
import app from "../app";

describe("GET /api/users", () => {
  // it("responds with status 200", (done) => {
  //   request(app).get("/api/users").expect(200, done);
  // });
  // it("responds with an array of users", (done) => {
  //   request(app)
  //     .get("/api/users")
  //     .end((err, res) => {
  //       expect(res.body).to.be.an("array");
  //       done();
  //     });
  // });
  test("GET /error", async () => {
    return true;
  });
});
