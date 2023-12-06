import NavBar from "./components/navbar";
import Footer from "./components/footer";
import PrimaryButton from "./components/primaryButton";
import AlertButton from "./components/alertButton";
import EditButton from "./components/editButton";
export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      Olimpus Shop APP
      <PrimaryButton title='Nuevo botón'/>
      <AlertButton title='Alerta'/>
      <EditButton title='Editar'/>
    <Footer></Footer>
    </main>
  )
}
