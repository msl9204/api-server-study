const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");

beforeEach(() => {});

afterEach(async (done) => {
    await db.User.destroy({ truncate: true, cascade: true });
    done();
});

it("should return 200 for successful registration", (done) => {
    request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "password" })
        .expect(200, done);
});

it("should return token after registeration", async (done) => {
    const resp = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "password" });
    expect(resp.body.token).toBeTruthy();

    expect(() => {
        jwt.verify(resp.body.token, config.secret);
    }).not.toThrow();
    done();
});

it("should return 400 error if email is missing", (done) => {
    request(app)
        .post("/api/auth/register")
        .send({ password: "password" })
        .expect(400, done);
});

it("should return 400 error if password is missing", (done) => {
    request(app)
        .post("/api/auth/register")
        .send({ email: "password" })
        .expect(400, done);
});

it("should make a new user after registration", async (done) => {
    let user = await db.User.findOne({ where: { email: "test@test.com" } });

    expect(user).toBeNull();
    const resp = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "passpass" });
    console.log(resp.body);
    user = await db.User.findOne({ where: { email: "test@test.com" } });
    expect(user).not.toBeNull();
    done();
});
