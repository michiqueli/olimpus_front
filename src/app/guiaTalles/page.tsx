// Importa React y cualquier otra dependencia que necesites

export default function Talles() {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold mb-6 underline">Guía de Talles</h2>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/tallesMujer.jpg" alt="Talles para mujeres" className="w-full h-auto" />
        </div>

        {/* Imagen de talles para hombres */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/tallesHombre.jpg" alt="Talles para hombres" className="w-full h-auto" />
        </div>
      </div>

      
      <div className="w-full sm:w-1/2 lg:w-1/3 ml-96 mb-12">
        <img src="/tallesCalzado.jpg" alt="Talles para calzado" className="w-full h-auto" />
      </div>
    </div>
  );
}

  
  