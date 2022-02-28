import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMovies1644017056818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "movies",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true
            },
            {
              name: "user_id",
              type: "uuid"
            },
            {
              name: "title",
              type: "varchar"
            },
            {
              name: "duration",
              type: "numeric"
            },
            {
              name: "summary",
              type: "varchar"
            },
            {
              name: "genre",
              type: "varchar"
            },
            {
              name: "episode",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "rating",
              type: "varchar",
              isNullable: true,
            },
            {
              name: "watched",
              type: "boolean",
              default: false,
            },
            {
              name: "watched_at",
              type: "timestamp",
              isNullable: true
            },
            {
              name: "release_at",
              type: "timestamp",
              isNullable: true
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()",
            },
          ],
          foreignKeys: [
            {
              name: "FKMovies",
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              columnNames: ["user_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
          ],
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("movies");
    }

}
