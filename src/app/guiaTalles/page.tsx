export default function Talles() {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-custom mb-6 underline">Guía de Talles</h2>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/mujer.png" alt="Talles para mujeres" width={400} height={400} className="h-auto" />
        </div>
        <div className="sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/tallesMujer.png" alt="Talles para mujeres" width={500} height={500} className="h-auto" />
        </div>
        <div className="sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/hombre.png" alt="Talles para hombres" width={400} height={400} className="h-auto" />
        </div>
        <div className="sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/tallesHombre.png" alt="Talles para hombres" width={500} height={500} className="h-auto" />
        </div>

        <div className="sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/calzado.png" alt="Talles para calzado" width={400} height={400} className="h-auto" />
        </div>
        <div className="sm:w-1/2 lg:w-1/3 mb-8">
          <img src="/tallesCalzado.png" alt="Talles para calzado" width={500} height={500} className="h-auto" />
        </div>
      </div>
    </div>
  );
}



  
  