"use client";

import React, { useState, useRef, useEffect } from "react";
import instance from "@/services/api";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from 'primereact/messages';

//Importar o componente Menu
import MenuComponent from "@/components/Menu";

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
    <div className="flex flex-col h-screen bg-gray-100">
    <MenuComponent />
    <div className="flex-1 flex items-center justify-center px-2 py-6 mx-auto w-full">
      <div className="w-full max-w-lg p-4">
        <Panel className="w-full shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-white">
            <Messages ref={msgs} />
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nome</label>
                <InputText 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  className="w-full border rounded-md p-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none" 
                  placeholder="Digite seu nome" 
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <InputText 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full border rounded-md p-2 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none" 
                  placeholder="Digite seu email" 
                />
              </div>
  
              <Button type="submit" label="Cadastrar" className="w-full bg-blue-500 text-white border-2 border-blue-500 shadow-md hover:bg-green-600 hover:border-blue-600 rounded-md p-2 transition-all duration-200" />
            </form>
          </div>
        </Panel>
      </div>
    </div>
  </div>
  
  );
}
