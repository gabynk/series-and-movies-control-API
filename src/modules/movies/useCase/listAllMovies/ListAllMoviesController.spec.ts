import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("List All Movies Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("shoud be able to list all user movies", async () => {
    await request(app)
      .post("/users")
      .send({ name: "User test", email: "test@email.com", password: "123456" })

    const tokens = await request(app)
      .post("/session")
      .send({ email: "test@email.com", password: "123456" })

    await request(app)
      .post("/movies")
      .send({
        title: 'test title',
        duration: 60,
        summary: 'test summary',
        genre: 'test genre',
        episode: 'test ep',
        rating: 'test rating',
        watched: false,
        watched_at: new Date,
        release_at: new Date,
      })
      .set({
        Authorization: `Bearer ${tokens.body.token}`,
      })

    const listMovie = await request(app)
      .get("/movies")
      .set({
        Authorization: `Bearer ${tokens.body.token}`,
      })

    expect(listMovie.status).toBe(200)
    expect(listMovie.body[0]).toHaveProperty("id")
    expect(listMovie.body).toHaveLength(1)
  })

  it("shoud not be able to list all movie with invalid user token", async () => {
    const response = await request(app)
      .get("/movies")
      .set({
        Authorization: `Bearer invalid-token`,
      })

    expect(response.status).toBe(401);
  })
})
