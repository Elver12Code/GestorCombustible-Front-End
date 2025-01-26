import * as XLSX from "xlsx";

const generarExcel = (datos) => {
  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Reporte");
  XLSX.writeFile(libro, "reporte_consumos.xlsx");
};
export default generarExcel