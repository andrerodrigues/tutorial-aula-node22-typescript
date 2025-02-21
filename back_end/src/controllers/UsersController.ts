import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Not } from "typeorm";
import { User } from "../entity/User";

const router = express.Router();

//listar todos os usuários
router.get("/users", async(req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User)

        const users = await userRepository.find();
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({
            message:"Erro ao listar usuário!"
        })
    }
});

//listar um usuário específico
router.get("/users/:id", async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({ id: Number(id) })

        if(!user) {
            res.status(404).json({
                message:"Usuário não encontrado!"
            });
        }

        res.status(200).json({
            user:user
        });
       
    } catch(error) {
        res.status(500).json({
            message:"Erro ao visualizar o usuário!"
        });
    }
});

//Criar a rota para cadastrar usuário
router.post("/users", async (req: Request, res:Response) => {
    try {
        let data = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({ where: {email: data.email}})

        if(existingUser) {
            res.status(400).json({
                message:"Já existe usuário cadastrado com esse e-mail!"
            });
            return;
        }

        const newUser = userRepository.create(data)

        await userRepository.save(newUser);

        res.status(201).json({
            message:"Usuário cadastrado com sucesso!",
            user:newUser
        })
    } catch(error) {
        res.status(500).json({
            message:"Erro ao cadastrar usuário!"
        })
    }
});

//Criar a rota para atualizar usuário
router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
       // res.send(`Editar: ${id}`);
        let data = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { id: Number(id) } })

        if(!user) {
            res.status(404).json({
                message:"Usuário não encontrado!"
            });
            return;
        }

        const existingUser = await userRepository.findOne({ where: {email: data.email, id: Not(Number(id))}})
        if(existingUser) {
            res.status(400).json({
                message:"Já existe usuário cadastrado com esse e-mail!"
            });
            return;
        }

        userRepository.merge(user, data);
        const updateUser = await userRepository.save(user);

        res.status(200).json({
            message:"Usuário editado com sucesso!",
            user:updateUser,
        })

    }   catch(error) {
        res.status(500).json({
            message:"Erro ao atualizar usuário!"
        })
    }
});

//Deletar usuário
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: Number(id) } });

        if(!user) {
            res.status(404).json({
                message:"Usuário não encontrado!"
            });
            return;
        }

        await userRepository.remove(user);
        
        res.status(200).json({
            message:"Usuário apagado com sucesso!",
        })
        //const { id } = req.params;
        //const userRepository = AppDataSource.getRepository(User);   
    } catch(error) {
        res.status(500).json({
            message:"Erro ao apagar usuário!"
        })
    }
});
export default router