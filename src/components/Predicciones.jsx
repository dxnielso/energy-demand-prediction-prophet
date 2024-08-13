import { useEffect, useRef, forwardRef } from "react";
import { createChart } from "lightweight-charts";

const Predicciones = forwardRef(({ predicciones }, ref) => {
  const chartContainerRef = useRef(null);

  const chartOptions = {
    layout: {
      textColor: "black",
      background: { type: "solid", color: "#f3f4f6" },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
  };

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, chartOptions);
    const lineSeriesOne = chart.addLineSeries({ color: "green" });

    // Convertir y pasar los datos directamente
    lineSeriesOne.setData(formatPredicciones());
    //  console.log("PRINT DE PREDICCIONES");
    //  console.log(formatPredicciones());

    chart.timeScale().fitContent();

    // Cleanup en caso de desmontaje
    return () => chart.remove();
  }, [predicciones]);

  const formatPredicciones = () => {
    return predicciones.map((prediccion) => {
      // Crear un objeto Date en UTC
      const date = new Date(prediccion.ds + "Z"); // Añadir 'Z' para asegurar que se trate como UTC
      return {
        time: Math.floor(date.getTime() / 1000), // Convertir a segundos
        value: prediccion.yhat,
      };
    });
  };

  return (
    <div className="relative h-[500px] min-w-[100%]" ref={ref}>
      <div ref={chartContainerRef} className="h-full w-full" />

      {/* Título del gráfico */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-lg font-bold z-50 text-black/90">
        Predicciones de Demanda de Energía en Estados Unidos
      </div>

      {/* Etiqueta del eje Y */}
      <div className="absolute top-1/2 -right-28 transform translate-y-1/2 rotate-90 text-md font-bold z-50 text-black/90">
        Demanda (Megawatts )
      </div>

      {/* Etiqueta del eje X */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-md font-bold z-50 text-black/90">
        Fecha y Hora
      </div>
    </div>
  );
});

export default Predicciones;
