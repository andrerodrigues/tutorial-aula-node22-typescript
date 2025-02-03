import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    name: "sqliteConnection", 
    type: "sqlite",
    database: "database.sqlite",
    entities: ["src/entity/*.ts"], // Ajuste conforme sua estrutura
    synchronize: true, // True apenas para desenvolvimento
});
