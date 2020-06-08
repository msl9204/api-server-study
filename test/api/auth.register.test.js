const request = require("supertest");
const app = require("../../app");

it("should return 200 for successful registration", (done) => {
    request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "password" })
        .expect(200, done);
});

it("should return token after registeration", (done) => {
    request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "password" })
        .then((resp) => {
            expect(resp.body.token).toBeTruthy();
            done();
        });
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

it("should make a new user after registration", (done) => {
    request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com", password: "passpass" })
        .expect(200, done);
});
