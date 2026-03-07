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