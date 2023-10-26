function fetchData() {
    const urlInput = document.getElementById('url').value;
    const tableContainer = document.getElementById('table-container');
    const dataTable = document.getElementById('data-table');

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        
        dataTable.innerHTML = '';

        const headerRow = document.createElement('tr');
        for (const key in data[0]) {
          if (data[0].hasOwnProperty(key)) {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
          }
        }
        dataTable.appendChild(headerRow);

        data.forEach(function(item) {
          const dataRow = document.createElement('tr');
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              const dataCell = document.createElement('td');
              dataCell.textContent = item[key];
              dataRow.appendChild(dataCell);
            }
          }
          dataTable.appendChild(dataRow);
        });

        tableContainer.style.display = 'block';
      }
    };

    xhr.open('GET', urlInput, true);
    xhr.send();
  }

  function populateTable(data) {
    const tableBody = document.getElementById('programTableBody');

    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.Areacode}</td>
        <td>${item.programstudi}</td>
        <td>${item.jenjang}</td>
        <td>${item.akreditasi}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  
  function sortTable(columnIndex) {
    const table = document.getElementById('programTable');
    const rows = Array.from(table.rows).slice(1); 

    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent;
      const bValue = b.cells[columnIndex].textContent;
      return aValue.localeCompare(bValue);
    });

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    rows.forEach(row => {
      table.appendChild(row);
    });
  }

  
  function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('programTable');
    const rows = Array.from(table.rows).slice(1); 

    rows.forEach(row => {
      const shouldShow = Array.from(row.cells).some(cell => {
        const cellValue = cell.textContent.toUpperCase();
        return cellValue.includes(filter);
      });

      row.style.display = shouldShow ? '' : 'none';
    });
  }

  
  populateTable(jsonData);