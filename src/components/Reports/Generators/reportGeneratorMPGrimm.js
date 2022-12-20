import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDFMPGrimm = (PM1, PM25, PM4, PM10, TSP, labels, means, stds) => {

  const doc = new jsPDF();
  const tableColumn = ["Fecha", "Valor PM1", "Valor PM25", "Valor PM4", "Valor PM10", "Valor TSP"];
  const tableRows = [];

  labels.forEach(label => {
    const recordData = [
      label,
      PM1[labels.indexOf(label)],
      PM25[labels.indexOf(label)],
      PM4[labels.indexOf(label)],
      PM10[labels.indexOf(label)],
      TSP[labels.indexOf(label)],
    ];
    tableRows.push(recordData);
  });

  tableRows.push(["Promedio", means[0], means[1], means[2], means[3], means[4]])
  tableRows.push(["Desviación estándar", stds[0], stds[1], stds[2], stds[3], stds[4]])

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
  doc.text(" ", 14, 15);
  doc.save(`report_mpgrimm_${dateStr}.pdf`);

};

export default generatePDFMPGrimm;