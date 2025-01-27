import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

  
export const generatePDF = ( formData, stock, stockInicial, formNumber, selectedUnit, selectedSolicitante, selectedAutorizado ) => {
    const imgData = '/Escudo_de_Macusani.png';    
    const doc = new jsPDF();

    // Primera página
    doc.addImage(imgData, 'PNG', 10, 3, 25, 25);
    doc.setFontSize(10);
    doc.setFont("times");
    doc.text("RUC: 20206921898", 10, 32);

    const imgQR = '/qr.png';    
    doc.addImage(imgQR, 'PNG', 88, 250, 40, 40);

    // Título del PDF
    doc.setFont("times-roman", "italic");
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125);
    doc.text('"Año de la recuperación y consolidación de la economía peruana"', 50, 8);

    // Título del PDF
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Vale de Combustible", 80, 20);

    // Información del formulario
    doc.setFontSize(12);
    doc.setFont("times");
    doc.text(`Orden Consumo: ${formData.ordenConsumo}`, 15, 40);
    doc.text(`N°: ${formNumber || "No Disponible"}`, 140, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 40);

    doc.autoTable({
      startY: 45,
      head: [[{ content: 'Descripcion del Consumo', colSpan: 2, styles: { halign: 'center' } }]],
      body: [
        ['Señores:', formData.proveedorRuc, ` ${formData.proveedorNombres} ${formData.proveedorApellidos}`],
        ['Solicito Entregar A:', ` ${selectedSolicitante.nombres} ${selectedSolicitante.apellidos}`],
        ['Autorizado Por:', ` ${selectedAutorizado.nombres} ${selectedAutorizado.apellidos}`],
        ['Vehiculo:', formData.maquina],
        ['Tipo:', formData.tipo],
        ['Placa:', formData.placa],
        ['Conductor:', `${formData.conductorNombre} ${formData.conductorApellido}`],
      ],
      headStyles: {
        fillColor: [9, 115, 0],
      },
      styles: {
        lineWidth: 0,
      },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
    });

    doc.autoTable({
      startY: 110,
      head: [[{ content: 'Descripcion del Combustible / Lubricante', colSpan: 2, styles: { halign: 'center' } }]],
      body: [
        ['Clasificador:', formData.clasificador],
        ['Combustible:', formData.combustible],
        ['Cantidad:', formData.cantidad],
        ['Unidad:', formData.unidad],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
      headStyles: {
        fillColor: [9, 115, 0],
      },
    });

    doc.autoTable({
      startY: 150,
      head: [[{ content: 'AFECTACION PRESUPUESTAL', colSpan: 2, styles: { halign: 'center' } }]],
      body: [
        ['Meta:', formData.meta],
        ['Unidad Operativa:', ` ${selectedUnit.name}`],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
      headStyles: {
        fillColor: [9, 115, 0],
      },
    });

    doc.autoTable({
      startY: 180,
      head: [["OBSERVACIONES", "STOCK ACTUAL"]],
      body: [
        [formData.observacion, `Cantidad Total: ${stockInicial}\nSaldo Anterior: ${stock}\nAtendido: ${formData.cantidad}\nSaldo Actual: ${stock - formData.cantidad}`],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90,halign: 'center' },
      },
      headStyles: {
        fillColor: [9, 115, 0],
        halign: 'center',
      },
      styles: {
        valign: 'top',
      },
    });

    // Información de la unidad operativa
    doc.line(20, 240, 75, 240);
    doc.setFontSize(12);
    doc.text('JEFE INMEDIATO', 30, 245);

    doc.line(80, 240, 135, 240);
    doc.setFontSize(12);
    doc.text('SOLICITANTE', 95, 245);

    doc.line(140, 240, 195, 240);
    doc.setFontSize(12);
    doc.text('ALMACEN', 155, 245);

    // Duplicar la página

    // Agregar nueva página
    doc.addPage();

    // Repetir todo el contenido de la primera página en la segunda
    doc.addImage(imgData, 'PNG', 10, 3, 25, 25);
    doc.setFontSize(10);
    doc.setFont("times");
    doc.text("RUC: 20206921898", 10, 32);

    doc.addImage(imgQR, 'PNG', 88, 250, 40, 40);

    doc.setFont("times-roman", "italic");
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125);
    doc.text('"Año de la recuperación y consolidación de la economía peruana"', 50, 8);

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Vale de Combustible", 80, 20);

    doc.setFontSize(12);
    doc.setFont("times");
    doc.text(`Orden Consumo: ${formData.ordenConsumo}`, 15, 40);
    doc.text(`N°: ${formNumber || "No Disponible"}`, 140, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 40);

    // Duplicar tablas
    doc.autoTable({
      startY: 45,
      head: [[{ content: 'Descripcion del Consumo', colSpan: 2, styles: { halign: 'center' } }]],
      body: [
        ['Señores:', ` ${formData.proveedorNombres} ${formData.proveedorApellidos}`],
        ['Solicito Entregar A:', ` ${selectedSolicitante.nombres} ${selectedSolicitante.apellidos}`],
        ['Autorizado Por:', ` ${selectedAutorizado.nombres} ${selectedAutorizado.apellidos}`],
        ['Vehiculo:', formData.maquina],
        ['Tipo:', formData.tipo],
        ['Placa:', formData.placa],
        ['Conductor:', `${formData.conductorNombre} ${formData.conductorApellido}`],
      ],
      headStyles: {
        fillColor: [9, 115, 0],
      },
      styles: {
        lineWidth: 0,
      },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
    });

    doc.autoTable({
      startY: 110,
      head: [[{ content: 'Descripcion del Combustible / Lubricante', colSpan: 2, styles: { halign: 'center' } }]],
      body: [
        ['Clasificador:', formData.clasificador],
        ['Combustible:', formData.combustible],
        ['Cantidad:', formData.cantidad],
        ['Unidad:', formData.unidad],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
      headStyles: {
        fillColor: [9, 115, 0],
      },
    });

    doc.autoTable({
      startY: 150,
      head: [[{ content: 'AFECTACION PRESUPUESTAL', colSpan: 2, styles: { halign: 'center' } }]],
      body: [
        ['Meta:', formData.meta],
        ['Unidad Operativa:', ` ${selectedUnit.name}`],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
      headStyles: {
        fillColor: [9, 115, 0],
      },
    });

    doc.autoTable({
      startY: 180,
      head: [["OBSERVACIONES", "STOCK ACTUAL"]],
      body: [
        [formData.observacion, `Cantidad Total: ${stockInicial}\nSaldo Anterior: ${stock}\nAtendido: ${formData.cantidad}\nSaldo Actual: ${stock - formData.cantidad}`],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90, halign: 'center'  },
      },
      headStyles: {
        fillColor: [9, 115, 0],
        halign: 'center', // Centrado del encabezado de la columna

      },
      styles: {
        valign: 'top',

      },
    });

    // Información de la unidad operativa
    doc.line(20, 240, 75, 240);
    doc.setFontSize(12);
    doc.text('JEFE INMEDIATO', 30, 245);

    doc.line(80, 240, 135, 240);
    doc.setFontSize(12);
    doc.text('SOLICITANTE', 95, 245);

    doc.line(140, 240, 195, 240);
    doc.setFontSize(12);
    doc.text('ALMACEN', 155, 245);

    // Guardar el PDF
    doc.save(`Vale_${formData.ordenConsumo}.pdf`);
};