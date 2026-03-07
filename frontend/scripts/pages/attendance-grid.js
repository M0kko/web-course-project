import { getLessons, getLessonById } from '../lib/data.js';
import { getAllItems } from '../lib/data.js';
import { getGroups } from '../lib/data.js';

// Получение параметра из URL
function getLessonIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('lesson');
    return id ? Number(id) : null;
}

function renderAttendanceGrid(lesson, students) {
    const tbody = document.getElementById('attendance-tbody');
    if (!tbody) return;

    tbody.innerHTML = students.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${student.fullName}</td>
            <td>
                <select name="status[${student.id}]">
                    <option value="present">Присутствовал</option>
                    <option value="absent">Отсутствовал</option>
                    <option value="excused">Уваж. причина</option>
                </select>
            </td>
            <td>
                <input type="number" name="grade[${student.id}]" min="0" max="5" step="1" value="0" />
            </td>
            <td>
                <input type="text" name="comment[${student.id}]" placeholder="..." maxlength="100" />
            </td>
        </tr>
    `).join('');

    // Обновить заголовок с информацией о занятии
    const header = document.querySelector('#grid-title');
    if (header) {
        header.textContent = `Отметки посещаемости — ${lesson.date} ${lesson.topic}`;
    }
}

function renderContextForm(lessons, groups) {
    const form = document.getElementById('attendance-context-form');
    if (!form) return;

    const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));
    const select = form.querySelector('#lesson-select');
    if (select) {
        select.innerHTML = `
            <option value="">-- Выберите занятие --</option>
            ${lessons.map(l => `<option value="${l.id}">${l.date} - ${l.topic} (${groupMap[l.groupId] || '?'})</option>`).join('')}
        `;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const lessonId = select.value;
        if (lessonId) {
            window.location.href = `/pages/attendance-grid.html?lesson=${lessonId}`;
        }
    });
}

function init() {
    const lessonId = getLessonIdFromUrl();
    const lessons = getLessons();
    const groups = getGroups();
    const students = getAllItems();

    if (lessonId) {
        const lesson = getLessonById(lessonId);
        if (!lesson) {
            document.querySelector('#main').innerHTML = '<p>Занятие не найдено. <a href="/pages/attendance-grid.html">Вернуться к выбору</a></p>';
            return;
        }
        // Определяем группу и фильтруем студентов
        const group = groups.find(g => g.id === lesson.groupId);
        const groupStudents = students.filter(s => s.groupName === group?.name);
        renderAttendanceGrid(lesson, groupStudents);
        // Скрываем форму выбора (можно оставить)
        const contextForm = document.getElementById('attendance-context-form');
        if (contextForm) contextForm.style.display = 'none';
    } else {
        renderContextForm(lessons, groups);
        // Если таблица не нужна, скрываем её или очищаем
        const tableSection = document.querySelector('#grid-title').parentElement;
        if (tableSection) tableSection.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', init);