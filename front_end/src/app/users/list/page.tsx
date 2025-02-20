"use client";

import instance from "@/services/api";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column"
import { Button } from "primereact/button";

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
        <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold text-gray-700">Usuários</h2>
          {/* <Button label="Adicionar Usuário" icon="pi pi-user-plus" className="p-button-success p-button-rounded p-button-sm" /> */}
        </div>
      );

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        {error && <div className="text-red-500">{error}</div>}
            <DataTable
                value={users}
                header={tableHeader}
                className="p-datatable-striped shadow-lg rounded-lg"
                >
                <Column
                    field="id"
                    header="ID"
                    className="text-sm font-medium text-gray-700 bg-gray-100 p-2 rounded-tl-lg"
                />
                <Column
                    field="name"
                    header="Nome"
                    className="text-sm font-medium text-gray-700 bg-gray-100"
                />
                <Column
                    field="email"
                    header="E-mail"
                    className="text-sm font-medium text-gray-700 bg-gray-100 rounded-tr-lg"
                />
           </DataTable>
    </div>
    );
}