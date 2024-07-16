document.addEventListener('DOMContentLoaded', function () {
  const table = document.getElementById('myTable');
  const cells = table.getElementsByTagName('td');

  Array.from(cells).forEach(cell => {
      cell.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
              e.preventDefault();
              try {
                  cell.innerText = eval(cell.innerText);
              } catch {
                  cell.innerText = 'Error';
              }
          }
      });
  });



  // Сохранение таблицы в PDF
  document.getElementById('saveBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.autoTable({
        html: '#myTable',
        headStyles: { fillColor: [98, 135, 255] },columnStyles: { 0: { cellWidth: 'auto' } },
        theme: 'grid'
    });
    doc.save('table.pdf');
});
});