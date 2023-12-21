"use client";
import React from "react";

export default function About() {
  return (
    <div className="sm:flex items-center">
      <div className="p-10 ml-20">
        <div className="object-center text-center max-w-screen-xl">
          <img
            width={400}
            height={400}
            src="/olimpus.png"
            alt="About Us"
            className=""
          />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text ml-40">
          <h2 className="my-4 font-bold text-3xl sm:text-4xl text-center">
            Acerca de Olimpus
          </h2>
          <p className="text-gray-700 mt-6 mb-2">
            En Olimpus, te ofrecemos lo mejor en ropa deportiva,
             suplementos y equipos de gimnasio, todo en un solo lugar.
              Nos dedicamos a darte moda deportiva moderna, suplementos avanzados y equipos de alta calidad.
          </p>
          <div className="mb-2">
            <span className="text-gray-600   uppercase my-4 font-bold text-center">
              Visión:
            </span>
            <p className="text-gray-700 mt-1">
              Queremos ser el lugar al que acudes cuando buscas inspiración
              y todo lo necesario para sentirte genial en tu camino hacia la vida saludable.
              Nos esforzamos por ser los mejores al ofrecer productos increíbles,
               un servicio excepcional y compromiso total con tu éxito.
            </p>
          </div>
          <div>
            <span className="text-gray-600   uppercase my-4 font-bold text-center">
              Misión:
            </span>
            <p className="text-gray-700 mt-2">
              Nuestro objetivo es hacer que tu vida sea más saludable y activa.
               Ofrecemos ropa deportiva, suplementos y equipos de gimnasio.
                Estamos aquí para guiarte en tu viaje de fitness, brindándote productos que
                 te hagan sentir bien y te ayuden a alcanzar tus metas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


