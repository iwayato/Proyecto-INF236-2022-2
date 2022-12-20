import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDFRadon = (data, labels, mean, std) => {

  const doc = new jsPDF();
  const tableColumn = ["Fecha", "Valor Radón"];
  const tableRows = [];

  labels.forEach(label => {
    const recordData = [
      label,
      data[labels.indexOf(label)],
    ];
    tableRows.push(recordData);
  });

  tableRows.push(["Promedio", mean])
  tableRows.push(["Desviación estándar", std])

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
  doc.text(" ", 14, 15);
  doc.save(`report_radon_${dateStr}.pdf`);

};

export default generatePDFRadon;