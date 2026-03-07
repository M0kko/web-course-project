import { ensureLessons, getLessons } from '../lib/data.js';
import { ensureGroups, getGroups } from '../lib/data.js';

function renderLessonsTable(lessons, groups) {
    const tbody = document.getElementById('lessons-tbody');
    if (!tbody) return;

    const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));

    tbody.innerHTML = lessons.map(lesson => `
        <tr>
            <td>${lesson.id}</td>
            <td>${lesson.date}</td>
            <td>${lesson.topic}</td>
            <td>${groupMap[lesson.groupId] || 'Неизвестно'}</td>
            <td>${lesson.type === 'lecture' ? 'Лекция' : lesson.type === 'practice' ? 'Практика' : 'Лабораторная'}</td>
            <td><a href="/pages/attendance-grid.html?lesson=${lesson.id}">Проставить посещаемость</a></td>
        </tr>
    `).join('');
}

function init() {
    const lessons = ensureLessons();
    const groups = ensureGroups();
    renderLessonsTable(lessons, groups);
}

document.addEventListener('DOMContentLoaded', init);