import { ensureGroups, getGroups } from '../lib/data.js';
import { getAllItems } from '../lib/data.js';

function renderGroupsTable(groups, students) {
    const tbody = document.getElementById('groups-tbody');
    if (!tbody) return;

    const groupsWithCount = groups.map(group => ({
        ...group,
        studentCount: students.filter(s => s.groupName === group.name).length
    }));

    tbody.innerHTML = groupsWithCount.map(group => `
        <tr>
            <td>${group.id}</td>
            <td>${group.name}</td>
            <td>${group.course}</td>
            <td>${group.studentCount}</td>
            <td><a href="/pages/students.html?group=${group.id}">Список студентов</a></td>
        </tr>
    `).join('');
}

function init() {
    const groups = ensureGroups();
    const students = getAllItems();
    renderGroupsTable(groups, students);
}

document.addEventListener('DOMContentLoaded', init);