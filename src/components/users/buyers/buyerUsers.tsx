"use client";

import List from "../../list";
import { useState } from "react";
import deleteUser from "@/components/requests/deleteUser";
import { ActiveBuyersProps } from "../../interfaces";
import Pagination from "../../pagination";
import EditButton from "../../buttons/editButton";
import AlertButton from "../../buttons/alertButton";

const ActiveBuyers: React.FC<ActiveBuyersProps> = (props) => {
const {buyers, setBuyers} = props;
  const [search, setSearch] = useState("");
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

//Filtrado y paginado segun pagina actual

const userActive = filteredUsers.filter((user) => user.isActive == true);
const userShow = userActive.slice(firstIndex, lastIndex);

  const searchUser = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };


    return (
            <div className="flex flex-col items-center">
              <div className="flex justify-center mt-6 w-full">
                  <input 
                  className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
                  placeholder="Busca por NOMBRE o DNI"
                  type="text"
                  value={search}
                  onChange={searchUser}
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
                  {buyers.map((user) => (
                  <tr key={user.id} 
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user.roleid === 3 ? 'Buyer' : ''}</td>
                    <td>
                      <EditButton title='Ver usuario' route={`/userDetail/${user.id}`}/>
                    </td>
                    <td>
                      <AlertButton title="Desactivar" onClickfunction={() => deleteUser(user.id, setBuyers)}/>
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

export default ActiveBuyers;