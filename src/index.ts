import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";

const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!");

        app.get("/", (req: Request, res: Response) => {
            res.send("Bem-vindo André");
        });

        // Inicia o servidor em uma porta livre escolhida pelo sistema
        const server = app.listen(0, () => {
            const address = server.address();
            if (typeof address === "object" && address !== null) {
                console.log(`Servidor iniciado na porta ${address.port}: http://localhost:${address.port}`);
            }
        });
})
.catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});