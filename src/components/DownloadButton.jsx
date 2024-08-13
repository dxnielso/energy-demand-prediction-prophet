import React, { forwardRef } from "react";
import ReactToPrint from "react-to-print";

const DownloadButton = forwardRef(({ componentRef }, ref) => {
  return (
    <ReactToPrint
      trigger={() => (
        <button className="px-5 py-2 bg-red-500 duration-200 rounded-md outline-none hover:opacity-70 focus:opacity-80 text-white hover:shadow-lg hover:shadow-black/30">
          Descargar Gráfica
        </button>
      )}
      content={() => componentRef.current} // Asegúrate de pasar la referencia correcta aquí
      documentTitle="grafica_prediccion"
    />
  );
});

export default DownloadButton;
