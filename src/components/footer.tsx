"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// import zeus from "../../assets/zeus.png"


const Footer: React.FC=()=>{
    const [currentTime, setCurrentTime] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const updateClock = () => {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const formattedTime = `${hours}:${minutes}`;
          setCurrentTime(formattedTime);
        };
        const intervalId = setInterval(updateClock, 60000);
    
        updateClock();
        return () => clearInterval(intervalId);
      }, []);

    return(
        <footer className="bg-yellow-300 relative w-[100%] items-center text-center">
            <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8 w-[80%]">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    <div className="px-5 py-2">
                        <a onClick={() => router.push("/about")} className="text-base leading-6 text-black-500 hover:text-blue-800">
                        Acerca de Olimpus
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="#" className="text-base leading-6 text-black-500 hover:text-blue-800">
                            Nuestras Sucursales
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a onClick={() => router.push("/guiaTalles")} className="text-base leading-6 text-black-500 hover:text-blue-800">
                            Guia de Talles
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <button onClick={() => router.push('/team')} className="text-base leading-6 text-black-500 hover:text-blue-800">
                            Equipo
                        </button>
                    </div>
                
                </nav>
                <div className="flex justify-center mt-8 space-x-6">
                    <a href="#" className="text-black-400 hover:text-blue-800">
                        <span className="sr-only">Gmail</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M21.35 3H2.65C1.87 3 1.25 3.62 1.25 4.38v15.24c0 .76.62 1.38 1.38 1.38h18.7c.76 0 1.38-.62 1.38-1.38V4.38c0-.76-.62-1.38-1.38-1.38zm-2.18 2.71l-7.07 5.67-7.07-5.67H19.17zM2.65 19.5V6.62l7.03 5.62L2.65 19.5zm2.18-1.09l2.89-2.32 1.47 1.18L6.67 18H4.83zM2.65 5.12V4h18.7v1.12l-9.35 7.48-9.35-7.48z" clipRule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-black-400 hover:text-blue-800">
                        <span className="sr-only">WhatsApp</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"  clipRule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="https://github.com/michiqueli/olimpus_front" target="blanck" className="text-black-400 hover:text-blue-800">
                        <span className="sr-only">GitHub</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
                <p id="clock" className="text-2xl">
                     {currentTime}
                </p>

                {/* <img src="zeus.png"></img>  */}
            </div>
        </footer>
    )    
}

export default Footer