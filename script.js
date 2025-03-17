const rowsPerPage = 200;
const table = document.getElementById('data-table');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('search');
let currentPage = 1;
let filteredRows = [];

// Функция для отображения страницы
function displayPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Скрываем все строки
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let row of rows) {
        row.style.display = 'none';
    }

    // Отображаем только строки для текущей страницы
    for (let i = start; i < end && i < filteredRows.length; i++) {
        filteredRows[i].style.display = '';
    }

    // Обновляем кнопки пагинации
    updatePagination(page);
}

// Функция для обновления пагинации
function updatePagination(page) {
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.disabled = (i === page); // Делаем кнопку текущей страницы неактивной
        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
        });
        paginationContainer.appendChild(button);
    }
}

// Функция для обработки поиска
searchInput.addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const rows = table.querySelectorAll('tbody tr');

    // Очищаем массив отфильтрованных строк
    filteredRows = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;

        // Сначала убираем выделение у всех ячеек
        cells.forEach(cell => {
            cell.classList.remove('highlight');
        });

        // Проверяем каждую ячейку
        for (let cell of cells) {
            if (cell.textContent.toLowerCase().includes(searchValue)) {
                found = true;
                cell.classList.add('highlight'); // Выделяем совпадение
                break; // Выходим из цикла, если нашли совпадение
            }
        }

        // Если строка найдена, добавляем её в отфильтрованные строки
        if (found) {
            filteredRows.push(row);
            row.style.display = ''; // Показываем строку
        } else {
            row.style.display = 'none'; // Скрываем строку
        }
    });

    // Если строка поиска пуста, показываем все строки и убираем выделение
    if (searchValue == '') {
        filteredRows = Array.from(rows); // Сбрасываем отфильтрованные строки
        currentPage = 1; // Сбрасываем на первую страницу
        displayPage(currentPage); // Отображаем первую страницу
    } else {
        // Отображаем первую страницу отфильтрованных результатов
        currentPage = 1;
        displayPage(currentPage);
    }
});

// Инициализация отображения
filteredRows = Array.from(table.querySelectorAll('tbody tr'));
displayPage(currentPage);
