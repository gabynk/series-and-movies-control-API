import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("Update User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("shoud be able to update user", async () => {
    await request(app)
      .post("/users")
      .send({ name: "User test", email: "test@email.com", password: "123456" })

    const tokens = await request(app)
      .post("/session")
      .send({ email: "test@email.com", password: "123456" })

    const uptadeUser = await request(app)
      .put("/users/update")
      .send({
        email: 'test@user.com',
        password: '123456',
        newPassword: '654321'
      })
      .set({
        Authorization: `Bearer ${tokens.body.token}`,
      })

    expect(uptadeUser.status).toBe(201)
    expect(uptadeUser.body).toHaveProperty("id");
    expect(uptadeUser.body.email).toEqual("test@user.com");
  })

  it("should not be able to update user if password not math", async () => {
    await request(app)
      .post("/users")
      .send({ name: "User test", email: "test@email.com", password: "123456" })

    const tokens = await request(app)
      .post("/session")
      .send({ email: "test@email.com", password: "123456" })

    const uptadeUser = await request(app)
      .put("/users/update")
      .send({
        password: '654321',
        newPassword: '654321'
      })
      .set({
        Authorization: `Bearer ${tokens.body.token}`,
      })

    expect(uptadeUser.status).toBe(400);
  })
})
