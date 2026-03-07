import {
    ensureData, getAllItems, getItemById, createStudent,
    ensureGroups, getGroups,               
    ensureLessons, getLessons, createLesson, getLessonById      
} from './lib/data.js';
import { normalizeStudentFormData } from './lib/form-normalize.js';
import { validateStudentData } from './lib/form-validate.js';
import { clearFormErrors, showFormErrors, showFormSuccess } from './lib/form-errors.js';
import { state, setItems, setRoute, setGroups, setLessons } from './lib/state.js';
import { startRouter } from './lib/router.js';
import {
    highlightActiveRoute,
    renderDashboardView,
    renderStudentsView,
    renderStudentView,
    renderStudentFormView,
    renderLoginView,
    renderNotFoundView,
    setAppMessage,
    renderGroupsView,
    renderLessonsView,
    renderAttendanceView
} from './lib/views.js';

function getViewContainer() {
    return document.querySelector('#app-view');
}

function renderCurrentRoute() {
    const container = getViewContainer();
    if (!container) return;

    highlightActiveRoute(state.route.name);
    setAppMessage('');

    switch (state.route.name) {
        case 'dashboard':
            renderDashboardView(container, state.items);
            break;
        case 'students':
            renderStudentsView(container, state.items);
            break;
        case 'student': {
            const student = getItemById(state.route.params.id);
            renderStudentView(container, student);
            break;
        }
        case 'student-form':
            renderStudentFormView(container);
            break;
        case 'groups':
            renderGroupsView(container, state.groups, state.items);
            break;
        case 'lessons':
            renderLessonsView(container, state.lessons, state.groups);
            break;
        case 'lesson-form':
            renderLessonFormView(container, state.groups);
            break;
        case 'attendance':
            renderAttendanceView(container, state.route.params.lessonId, state.lessons, state.groups, state.items);
            break;
        case 'login':
            renderLoginView(container);
            break;
        default:
            renderNotFoundView(container);
    }
}

function handleRouteChange(route) {
    setItems(getAllItems());
    setGroups(ensureGroups());     
    setLessons(ensureLessons());   
    setRoute(route);
    renderCurrentRoute();
}

function handleAppSubmit(event) {
    const target = event.target;
    if (!(target instanceof HTMLFormElement)) return;

    if (target.id === 'student-form') {
        event.preventDefault();
        clearFormErrors(target);
        const normalizedData = normalizeStudentFormData(target);
        const validation = validateStudentData(normalizedData);
        if (!validation.valid) {
            showFormErrors(target, validation.errors);
            return;
        }
        const newStudent = createStudent(normalizedData);
        setItems(getAllItems());
        setAppMessage(`Студент «${newStudent.fullName}» успешно добавлен.`);
        setTimeout(() => {
            window.location.hash = '#/students';
        }, 1200);
    }

    if (target.id === 'lesson-form') {
        event.preventDefault();
        clearFormErrors(target);
        const formData = new FormData(target);
        const lessonData = {
            date: formData.get('date'),
            topic: formData.get('topic'),
            groupId: formData.get('groupId'),
            type: formData.get('type')
        };
        if (!lessonData.date || !lessonData.topic || !lessonData.groupId) {
            alert('Заполните все обязательные поля');
            return;
        }
        const newLesson = createLesson(lessonData);
        setLessons(getLessons());
        setAppMessage('Занятие успешно создано');
        setTimeout(() => {
            window.location.hash = '#/lessons';
        }, 1200);
    }
}

function initApp() {
    ensureData();
    const container = getViewContainer();
    if (!container) {
        console.error('Не найден контейнер #app-view');
        return;
    }
    document.addEventListener('submit', handleAppSubmit);
    if (!window.location.hash) {
        window.location.hash = '#/dashboard';
    }
    startRouter(handleRouteChange);
}

document.addEventListener('DOMContentLoaded', initApp);