const request = require("supertest");
const app = require("../app");

test("always pass", () => {
    expect(true).toBeTruthy();
});

test("should provide the root page", (done) => {
    request(app).get("/").expect(200).expect(200, done);
});

test("sholud provide swagger UI", (done) => {
    request(app).get("/api-docs").expect(301, done);
});
