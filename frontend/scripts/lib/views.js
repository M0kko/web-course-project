import { renderStudentsTable, renderStudentDetails } from './render.js';

export function setAppMessage(message = '') {
    const messageEl = document.querySelector('#app-message');
    if (messageEl) messageEl.textContent = message;
}

export function highlightActiveRoute(routeName) {
    document.querySelectorAll('[data-route-link]').forEach(link => {
        link.removeAttribute('aria-current');
    });
    const map = {
        dashboard: '#/dashboard',
        students: '#/students',
        'student-form': '#/student-form',
        groups: '#/groups',          
        lessons: '#/lessons',        
        'lesson-form': '#/lesson-form',
        attendance: '#/attendance',  
        login: '#/login'
    };
    const href = map[routeName];
    if (!href) return;
    const activeLink = document.querySelector(`[data-route-link][href="${href}"]`);
    if (activeLink) activeLink.setAttribute('aria-current', 'page');
}

export function renderDashboardView(container, items) {
    container.innerHTML = `
        <section aria-labelledby="summary-title">
            <h2 id="summary-title">Ключевые показатели</h2>
            <div class="summary-cards">
                <article><h3>Всего студентов</h3><p><strong id="metric-total"></strong></p></article>
                <article><h3>Активные студенты</h3><p><strong id="metric-active"></strong></p></article>
                <article><h3>Новых за год</h3><p><strong id="metric-period"></strong></p></article>
            </div>
        </section>
    `;
    const total = items.length;
    const active = items.filter(s => s.status === 'active').length;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const newLastYear = items.filter(s => new Date(s.enrolledAt) >= oneYearAgo).length;
    container.querySelector('#metric-total').textContent = total;
    container.querySelector('#metric-active').textContent = active;
    container.querySelector('#metric-period').textContent = newLastYear;
}

export function renderStudentsView(container, items) {
    container.innerHTML = `
        <section aria-labelledby="list-title">
            <h2 id="list-title">Список студентов</h2>
            <p><a href="#/student-form">+ Добавить студента</a></p>
            <table>
                <caption>Текущий список студентов</caption>
                <thead>
                    <tr><th>ID</th><th>ФИО</th><th>Группа</th><th>Курс</th><th>Дата зачисления</th><th>Действия</th></tr>
                </thead>
                <tbody id="items-tbody"></tbody>
            </table>
        </section>
    `;
    const tbody = container.querySelector('#items-tbody');
    renderStudentsTable(tbody, items);
}

export function renderStudentView(container, student) {
    if (!student) {
        container.innerHTML = `
            <section><h2>Студент не найден</h2><p>Запись с указанным идентификатором отсутствует.</p>
            <p><a href="#/students">Вернуться к списку</a></p></section>
        `;
        return;
    }
    container.innerHTML = `
        <section aria-labelledby="student-title">
            <h2 id="student-title">Карточка студента</h2>
            <dl id="item-details"></dl>
            <p><a href="#/students">К списку студентов</a></p>
        </section>
    `;
    const dl = container.querySelector('#item-details');
    renderStudentDetails(dl, student);
}

export function renderStudentFormView(container) {
    container.innerHTML = `
        <section aria-labelledby="form-title">
            <h2 id="form-title">Добавление нового студента</h2>
            <form id="student-form" action="#" method="post" novalidate>
                <fieldset><legend>Основная информация</legend>
                    <div><label for="fullName">ФИО *</label><input id="fullName" name="fullName" type="text" maxlength="150" required />
                        <small class="field-error" id="fullName-error"></small></div>
                    <div><label for="groupName">Группа *</label><input id="groupName" name="groupName" type="text" maxlength="20" required />
                        <small class="field-error" id="groupName-error"></small></div>
                    <div><label for="course">Курс *</label><input id="course" name="course" type="number" min="1" max="6" required />
                        <small class="field-error" id="course-error"></small></div>
                    <div><label for="recordBook">Номер зачётки</label><input id="recordBook" name="recordBook" type="text" maxlength="20" />
                        <small class="field-error" id="recordBook-error"></small></div>
                    <div><label for="enrolledAt">Дата зачисления *</label><input id="enrolledAt" name="enrolledAt" type="date" required />
                        <small class="field-error" id="enrolledAt-error"></small></div>
                    <div><label for="status">Статус *</label>
                        <select id="status" name="status" required>
                            <option value="">Выберите статус</option>
                            <option value="active">Обучается</option>
                            <option value="inactive">Выпускник/Отчислен</option>
                        </select>
                        <small class="field-error" id="status-error"></small>
                    </div>
                </fieldset>
                <fieldset><legend>Действия</legend>
                    <button type="submit">Сохранить студента</button>
                    <button type="reset">Очистить форму</button>
                </fieldset>
            </form>
        </section>
    `;
}

export function renderLoginView(container) {
    container.innerHTML = `
        <section aria-labelledby="login-title">
            <h2 id="login-title">Вход в систему</h2>
            <form>
                <div><label for="email">E-mail</label><input id="email" name="email" type="email" /></div>
                <div><label for="password">Пароль</label><input id="password" name="password" type="password" /></div>
                <button type="submit">Войти</button>
            </form>
        </section>
    `;
}

export function renderNotFoundView(container) {
    container.innerHTML = `
        <section><h2>Маршрут не найден</h2><p>Запрошенный раздел отсутствует.</p>
        <p><a href="#/dashboard">Перейти на главную</a></p></section>
    `;
}

