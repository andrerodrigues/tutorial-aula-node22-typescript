"use client";

import instance from "@/services/api";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column"
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Link from "next/link";

//Importar o componente Menu
import MenuComponent from "@/components/Menu";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Users() {
    const [error, setError] = useState<string | null>(null);

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await instance.get("/users");
            setUsers(response.data);
        } catch (error) {
            setError("Erro ao buscar os usuários");
        }
    };  

    useEffect(() => {
        fetchUsers();
    }, []);

    const tableHeader = (
        <div className="sticky top-0 z-10 w-full p-3 bg-blue-100 shadow-md">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-700">Listar Usuários</h2>
    
                <Link href="/users/create" passHref>
                    <Button
                        label="Cadastrar"
                        className="bg-blue-500 text-white border-2 border-blue-500 shadow-md hover:bg-blue-600 hover:border-blue-600 rounded-md p-2 transition-all duration-200"
                    />
                </Link>
            </div>
        </div>
    );
    

    return (
      <div className="flex flex-col h-screen bg-gray-100">
            <MenuComponent />
            <div className="flex-1 px-2 py-6 max-w=6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">Listar Usuários</h2>
                    <Button
                    className="bg-green-500 text-white border-2 border-green-500 rounded-md shadow-md hover:bg-green-600"
                    >
                        <Link href="/users/create" className="text-xl font-bold text-gray-700" passHref>Cadastrar</Link>
                    </Button>
                </div>

                {error && <div className="text-red-500 mt-4">{error}</div>}
                <Card className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <DataTable
                        className="w-full border-collapse"
                        value={users}
                        paginator
                        rows={5} // Define a quantidade de itens por página
                        rowsPerPageOptions={[5]} // Define que o usuário pode ver 5 itens por vez
                        >
                        <Column
                            field="id"
                            header={<span className="text-green-500 font-bold bg-gray-100">ID</span>}
                            className="border p-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-green-100"
                        />
                        <Column
                            field="name"
                            header={<span className="text-green-500 font-bold">Nome</span>} 
                            className="border p-3  text-sm font-medium text-gray-700 bg-gray-100 hover:bg-green-100"
                        />
                        <Column
                            field="email"
                            header={<span className="text-green-500 font-bold">Email</span>}
                            className="border p-3  text-sm font-medium text-gray-700 bg-gray-100 hover:bg-green-100"
                        />
                    </DataTable>
                </Card>
            </div>    
      </div>
    );
}