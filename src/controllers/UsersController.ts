import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";

import { User } from "../entity/User";

const router = express.Router();

//Criar a rota para cadastrar usuário

router.post("/users", async (req: Request, res:Response) => {
    try {
        let data = req.body
        // console.log(data)
        
        //Criar uma instância do repositório de User
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

export default router