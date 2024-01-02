"use client";

import List from "../../list";
import { useState } from "react";
import activateUser from "@/components/requests/activateUser";
import { useRouter } from "next/navigation";
import { ActiveBuyersProps } from "../../interfaces";
import Pagination from "../../pagination";
import EditButton from "../../buttons/editButton";
import Field from "../../field";

const InactiveBuyers: React.FC<ActiveBuyersProps> = (props) => {
  const {buyers, setBuyers} = props;
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;
  const lastIndex = currentPage * pagination;
  const firstIndex = lastIndex - pagination;

 // Filtrado de usuarios //

const filteredUsers = buyers.filter((user) => {
  const lowercaseSearchTerm = search.toLowerCase();
  return (
    (user.email && user.email.toLowerCase().includes(lowercaseSearchTerm)) ||
    (user.name && user.name.toLowerCase().includes(lowercaseSearchTerm))
  );
});

  //Paginación
  const userActive = filteredUsers.filter((user) => user.isActive == false);
  const userShow = userActive.slice(firstIndex, lastIndex);

   const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearch(target.value)
   };

    return (
          <div className="flex flex-col items-center">
            <div className="flex justify-center mt-6 w-full">
              <Field
              placeholder='Busca por NOMBRE o DNI'
              name='Search'
              onChange={() => searchUser}
              value={search}
              />
            </div>
            <List>
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr className="border-b border-gray">
                      <th scope="col" className="px-6 py-4">Nombre</th>
                      <th scope="col" className="px-6 py-4">Dni</th>
                      <th scope="col" className="px-6 py-4">Tipo</th>
                    </tr>
                </thead>
                <tbody>
              
                  {userShow.map((user, index) => (
                    <tr key={index} 
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                     <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                     <td className="whitespace-nowrap px-6 py-4">{user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
                      <td>
                        <EditButton route={`/editUser/${user.id}`} title='Ver usuario'/>
                      </td>
                      <td>
                        <button onClick={() => activateUser(user.id, setBuyers)}>
                          <a className="text-custom-red px-3">Re activar</a>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </List>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <Pagination data={userActive} recordsPerPage={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>  
          </div>
    )
}

export default InactiveBuyers;