import { useState, useEffect, createRef } from "react";
import Spinner from "./assets/spinner.svg";
import Input from "./components/Input";
import Predicciones from "./components/Predicciones";
import DownloadButton from "./components/DownloadButton";

const App = () => {
  const URL = "https://eaae-35-234-40-241.ngrok-free.app";
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predicciones, setPredicciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const prediccionesRef = createRef();
  const componentRef = createRef();

  useEffect(() => {
    const now = new Date();

    // Configurar la fecha de inicio con hora 00:00
    const start = new Date(now.setHours(0, 0, 0, 0));
    setStartDate(formatDate(start));

    // Configurar la fecha de fin con hora 23:59
    const end = new Date(now.setHours(23, 0, 0, 0));
    setEndDate(formatDate(end));
  }, []);

  useEffect(() => {
    if (predicciones.length > 0) {
      prediccionesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [predicciones]);

  const handeSetStartDate = (newValue) => {
    setStartDate(`${newValue}:00`);
  };

  const handleSetEndDate = (newValue) => {
    setEndDate(`${newValue}:00`);
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (
      startDate === "" ||
      startDate === ":00" ||
      endDate === "" ||
      endDate === ":00"
    )
      return;

    setLoading(true);

    try {
      const url = `${URL}/predict?start_date=${formatDateAndTime(
        startDate
      )}&end_date=${formatDateAndTime(endDate)}`;
      // console.log("Request URL:", url);

      const res = await fetch(url, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!res.ok) {
        throw new Error("Ocurrió un error");
      }

      const data = await res.json();
      // console.log(data);
      setPredicciones(data.predictions);
    } catch (error) {
      console.error("Ocurrió un error al intentar fetch a la API:", error);
    }

    setLoading(false);
  };

  const formatDateAndTime = (fechaHora) => {
    let fechaHoraFormateada = fechaHora.slice(0, 14) + "00:00";
    fechaHoraFormateada = fechaHoraFormateada.replace("T", " ");
    return fechaHoraFormateada;
  };

  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 19); // formato "YYYY-MM-DDTHH:mm"
  };

  return (
    <section className="bg-gray-200 min-h-screen w-full py-20">
      <div className="max-w-6xl mx-auto flex flex-col justify-start items-center">
        <img src="/icono.png" alt="Icono de la aplicación" className="w-44" />
        {/* inputs y button */}
        <div className="flex space-x-4 mt-4 mb-14 items-end">
          <Input
            id="inicio"
            text="Fecha Inicio"
            value={startDate}
            handleChange={handeSetStartDate}
          />
          <Input
            id="fin"
            text="Fecha Fin"
            value={endDate}
            handleChange={handleSetEndDate}
          />
          <button
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:opacity-80 focus:opacity-70 outline-none duration-200 cursor-pointer h-min hover:shadow-md hover:shadow-black/30"
            onClick={handleSubmit}
          >
            {loading ? (
              <img src={Spinner} alt="Cargando..." className="h-6" />
            ) : (
              "Consultar"
            )}
          </button>
        </div>

        {predicciones.length > 0 && !loading ? (
          <div className="min-w-full flex flex-col items-end space-y-3">
            <Predicciones predicciones={predicciones} ref={componentRef} />
            <DownloadButton componentRef={componentRef} />
            <div ref={prediccionesRef}></div>
          </div>
        ) : loading ? (
          <img src={Spinner} alt="Cargando datos..." className="w-14" />
        ) : (
          <p className="font-semibold text-black/80">No hay resultados.</p>
        )}
      </div>
    </section>
  );
};

export default App;
