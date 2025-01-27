import jsPDF from "jspdf";
import "jspdf-autotable";
import { BiFontSize } from "react-icons/bi";

const generarPDF = (datos) => {

  // Preprocesamos los datos para asegurarnos de que 'maquina' sea un string y no un objeto
  const datosProcesados = datos.map((item) => ({
    ...item,

    fecha: new Date(item.fecha).toLocaleDateString('es-ES'),  // Formato de fecha en español (día/mes/año)
    maquina: item.maquina ? item.maquina.nombre : item.maquina,  // Si 'maquina' es un objeto, accedemos a 'nombre'
    solicitante: item.solicitante ? `${item.solicitante.nombres} ${item.solicitante.apellidos}` : item.solicitante,  // Si 'maquina' es un objeto, accedemos a 'nombre'
    autorizado: item.autorizado ? `${item.autorizado.nombres} ${item.autorizado.apellidos}` : item.autorizado,  // Si 'maquina' es un objeto, accedemos a 'nombre'
  }));  
  
  const totalCantidad = datos.reduce((total, item) => total + (item.cantidad || 0), 0);
  // Crear una fila para los totales
  const filaTotales = {
    id: "",
    formNumber: "",
    fecha: "",
    solicitante: "Total", // Texto que indica que esta es la fila de totales
    autorizado: "",
    maquina: "",
    placa: "",
    combustible: "",
    unidad: "",
    cantidad: totalCantidad.toFixed(2), // Total con dos decimales
    meta: "",
    unidadOperativaId: "",
  };

  // Agregar la fila de totales al final
  datosProcesados.push(filaTotales);

  const doc = new jsPDF("landscape", "mm", "a4");  // Crea un documento en orientación horizontal (landscape)
  
  const imgData = '/Escudo_de_Macusani.png';    
  doc.addImage(imgData, 'PNG', 20, 3, 25, 25);
  // Título del reporte
  
  doc.setFont("times-roman", "italic", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Registro de Vales de Combustible", 110, 20);

  
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`GENERADOS: DESDE ${startDate} HASTA ${endDate}`, 110, 25);
  

  // Configurar las columnas de la tabla
  const columnas = [
    { header: "ID", dataKey: "id" },
    { header: "Num", dataKey: "formNumber" },
    { header: "Fecha", dataKey: "fecha" },
    { header: "Solicitante", dataKey: "solicitante" },
    { header: "Conductor", dataKey: "autorizado" },
    { header: "Vehiculo", dataKey: "maquina" },
    { header: "Placa", dataKey: "placa" },
    { header: "Combustible", dataKey: "combustible" },
    { header: "Unidad", dataKey: "unidad" },
    { header: "Cant", dataKey: "cantidad" },
    { header: "Meta", dataKey: "meta" },
    { header: "Unidad/op", dataKey: "unidadOperativaId" },
    
    // Agrega más columnas si es necesario
  ];

  // Generar la tabla
  doc.autoTable({
    columns: columnas,
    body: datosProcesados,
    startY: 30, // Dónde empieza la tabla
    headStyles: {
      fillColor: [9, 115, 0],
      fontSize: 8,
    },
    styles: {
      fontSize: 8,
    }
  });

  // Guardar el PDF
  doc.save("reporte_consumos.pdf");
};
export default generarPDF;
