import jsPDF from "jspdf";
import "jspdf-autotable";

const generarPDF = (datos) => {

  // Preprocesamos los datos para asegurarnos de que 'maquina' sea un string y no un objeto
  const datosProcesados = datos.map((item) => ({
    ...item,
    fecha: new Date(item.fecha).toLocaleDateString('es-ES'),  // Formato de fecha en español (día/mes/año)
    maquina: item.maquina ? item.maquina.nombre : item.maquina,  // Si 'maquina' es un objeto, accedemos a 'nombre'
    solicitante: item.solicitante ? `${item.solicitante.nombres} ${item.solicitante.apellidos}` : item.solicitante,  // Si 'maquina' es un objeto, accedemos a 'nombre'
    autorizado: item.autorizado ? `${item.autorizado.nombres} ${item.autorizado.apellidos}` : item.autorizado,  // Si 'maquina' es un objeto, accedemos a 'nombre'
  }));  

  const doc = new jsPDF("landscape", "mm", "a4");  // Crea un documento en orientación horizontal (landscape)
  
  // Título del reporte
  doc.setFontSize(18);
  doc.text("Reporte de Consumos", 14, 20);

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
  });

  // Guardar el PDF
  doc.save("reporte_consumos.pdf");
};
export default generarPDF;
