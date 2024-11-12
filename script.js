document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#data-table tbody tr');


    if (searchValue === '') {
        rows.forEach(row => {
            row.style.display = ''; 
            cell.classList.add('white');
            // Показываем все строки
        });
        return; // Выходим из функции, так как ничего больше не нужно делать
    }

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;

        cells.forEach(cell => {
            // Удаляем выделение
            cell.classList.remove('highlight');

            // Проверяем, содержит ли ячейка искомый текст
            if (cell.textContent.toLowerCase().includes(searchValue) && searchValue) {
                found = true;
                cell.classList.add('highlight'); 
                // Выделяем совпадение
            }
        });

        // Показываем или скрываем строку в зависимости от наличия совпадений
        row.style.display = found ? '' : 'none';
    });
});