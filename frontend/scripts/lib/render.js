function statusLabel(status) {
    return status === 'active' ? 'Обучается' : 'Выпускник';
}

/**
 * Создаёт строку таблицы для студента.
 * Ожидается, что у объекта есть: id, fullName, groupName, course, enrolledAt, status.
 */
export function createStudentRow(student) {
    const tr = document.createElement('tr');
    tr.dataset.id = String(student.id);

    const tdId = document.createElement('td');
    tdId.textContent = String(student.id);

    const tdName = document.createElement('td');
    tdName.textContent = student.fullName ?? '--';

    const tdGroup = document.createElement('td');
    tdGroup.textContent = student.groupName ?? '--';

    const tdCourse = document.createElement('td');
    tdCourse.textContent = student.course ?? '--';

    const tdDate = document.createElement('td');
    tdDate.textContent = student.enrolledAt ?? '--';

    const tdActions = document.createElement('td');
    const link = document.createElement('a');
    link.href = `/pages/student-report.html?id=${encodeURIComponent(student.id)}`;
    link.textContent = 'Отчёт';
    link.dataset.action = 'open';
    tdActions.appendChild(link);

    tr.append(tdId, tdName, tdGroup, tdCourse, tdDate, tdActions);
    return tr;
}

/**
 * Перерисовывает таблицу студентов.
 * @param {HTMLElement} tbodyEl - элемент tbody
 * @param {Array} students - массив студентов
 */
export function renderStudentsTable(tbodyEl, students) {
    const rows = students.map(createStudentRow);
    tbodyEl.replaceChildren(...rows);
}

/**
 * Рендерит детальную информацию о студенте в виде dl.
 */
export function renderStudentDetails(dlEl, student) {
    const pairs = [
        ['ID', student.id],
        ['ФИО', student.fullName],
        ['Группа', student.groupName],
        ['Курс', student.course],
        ['Номер зачётки', student.recordBook],
        ['Дата зачисления', student.enrolledAt],
        ['Статус', statusLabel(student.status)]
    ];

    const nodes = [];
    for (const [key, value] of pairs) {
        const dt = document.createElement('dt');
        dt.textContent = key;
        const dd = document.createElement('dd');
        dd.textContent = (value !== undefined && value !== null && String(value).trim() !== '') ? String(value) : '--';
        nodes.push(dt, dd);
    }
    dlEl.replaceChildren(...nodes);
}
