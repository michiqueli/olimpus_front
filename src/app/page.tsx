import NavBar from "./components/navbar";
import Footer from "./components/footer";
// import PrimaryButton from "./components/primaryButton";
// import AlertButton from "./components/alertButton";
// import EditButton from "./components/editButton";
// import CreateProductForm from "./components/createProduct";

import NovedadesSlicer from "./components/novedadesSlicer";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="w-[80%]">
      {/* Olimpus Shop APP
      <PrimaryButton title='Nuevo botón'/>
      <AlertButton title='Alerta'/>
      <EditButton title='Editar'/> */}
      <NovedadesSlicer/>
      </div>
    </main>
  )
}
