import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("should be able to authenticate user", async () => {
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

    expect(authenticated.status).toBe(201)
    expect(authenticated.body).toHaveProperty("token");
    expect(authenticated.body.user.name).toEqual(user.name);
  })

  it("should not be able to authenticate if user not existe", async () => {
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
      .send({
        email: 'notExist@test.com',
        password: '123'
      })

    expect(authenticated.status).toBe(400);
  })

  it("should not be able to authenticate if password is incorrect", async () => {
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
      .send({
        email: user.email,
        password: '123'
      })

    expect(authenticated.status).toBe(400);
  })
})
