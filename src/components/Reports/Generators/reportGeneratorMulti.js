import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDFRadon = (BP, RH, Temperatura, WD, WS, labels, means, stds) => {

  const doc = new jsPDF();
  const tableColumn = ["Fecha", "Valor BP", "Valor RH", "Valor Temperatura", "Valor WD", "Valor WS"];
  const tableRows = [];

  labels.forEach(label => {
    const recordData = [
      label,
      BP[labels.indexOf(label)],
      RH[labels.indexOf(label)],
      Temperatura[labels.indexOf(label)],
      WD[labels.indexOf(label)],
      WS[labels.indexOf(label)],
    ];
    tableRows.push(recordData);
  });

  tableRows.push(["Promedio", means[0], means[1], means[2], means[3], means[4]])
  tableRows.push(["Desviación estándar", stds[0], stds[1], stds[2], stds[3], stds[4]])

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
  doc.text(" ", 14, 15);
  doc.save(`report_multiparametro_${dateStr}.pdf`);

};

export default generatePDFRadon;