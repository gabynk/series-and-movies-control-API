import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("shoud be able to create a new user", async () => {
    const user = await request(app)
      .post("/users")
      .send({ name: "User test", email: "test@email.com", password: "123456" })

    expect(user.status).toBe(201)
    expect(user.body).toHaveProperty("id");
    expect(user.body.name).toEqual("User test");
  })

  it("shoud not be able to create user if already exist", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    await request(app)
      .post("/users")
      .send(user)

    const response = await request(app)
      .post("/users")
      .send(user)

    expect(response.status).toBe(400);
  })
})
