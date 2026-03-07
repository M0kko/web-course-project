import { ensureData, getItemById } from '../lib/data.js';
import { renderStudentDetails } from '../lib/render.js';

function getIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('id');
    const id = raw ? Number(raw) : NaN;
    return Number.isFinite(id) ? id : null;
}

function init() {
    ensureData();
    const dl = document.getElementById('item-details');
    if (!dl) {
        console.error('Не найден элемент #item-details в student-report.html');
        return;
    }

    const id = getIdFromQuery();
    if (id == null) {
        dl.textContent = 'Ошибка: не указан идентификатор студента (параметр id).';
        return;
    }

    const student = getItemById(id);
    if (!student) {
        dl.textContent = `Студент с id=${id} не найден.`;
        return;
    }

    renderStudentDetails(dl, student);
}

document.addEventListener('DOMContentLoaded', init);
