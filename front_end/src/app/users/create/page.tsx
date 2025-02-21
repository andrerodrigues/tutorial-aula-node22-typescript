"use client";

import React, { useState, useRef, useEffect } from "react";
import instance from "@/services/api";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from 'primereact/messages';

import Link from "next/link";

export default function Create() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const msgs = useRef<Messages>(null);

  const handleSubmit =  async (event:React.FormEvent) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

     try {
        const response = await instance.post("/users", {
            name: nome,
            email: email,
        });
        console.log(response.data);
        setSuccess(response.data.message);
        setNome("");
        setEmail("");
     } catch (error: any) {
        console.log(error.response);  
        setError(error.response.data.message);
    }
    console.log(`Nome: ${nome}, Email: ${email}`);
  };

  useEffect(() => {
    if (error && msgs.current) {
      msgs.current.show({ severity: 'error', summary: 'Erro', detail: error });
    }
    if (success && msgs.current) {
      msgs.current.show({ severity: 'success', summary: 'Sucesso', detail: success });
    }
  }, [error, success]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
      <div className="w-full flex justify-between items-center bg-blue-500 text-white p-4 shadow-lg fixed top-0 left-0 right-0">
        <h1 className="text-xl font-bold">Cadastrar Usuário</h1>
        <Link href="/users/list" passHref>
          <Button label="Listar" className="p-button-outlined text-white border-white hover:bg-white hover:text-blue-500" />
        </Link>
      </div>

      <div className="w-full max-w-lg mt-10 p-4">
        <Panel className="w-full shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-white">
          <Messages ref={msgs} />
            {/* {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>} */}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nome</label>
                <InputText 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  className="w-full border rounded-md p-2" 
                  placeholder="Digite seu nome" 
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <InputText 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full border rounded-md p-2" 
                  placeholder="Digite seu email" 
                />
              </div>

              <Button type="submit" label="Cadastrar" className="w-full bg-blue-500 text-white border-2 border-blue-500 shadow-md hover:bg-blue-600 hover:border-blue-600 rounded-md p-2 transition-all duration-200" />
            </form>
          </div>
        </Panel>
      </div>
    </div>
  );
}
