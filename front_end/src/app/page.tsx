import Link from "next/link";
import {Button} from "primereact/button";
import { Panel } from 'primereact/panel';

export default function Home() {
  return (
    <div>
       <Panel header="Bem-vindo André!" className="w-full p-4 shadow-lg rounded-lg">
        <Link href="/users/list" passHref>
              <Button
                label="Usuários"
                className="bg-blue-500 text-white border-2 border-blue-500 shadow-md hover:bg-blue-600 hover:border-blue-600 rounded-md p-2 transition-all duration-200"
              />
        </Link>
       </Panel>
      
    
      {/* <Link href="/users/list">Usuários</Link>
      <Button label="Clique aqui" icon="pi pi-check"/> */}
     
    </div>
  );
}
