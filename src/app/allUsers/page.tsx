"use client";

import { Users } from "../../components/interfaces";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import ActiveAdmins from "../../components/users/admins/adminUsers";
import InactiveAdmins from "../../components/users/admins/inactiveAdmins";
import ActiveBuyers from "../../components/users/buyers/buyerUsers";
import InactiveBuyers from "../../components/users/buyers/inactiveBuyers";
import { useAppSelector } from "@/Redux/hooks";
import { getUsers } from "@/Redux/sliceUsers";
import getAllUsers from "../../components/requests/getAllUsers";
import PrimaryButton from "../../components/buttons/primaryButton";

export default function AllUsers(){
  //const listUsers = useAppSelector<UserList[]>(users);
  const filtusers = useAppSelector(getUsers);
  const [component, setComponent] = useState(true);
  const [active, setActive] = useState(true);
  const router = useRouter();
  const [admins, setAdmins] = useState<Users[]>([]);
  const [inactiveAdmins, setInactiveAdmins] = useState<Users[]>([]);
  const [buyers, setBuyers] = useState<Users[]>([]);
  const [inactiveBuyers, setInactiveBuyers] = useState<Users[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userList = await getAllUsers();
        const filteredAdmins = userList.filter((user: Users) => user.roleid === 1 && user.isActive === true);
        const filteredBuyers = userList.filter((user: Users) => user.roleid === 3 && user.isActive === true);
        const filteredInactiveBuyers = userList.filter((user: Users) => user.roleid === 3 && user.isActive === false);
        const filteredInactiveAdmins = userList.filter((user: Users) => user.roleid === 1 && user.isActive === false);
  
        setAdmins(filteredAdmins);
        setBuyers(filteredBuyers);
        setInactiveBuyers(filteredInactiveBuyers)
        setInactiveAdmins(filteredInactiveAdmins)
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

  const toggleActive = () => {
    setActive(!active);
  };  
  

  return (
    <div>
      <div className="left-0 right-0 mx-auto mb-4 flex justify-center mt-4">
        <PrimaryButton onClickfunction={() => setComponent(!component)} title={component ? "Ver administradores" : "Ver usuarios"}/>
        <PrimaryButton onClickfunction={toggleActive} title={active ? "Inactivos" : "Activos"}/>
      </div>
      <div className="flex flex-col items-center w-full">
      {component ? (
          active ? 
          <ActiveBuyers buyers={buyers} setBuyers={setBuyers} /> : <InactiveBuyers buyers={inactiveBuyers} setBuyers={setBuyers}/>) 
        : (
          active ? <ActiveAdmins admins={admins} setAdmins={setAdmins}/> : <InactiveAdmins admins={inactiveAdmins} setAdmins={setAdmins}/>
          )}
      </div>
      <div className="left-0 right-0 mx-auto mb-4 flex justify-center mt-4"> 
        <PrimaryButton onClickfunction={() => router.push('/createUsers')} title='Crear nuevo usuario'/>
        <PrimaryButton onClickfunction={() => router.push('/adminDashboard')} title='Ir al inicio'/>
      </div>
    </div>
  );
}