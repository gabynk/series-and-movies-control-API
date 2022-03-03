import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/typeorm";
import { app } from "../../../../shared/http/app";

let connection: Connection;

describe("Update Movies Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("shoud be able to update movie", async () => {
    await request(app)
      .post("/users")
      .send({ name: "User test", email: "test@email.com", password: "123456" })

    const tokens = await request(app)
      .post("/session")
      .send({ email: "test@email.com", password: "123456" })

    const createMovie = await request(app)
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

    const updateMovie = await request(app)
      .put("/movies/update")
      .send({
        movie_id: createMovie.body.id,
        title: 'test title',
        watched: true,
      })
      .set({
        Authorization: `Bearer ${tokens.body.token}`,
      })

    expect(updateMovie.status).toBe(200)
    expect(updateMovie.body).toHaveProperty("id")
    expect(updateMovie.body).toHaveProperty("updated_at")
    expect(updateMovie.body.watched).toEqual(true)
  })

  it("shoud not be able to update a movie with invalid user token", async () => {
    const response = await request(app)
      .put("/movies/update")
      .set({
        Authorization: `Bearer invalid-token`,
      })

    expect(response.status).toBe(401);
  })
})
