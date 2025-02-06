import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    name: "sqliteConnection", 
    type: "sqlite",
    database: "database.sqlite",
    entities: [User], // Ajuste conforme sua estrutura
    migrations:[__dirname + "/migration/*.ts"],
    synchronize: true, // True apenas para desenvolvimento
});
