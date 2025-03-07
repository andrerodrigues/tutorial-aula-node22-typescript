import express, { Request, Response } from "express";
//import { AppDataSource } from "./data-source";
import UsersController from './controllers/UsersController';
import cors from 'cors';

const app = express();
//Criar o middleware para receber os dados no corpo da requisição
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.use('/', UsersController)

app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo André");
});

// Inicia o servidor em uma porta livre escolhida pelo sistema
const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
    // const address = server.address();
    // if (typeof address === "object" && address !== null) {
    //     console.log(`Servidor iniciado na porta ${address.port}: http://localhost:${address.port}`);
    // }
});

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Banco de dados conectado com sucesso!");

        // app.get("/", (req: Request, res: Response) => {
        //     res.send("Bem-vindo André");
        // });

        // // Inicia o servidor em uma porta livre escolhida pelo sistema
        // const server = app.listen(0, () => {
        //     const address = server.address();
        //     if (typeof address === "object" && address !== null) {
        //         console.log(`Servidor iniciado na porta ${address.port}: http://localhost:${address.port}`);
        //     }
        // });
// })
// .catch((error) => {
//     console.error("Erro ao conectar ao banco de dados:", error);
// });