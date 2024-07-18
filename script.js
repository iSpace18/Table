document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("myTable");
  const cells = table.getElementsByTagName("td");

  // Обработка вычисления выражений
  Array.from(cells).forEach((cell) => {
    cell.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        try {
          cell.innerText = eval(cell.innerText);
        } catch {
          cell.innerText = "Error";
        }
      }
    });

    // Добавление возможности выделения ячеек
    cell.addEventListener("click", function () {
        // Снимаем выделение со всех ячеек
        Array.from(cells).forEach(c => c.classList.remove("selected"));
        // Выделяем текущую ячейку
        cell.classList.add("selected");
      });
    }); 

  document.getElementById("addRowBtn").addEventListener("click", () => {
    const rowCount = table.rows.length;
    const row = table.insertRow();
    const th = document.createElement("th");
    th.textContent = rowCount;
    row.appendChild(th);
    for (let i = 0; i < 10; i++) {
      const cell = row.insertCell();
      cell.setAttribute("contenteditable", "true");
    }
  });

  // Удаление строки
  document.getElementById("removeRowBtn").addEventListener("click", () => {
    if (table.rows.length > 2) {
      table.deleteRow(table.rows.length - 1);
    }
  });
  // Окрашивание ячеек
  document.getElementById("colorBtn").addEventListener("click", () => {
    const color = document.getElementById("colorPicker").value;
    const selectedCells = table.querySelectorAll(".selected");

    selectedCells.forEach((cell) => {
      cell.style.backgroundColor = color;
      cell.classList.remove("selected");

      // Изменение цвета текста в зависимости от фона
      const rgb = hexToRgb(color);
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      cell.style.color = brightness > 125 ? "black" : "white";
    });
  });

  // Функция для преобразования HEX в RGB
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Сохранение таблицы в PDF
  document.getElementById("saveBtn").addEventListener("click", () => {
    html2canvas(document.getElementById("myTable"), {
      onrendered: function (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF("p", "pt", [1920, 1320]);
        doc.addImage(imgData, "PNG", 10, 10);
        doc.save("table.pdf");
      },
    });
  });
});
