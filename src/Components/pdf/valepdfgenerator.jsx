// ValePdfGenerator.jsx
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Italic } from "lucide-react";



function ValePdfGenerator({ formData, formNumber, selectedUnit, selectedSolicitante, selectedAutorizado }) {
    
    const generatePDF = () => {
        // Verificar los datos antes de generar el PDF
    console.log('formData:', formData); // Verifica los datos del formulario
    console.log('selectedUnit:', selectedUnit); // Verifica la unidad seleccionada
    console.log('selectedSolicitante:', selectedSolicitante); // Verifica el solicitante seleccionado
    console.log('formNumber:', formNumber); // Verifica los datos del formulario

    const imgData = '/Escudo_de_Macusani.png';    
    const doc = new jsPDF();

    doc.addImage(imgData, 'PNG', 10, 3, 25, 25);

    // Título del PDF
    doc.setFont("times-roman", "italic");
    doc.setFontSize(12);
    doc.setTextColor(108,117,125);
    doc.text('"Año de la recuperación y consolidación de la economía peruana"', 50, 8);

    // Título del PDF
    doc.setFontSize(18);
    doc.setTextColor(0,0,0);
    doc.text("Vale de Combustible", 80, 20);

    

    // Información del formulario
    doc.setFontSize(12);
    doc.setFont("times");
    doc.text(`Orden Consumo: ${formData.ordenConsumo}`, 15, 35)
    doc.text(`N°: ${formNumber || "No Disponible"}`, 140, 35);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 35);

    doc.autoTable({
      startY: 45,
      head: [[{ content: 'Descripcion del Consumo', colSpan: 2, styles: { halign: 'center' } }],],
      body: [
      
        ['Solicito Entregar A:', ` ${selectedSolicitante.nombres} ${selectedSolicitante.apellidos}`],
        ['Autorizado Por:', ` ${selectedAutorizado.nombres} ${selectedAutorizado.apellidos}`],
        ['Vehiculo:', formData.maquina],
        ['Tipo:', formData.tipo],
        ['Placa:', formData.placa],
        ['Conductor:', `${formData.conductorNombre} ${formData.conductorApellido}`],

      ],
      headStyles: {
        fillColor: [9, 115, 0], // Color de fondo del encabezado (RGB)
      },
      styles: {
        lineWidth: 0, // Eliminar líneas
      },
      columnStyles: {
        0: { cellWidth: 90 }, // Ancho de la primera columna
        1: { cellWidth:90 }, // Ancho de la segunda columna
      },
    });
    doc.autoTable({
      startY: 100,
      head: [[{ content: 'Descripcion del Combustible / Lubricante', colSpan: 2, styles: { halign: 'center' } }],],
      body: [
        ['Clasificador:', formData.clasificador],
        ['Combustible:', formData.combustible],
        ['Cantidad:', formData.cantidad],
        ['Unidad:', formData.unidad],
      ],
      columnStyles: {
        0: { cellWidth: 90 }, // Ancho de la primera columna
        1: { cellWidth: 90 }, // Ancho de la segunda columna
      },
      headStyles: {
        fillColor: [76, 213, 65], // Color de fondo del encabezado (RGB)
      },
    });
    
    doc.autoTable({
      startY: 150,
      head: [[{ content: 'AFECTACION PRESUPUESTAL', colSpan: 2, styles: { halign: 'center' } }],],
      body: [
        ['Meta:', formData.meta],
        ['Unidad Operativa:', ` ${selectedUnit.name}`],
      ],
      columnStyles: {
        0: { cellWidth: 90 }, // Ancho de la primera columna
        1: { cellWidth: 90 }, // Ancho de la segunda columna
      },
      headStyles: {
        fillColor: [76, 213, 65], // Color de fondo del encabezado (RGB)
      },
    });

    doc.autoTable({
      startY: 180,
      head: [[{ content: 'OBSERVACIONES', colSpan: 2, styles: { halign: 'center' } }],],
      body: [
    
        [formData.observacion],
        
      ],
      columnStyles: {
        0: { cellWidth: 90 }, // Ancho de la primera columna
        1: { cellWidth: 90 }, // Ancho de la segunda columna
      },
      headStyles: {
        fillColor: [76, 213, 65], // Color de fondo del encabezado (RGB)
      },
    });

    // Información de la unidad operativa
    /*doc.text(`Unidad Operativa: ${selectedUnit ? selectedUnit.name : "No seleccionado"}`, 20, 60);
    doc.text(`Stock disponible: ${selectedUnit ? selectedUnit.stock : "No disponible"}`, 20, 70);

     // Información del solicitante
     doc.text(`Solicitante: ${selectedSolicitante ? `${selectedSolicitante.nombres} ${selectedSolicitante.apellidos}` : "No seleccionado"}`, 20, 80);
     //Informacion del Autorizado
     doc.text(`Autorizado: ${selectedAutorizado ? `${selectedAutorizado.nombres} ${selectedAutorizado.apellidos}` : "No seleccionado"}`, 20, 90);
    */
    // Tabla con los datos de consumo
    doc.line(20,240,75,240);
    doc.setFontSize(12);
    doc.text('JEFE INMEDIATO', 30,245 );
    
    doc.line(80,240,135,240);
    doc.setFontSize(12);
    doc.text('SOLICITANTE', 95,245,);
    
    doc.line(140,240,195,240);
    doc.setFontSize(12);
    doc.text('ALMACEN', 155,245,);

    // Guardar el PDF
    doc.save(`Vale_${formData.ordenConsumo}.pdf`);
  };

  return (
    <div className="mt-4">
      <button
        onClick={generatePDF}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
      >
        Generar PDF
      </button>
    </div>
  );
}

export default ValePdfGenerator;
