import React, { useState, useRef } from 'react';
import { Menubar } from "primereact/menubar";
import Link from 'next/link';

const MenuComponent = () => {  
    const items = [
        { label: "Usuários", url: "/users/list" },
        { label: "Sair", url: "#" },
      ];

    return (
        <div className="bg-blue-700 text-white p-4 w-full">
            <div className="max-w-6xl flex items-center">
                <h2 className="text-xl font-bold">
                <Link href="/">Celke</Link>
                </h2>
                <div className="ml-6 w-full">
                <Menubar
                    model={items}
                    className="bg-blue-700 border-none text-white"
                />
                </div>
            </div>
        </div>
    );
}

export default MenuComponent;