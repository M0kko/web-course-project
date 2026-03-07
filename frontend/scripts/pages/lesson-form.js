import { ensureGroups, getGroups, createLesson } from '../lib/data.js';
import { clearFormErrors, showFormErrors, showFormSuccess } from '../lib/form-errors.js';

function validateLessonData(data) {
    const errors = {};
    if (!data.date) errors.date = 'Дата обязательна';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.date = 'Неверный формат даты';
    if (!data.topic) errors.topic = 'Тема обязательна';
    else if (data.topic.length < 3) errors.topic = 'Минимум 3 символа';
    else if (data.topic.length > 200) errors.topic = 'Максимум 200 символов';
    if (!data.groupId) errors.groupId = 'Группа обязательна';
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

function init() {
    ensureGroups();
    const form = document.getElementById('lesson-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearFormErrors(form);

        const formData = new FormData(form);
        const lessonData = {
            date: formData.get('date')?.trim(),
            topic: formData.get('topic')?.trim(),
            groupId: formData.get('groupId'),
            type: formData.get('type')
        };

        const validation = validateLessonData(lessonData);
        if (!validation.valid) {
            showFormErrors(form, validation.errors);
            return;
        }

        const newLesson = createLesson(lessonData);
        showFormSuccess(`Занятие «${newLesson.topic}» успешно создано.`);
        setTimeout(() => {
            window.location.href = '/pages/lessons.html';
        }, 1200);
    });
}

document.addEventListener('DOMContentLoaded', init);