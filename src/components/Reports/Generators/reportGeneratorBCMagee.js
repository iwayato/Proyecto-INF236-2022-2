import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDFBCMagee = (BC1, BC2, BC3, BC4, BC5, BC6, BC7, labels, means, stds) => {

  const doc = new jsPDF();
  const tableColumn = ["Fecha", "Valor BC1", "Valor BC2", "Valor BC3", "Valor BC4", "Valor BC5", "Valor BC6", "Valor BC7"];
  const tableRows = [];

  labels.forEach(label => {
    const recordData = [
      label,
      BC1[labels.indexOf(label)],
      BC2[labels.indexOf(label)],
      BC3[labels.indexOf(label)],
      BC4[labels.indexOf(label)],
      BC5[labels.indexOf(label)],
      BC6[labels.indexOf(label)],
      BC7[labels.indexOf(label)],
    ];
    tableRows.push(recordData);
  });

  tableRows.push(["Promedio", means[0], means[1], means[2], means[3], means[4], means[5], means[6]])
  tableRows.push(["Desviación estándar", stds[0], stds[1], stds[2], stds[3], stds[4], stds[5], stds[6]])

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
  doc.text(" ", 14, 15);
  doc.save(`report_bcmagee_${dateStr}.pdf`);

};

export default generatePDFBCMagee;