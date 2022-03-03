import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../../../../modules/accounts/infra/typeorm/entities/User";

@Entity("movies")
class Movies {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  summary: string;

  @Column()
  genre: string;

  @Column()
  episode: string;

  @Column()
  rating: string;

  @Column()
  watched: boolean;

  @Column()
  watched_at: Date;

  @Column()
  release_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Movies }
