import "reflect-metadata"

import { DataSource, Entity } from "typeorm"
import { Users } from "./entity/Users.entity"


// 
export const Source = async () => {
  const source = new DataSource(
    {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "",
      database: "db",
      synchronize: true,
      logging: true,
      entities: [Users],
      subscribers: [],
      migrations: [],
    }
  )

  await source.initialize()

  return source

}


