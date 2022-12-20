import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDFBCMagee = (BC, labels, mean, std) => {

  const doc = new jsPDF();
  const tableColumn = ["Fecha", "Valor BC"];
  const tableRows = [];

  labels.forEach(label => {
    const recordData = [
      label,
      BC[labels.indexOf(label)],
    ];
    tableRows.push(recordData);
  });

  tableRows.push(["Promedio", mean])
  tableRows.push(["Desviación estándar", std])

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
  doc.text(" ", 14, 15);
  doc.save(`report_bcmaap_${dateStr}.pdf`);

};

export default generatePDFBCMagee;