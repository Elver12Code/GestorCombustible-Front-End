import jsPDF from "jspdf";
import "jspdf-autotable";

const generarPDF = (datos) => {
  // Preprocesar los datos
  const datosProcesados = datos.map((item, index) => ({
    ...item,
    item: index + 1, // Agregar la columna "Item" con un número único para cada registro
    fecha: new Date(item.fecha).toLocaleDateString("es-ES"), // Formato de fecha en español
    maquina: item.maquina ? item.maquina.nombre  : item.maquina, // Si 'maquina' es un objeto, accedemos a 'nombre'
    conductor: item.conductor ? `${item.conductor.nombres} ${item.conductor.apellidos}` : item.conductor,
    placa: item.maquina ? item.maquina.placa : item.maquina,
    unidadOperativa: item.unidadOperativa
     ? `${item.unidadOperativa.name}` 
     : item.unidadOperativa,
    solicitante: item.solicitante
      ? `${item.solicitante.nombres} ${item.solicitante.apellidos}`
      : item.solicitante, // Nombre completo del solicitante
    autorizado: item.autorizado
      ? `${item.autorizado.nombres} ${item.autorizado.apellidos}`
      : item.autorizado, // Nombre completo del autorizado
    cantidad: item.cantidad ? parseFloat(item.cantidad).toFixed(2) : "0.00", // Formato con dos decimales
  }));

  const totalCantidad = datos.reduce(
    (total, item) => total + (parseFloat(item.cantidad) || 0),
    0
  );

  // Crear una fila para los totales
  const filaTotales = {
    id: "",
    formNumber: "",
    fecha: "",
    solicitante: "Total",
    conductor: "",
    maquina: "",
    placa: "",
    combustible: "",
    unidad: "",
    cantidad: totalCantidad.toFixed(2),
    meta: "",
    unidadOperativaId: "",
  };

  // Agregar la fila de totales al final
  datosProcesados.push(filaTotales);

  

  // Verificar si hay múltiples metas u oficinas
  const metasUnicas = [...new Set(datos.map((item) => item.meta || "Sin meta"))];
  const oficinasUnicas = [...new Set(datos.map((item) => item.unidadOperativaId || "Sin oficina"))];

  // Determinar si mostrar la meta o no
  const mostrarMeta =
    metasUnicas.length === 1 ? metasUnicas[0] : null; // Obtener la única meta si solo hay una

  // Generar la tabla de resumen
  const resumen = [];
  const agrupados = {};

  datos.forEach((item) => {
    const tipoCombustible = item.combustible || "Desconocido";
    const cantidad = parseFloat(item.cantidad) || 0;

    if (!agrupados[tipoCombustible]) {
      agrupados[tipoCombustible] = {
        descripcion: tipoCombustible,
        unidad: "Galón",
        total: 0,
      };
    }

    agrupados[tipoCombustible].total += cantidad;
  });

  Object.values(agrupados).forEach((group) => {
    resumen.push({
      descripcion: group.descripcion,
      unidad: group.unidad,
      total: group.total.toFixed(2), // Formato con dos decimales
    });
  });

  // Crear documento PDF
  const doc = new jsPDF("landscape", "mm", "a4");

  const imgData = "/Escudo_de_Macusani.png";
  doc.addImage(imgData, "PNG", 20, 3, 25, 25);

  // Título del reporte
  doc.setFont("times-roman", "italic", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Registro de Vales de Combustible", 110, 20);

  // Mostrar la meta si corresponde
  if (mostrarMeta && mostrarMeta !== "Sin meta") {
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);
    doc.text(`META: ${mostrarMeta}`, 110, 25);
  }

  // Configurar columnas de la tabla principal
  const columnas = [
    { header: "Item", dataKey: "item" },  // Nueva columna "Item"
   // { header: "ID", dataKey: "id" },
    { header: "Num", dataKey: "formNumber" },
    { header: "Fecha", dataKey: "fecha" },
    { header: "Solicitante", dataKey: "solicitante" },
    { header: "Conductor", dataKey: "conductor" },
    { header: "Vehiculo", dataKey: "maquina" },
    { header: "Placa", dataKey: "placa" },
    { header: "Combustible", dataKey: "combustible" },
    { header: "Unidad", dataKey: "unidad" },
    { header: "Cant", dataKey: "cantidad" },
    { header: "Meta", dataKey: "meta" },
    { header: "Unidad/op", dataKey: "unidadOperativaId" },
  ];

  // Generar la tabla principal
  doc.autoTable({
    columns: columnas,
    body: datosProcesados,
    startY: mostrarMeta && mostrarMeta !== "Sin meta" ? 30 : 25, // Ajustar inicio según si se muestra meta
    headStyles: {
      fillColor: [9, 115, 0],
      fontSize: 8,
    },
    styles: {
      fontSize: 8,
    },
  });

  // Configurar columnas de la tabla resumen
  const columnasResumen = [
    { header: "Descripción", dataKey: "descripcion" },
    { header: "Unidad", dataKey: "unidad" },
    { header: "Total", dataKey: "total" },
  ];

  // Generar la tabla de resumen debajo de la principal
  doc.autoTable({
    columns: columnasResumen,
    body: resumen,
    startY: doc.previousAutoTable.finalY + 10, // Empieza después de la tabla principal
    headStyles: {
      fillColor: [9, 115, 0],
      fontSize: 10,
    },
    styles: {
      fontSize: 10,
    },
    columnStyles: {
      descripcion: { cellWidth: 50 }, // Ancho personalizado para la columna "Descripción"
      unidad: { cellWidth: 20 }, // Ancho personalizado para la columna "Unidad"
      total: { cellWidth: 20 }, // Ancho personalizado para la columna "Total"
    },
  });

  // Guardar el PDF
  doc.save("reporte_consumos.pdf");
};

export default generarPDF;
