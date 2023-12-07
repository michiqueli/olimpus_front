import NavBar from "./components/navbar";
import Footer from "./components/footer";
import PrimaryButton from "./components/primaryButton";
import AlertButton from "./components/alertButton";
import EditButton from "./components/editButton";
import CreateProductForm from "./components/createProduct";
export default function Home() {
  return (
    <main>
      <NavBar />
      Olimpus Shop APP
      <PrimaryButton title='Nuevo botón'/>
      <AlertButton title='Alerta'/>
      <EditButton title='Editar'/>
      <CreateProductForm/>
      <Footer />
    </main>
  )
}
