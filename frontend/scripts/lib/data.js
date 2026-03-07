import { loadItems, saveItems } from './storage.js';

function defaultItems() {
    return [
        {
            id: 1,
            fullName: 'Иванов Иван Иванович',
            groupName: 'ИС-21',
            course: 3,
            recordBook: 'З-2023001',
            enrolledAt: '2023-09-01',
            status: 'active'
        },
        {
            id: 2,
            fullName: 'Петрова Мария Сергеевна',
            groupName: 'ИС-21',
            course: 3,
            recordBook: 'З-2023002',
            enrolledAt: '2023-09-01',
            status: 'active'
        },
        {
            id: 3,
            fullName: 'Сидоров Алексей Петрович',
            groupName: 'БО-31',
            course: 4,
            recordBook: 'З-2022015',
            enrolledAt: '2022-09-01',
            status: 'active'
        },
	{
            id: 4,
            fullName: 'Куропаткин Антон Сергеевич',
            groupName: 'ИБ-11',
            course: 1,
            recordBook: 'З-2025003',
            enrolledAt: '2025-09-01',
            status: 'active'
        }
    ];
}

export function ensureData() {
    const existing = loadItems();
    if (existing && existing.length > 0) return existing;
    const seed = defaultItems();
    saveItems(seed);
    return seed;
}

export function getAllItems() {
    return loadItems() ?? [];
}

export function getItemById(id) {
    const items = getAllItems();
    return items.find(x => x.id === id) ?? null;
}

export function createStudent(studentData) {
    const students = getAllItems();
    const nextId = students.length > 0
        ? Math.max(...students.map(s => Number(s.id) || 0)) + 1
        : 1;
    const newStudent = {
        id: nextId,
        fullName: studentData.fullName,
        groupName: studentData.groupName,
        course: Number(studentData.course),
        recordBook: studentData.recordBook || '',
        enrolledAt: studentData.enrolledAt,
        status: studentData.status
    };
    students.push(newStudent);
    saveItems(students);
    return newStudent;
}

const GROUPS_STORAGE_KEY = 'attendance_groups_v1';

export function getGroups() {
    const raw = localStorage.getItem(GROUPS_STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveGroups(groups) {
    localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
}

export function ensureGroups() {
    const existing = getGroups();
    if (existing.length > 0) return existing;
    const defaultGroups = [
        { id: 1, name: 'ИС-21', course: 3 },
        { id: 2, name: 'БО-31', course: 4 },
        { id: 3, name: 'ИБ-11', course: 1 }
    ];
    saveGroups(defaultGroups);
    return defaultGroups;
}

const LESSONS_STORAGE_KEY = 'attendance_lessons_v1';

export function getLessons() {
    const raw = localStorage.getItem(LESSONS_STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveLessons(lessons) {
    localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessons));
}

export function ensureLessons() {
    const existing = getLessons();
    if (existing.length > 0) return existing;
    const defaultLessons = [
        { id: 1, date: '2024-02-15', topic: 'Основы алгоритмизации', groupId: 1, type: 'lecture' },
        { id: 2, date: '2024-02-22', topic: 'Структуры данных', groupId: 1, type: 'practice' }
    ];
    saveLessons(defaultLessons);
    return defaultLessons;
}

export function createLesson(lessonData) {
    const lessons = getLessons();
    const nextId = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
    const newLesson = {
        id: nextId,
        date: lessonData.date,
        topic: lessonData.topic,
        groupId: Number(lessonData.groupId),
        type: lessonData.type
    };
    lessons.push(newLesson);
    saveLessons(lessons);
    return newLesson;
}

export function getLessonById(id) {
    const lessons = getLessons();
    return lessons.find(l => l.id === id) || null;
}