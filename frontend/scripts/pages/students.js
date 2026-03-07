import { ensureData, getAllItems } from '../lib/data.js';
import { renderStudentsTable } from '../lib/render.js';

function init() {
    ensureData();
    const tbody = document.getElementById('items-tbody');
    if (!tbody) {
        console.error('Не найден элемент #items-tbody в students.html');
        return;
    }

    const students = getAllItems();
    renderStudentsTable(tbody, students);

    // Делегирование событий (для будущих интерактивных действий)
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.dataset.action === 'open') {
            // Ссылка уже ведёт на student-report.html, браузер сам обработает переход
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
