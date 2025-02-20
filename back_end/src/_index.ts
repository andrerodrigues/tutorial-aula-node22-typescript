import express, {Request, Response} from "express"

const app = express()

const portList = [8080, 8081, 3000, 3001, 5000, 4000, 8888, 9000, 10000]; // Lista de portas possíveis
let index = 0;

app.get("/", (req:Request,res:Response) => {
    res.send("Bem-vindo André")
})

const startServer = () => {
    if (index >= portList.length) {
        console.error("Nenhuma porta disponível na lista.");
        process.exit(1); // Encerra o processo caso todas estejam ocupadas
    }

    const port = portList[index];
    const server = app.listen(port, () => {
        console.log(`Servidor iniciado na porta ${port}: http://localhost:${port}`);
    });

    server.on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log(`Porta ${port} em uso, tentando a próxima...`);
            index++; // Passa para a próxima porta da lista
            startServer();
        } else {
            console.error("Erro ao iniciar o servidor:", err);
        }
    });
};

startServer();

