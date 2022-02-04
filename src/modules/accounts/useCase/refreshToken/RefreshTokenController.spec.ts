import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("Refresh token Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("should be able to refresh token", async () => {
    const user = {
      name: 'test user token',
      email: 'usertoken@test.com',
      password: '123456'
    }

    await request(app)
      .post("/users")
      .send({ name: user.name, email: user.email, password: user.password })

    const authenticated = await request(app)
      .post("/session")
      .send({ email: user.email, password: user.password })

    const refreshedToken = await request(app)
      .post(`/refresh-token/${authenticated.body.refresh_token}`)

    expect(refreshedToken.body).toHaveProperty("token");
    expect(refreshedToken.body).toHaveProperty("refresh_token");
  })

  it("should not be able to refresh token if token is incorrect", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    await request(app)
      .post("/users")
      .send({ name: user.name, email: user.email, password: user.password })

    const authenticated = await request(app)
      .post("/session")
      .send({ email: user.email, password: user.password })

    const refreshedToken = await request(app)
      .post(`/refresh-token/${authenticated.body.token}`)

    expect(refreshedToken.status).toBe(400);
  })
})