export function renderGroupsView(container, groups, students) {
    const groupsWithCount = groups.map(group => ({
        ...group,
        studentCount: students.filter(s => s.groupName === group.name).length
    }));

    container.innerHTML = `
        <section aria-labelledby="groups-title">
            <h2 id="groups-title">Учебные группы</h2>
            <table>
                <caption>Перечень учебных групп и основная информация</caption>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название группы</th>
                        <th scope="col">Курс</th>
                        <th scope="col">Кол-во студентов</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody id="groups-tbody"></tbody>
            </table>
        </section>
    `;

    const tbody = container.querySelector('#groups-tbody');
    tbody.innerHTML = groupsWithCount.map(group => `
        <tr>
            <td>${group.id}</td>
            <td>${group.name}</td>
            <td>${group.course}</td>
            <td>${group.studentCount}</td>
            <td><a href="#/students?group=${group.id}" data-route-link>Список студентов</a></td>
        </tr>
    `).join('');
}

export function renderLessonsView(container, lessons, groups) {
    container.innerHTML = `
        <section aria-labelledby="lessons-title">
            <h2 id="lessons-title">Расписание и темы занятий</h2>
            <p><a href="#/lesson-form">+ Создать новое занятие</a></p>
            <table>
                <caption>Список проведенных и запланированных занятий</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Тема занятия</th>
                        <th>Группа</th>
                        <th>Тип</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody id="lessons-tbody"></tbody>
            </table>
        </section>
    `;

    const groupMap = Object.fromEntries(groups.map(g => [g.id, g.name]));
    const tbody = container.querySelector('#lessons-tbody');
    tbody.innerHTML = lessons.map(lesson => `
        <tr>
            <td>${lesson.id}</td>
            <td>${lesson.date}</td>
            <td>${lesson.topic}</td>
            <td>${groupMap[lesson.groupId] || 'Неизвестно'}</td>
            <td>${lesson.type === 'lecture' ? 'Лекция' : lesson.type === 'practice' ? 'Практика' : 'Лабораторная'}</td>
            <td><a href="#/attendance/${lesson.id}" data-route-link>Проставить посещаемость</a></td>
        </tr>
    `).join('');
}

export function renderLessonFormView(container, groups) {
    container.innerHTML = `
        <section aria-labelledby="form-title">
            <h2 id="form-title">Создание занятия</h2>
            <form id="lesson-form" action="#" method="post" novalidate>
                <fieldset>
                    <legend>Основные поля</legend>
                    <div>
                        <label for="date">Дата проведения</label>
                        <input id="date" name="date" type="date" required />
                        <small class="field-error" id="date-error"></small>
                    </div>
                    <div>
                        <label for="topic">Тема занятия</label>
                        <input id="topic" name="topic" type="text" maxlength="200" required />
                        <small class="field-error" id="topic-error"></small>
                    </div>
                    <div>
                        <label for="groupId">Группа</label>
                        <select id="groupId" name="groupId" required>
                            <option value="">Выберите группу</option>
                            ${groups.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
                        </select>
                        <small class="field-error" id="groupId-error"></small>
                    </div>
                    <div>
                        <label for="type">Тип занятия</label>
                        <select id="type" name="type">
                            <option value="lecture">Лекция</option>
                            <option value="practice">Практика</option>
                            <option value="lab">Лабораторная</option>
                        </select>
                        <small class="field-error" id="type-error"></small>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Действия</legend>
                    <button type="submit">Сохранить занятие</button>
                    <button type="reset">Очистить</button>
                </fieldset>
            </form>
        </section>
    `;
}

export function renderAttendanceView(container, lessonId, lessons, groups, students) {
    if (lessonId) {
        const lesson = lessons.find(l => l.id === lessonId);
        if (!lesson) {
            container.innerHTML = `<section><h2>Занятие не найдено</h2><p><a href="#/attendance">Выбрать другое занятие</a></p></section>`;
            return;
        }
        const group = groups.find(g => g.id === lesson.groupId);
        const groupStudents = students.filter(s => s.groupName === group?.name);
        renderAttendanceGrid(container, lesson, groupStudents);
    } else {
        container.innerHTML = `
            <section aria-labelledby="attendance-title">
                <h2 id="attendance-title">Журнал посещаемости</h2>
                <form id="attendance-select-form">
                    <div>
                        <label for="lesson-select">Выберите занятие:</label>
                        <select id="lesson-select" name="lessonId">
                            <option value="">-- Выберите занятие --</option>
                            ${lessons.map(l => {
                                const groupName = groups.find(g => g.id === l.groupId)?.name || '';
                                return `<option value="${l.id}">${l.date} - ${l.topic} (${groupName})</option>`;
                            }).join('')}
                        </select>
                        <button type="submit">Загрузить</button>
                    </div>
                </form>
            </section>
        `;
    }
}

function renderAttendanceGrid(container, lesson, students) {
    container.innerHTML = `
        <section aria-labelledby="grid-title">
            <h2 id="grid-title">Отметки посещаемости и активности</h2>
            <p><strong>Занятие:</strong> ${lesson.date} - ${lesson.topic}</p>
            <form id="attendance-form" method="post">
                <table>
                    <caption>Проставьте статус и оценку для каждого студента</caption>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Студент</th>
                            <th>Статус посещения</th>
                            <th>Оценка активности (0-5)</th>
                            <th>Комментарий</th>
                        </tr>
                    </thead>
                    <tbody id="attendance-tbody"></tbody>
                </table>
                <div>
                    <button type="submit">Сохранить отметки</button>
                </div>
            </form>
            <p><a href="#/attendance">Выбрать другое занятие</a></p>
        </section>
    `;
    const tbody = container.querySelector('#attendance-tbody');
    tbody.innerHTML = students.map((student, idx) => `
        <tr>
            <td>${idx + 1}</td>
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
}
