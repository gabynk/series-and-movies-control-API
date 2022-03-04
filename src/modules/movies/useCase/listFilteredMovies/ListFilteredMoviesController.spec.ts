import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("List Filtered Movies Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("shoud be able to filter user movies", async () => {
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
    await request(app)
      .post("/movies")
      .send({
        title: 'test title 2',
        duration: 60,
        summary: 'test summary',
        genre: 'test',
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
      .get("/movies/filter")
      .send({
        genre: 'test',
      })
      .set({
        Authorization: `Bearer ${tokens.body.token}`,
      })

    expect(listMovie.status).toBe(200)
    expect(listMovie.body).toHaveLength(1)
  })

  it("shoud not be able to filter movie with invalid user token", async () => {
    const response = await request(app)
      .get("/movies/filter")
      .set({
        Authorization: `Bearer invalid-token`,
      })

    expect(response.status).toBe(401);
  })
})
