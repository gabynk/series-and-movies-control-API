import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("Create Movies Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("shoud be able to create a new movie", async () => {
    await request(app)
      .post("/users")
      .send({ name: "User test", email: "test@email.com", password: "123456" })

    const tokens = await request(app)
      .post("/session")
      .send({ email: "test@email.com", password: "123456" })

    const movie = await request(app)
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

    expect(movie.status).toBe(201)
    expect(movie.body).toHaveProperty("id")
    expect(movie.body.title).toEqual("test title")
  })

  it("shoud not be able to create movie with invalid user token", async () => {
    const response = await request(app)
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
        Authorization: `Bearer invalid-token`,
      })

    expect(response.status).toBe(401);
  })
})
