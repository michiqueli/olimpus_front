"use client";

import List from "../../list";
import { useState } from "react";
import { ActiveAdminsProps } from "../../interfaces";
import Pagination from "../../pagination";
import EditButton from "../../buttons/editButton";
import AlertButton from "../../buttons/alertButton";
import deleteUser from "@/components/requests/deleteUser";

const ActiveAdmins: React.FC<ActiveAdminsProps> = (props) => {
  const {admins, setAdmins} = props;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;
  const lastIndex = currentPage * pagination;
  const firstIndex = lastIndex - pagination;
  const dataShow = admins.slice(firstIndex, lastIndex);
  
// Filtrado de usuarios por dni y name//
// const filteredUsers = admins.filter((user) => {
//   const lowercaseSearchTerm = search.toLowerCase();
//   return (
//     (user.dni && user.dni.toLowerCase().includes(lowercaseSearchTerm)) ||
//     (user.name && user.name.toLowerCase().includes(lowercaseSearchTerm))
//   );
// });

   const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearch(target.value)
   }

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
                    <tr>
                      <th scope="col" className="px-6 py-4">Nombre</th>
                        <th scope="col" className="px-6 py-4">DNI</th>
                        <th scope="col" className="px-6 py-4">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataShow.map((user, index) => (
              <tr key={index} 
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4"> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : ''}</td>
                <td>
                  <EditButton title='Ver usuario' route={`/editUser/${user.id}`}/>
                </td>
                <td>
                  <AlertButton title='Desactivar' onClickfunction={() => deleteUser(user.id, setAdmins)}/>
                </td>
              </tr>
                ))}
                  </tbody>
                </table>
              </List>
              <div className="flex items-center justify-center mt-6 space-x-4">
              <Pagination data={admins} recordsPerPage={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>  
        </div>
    )
}

export default ActiveAdmins;