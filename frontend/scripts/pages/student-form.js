import { ensureData, createStudent } from '../lib/data.js';
import { normalizeStudentFormData } from '../lib/form-normalize.js';
import { validateStudentData } from '../lib/form-validate.js';
import {
    clearFormErrors,
    showFormErrors,
    showFormSuccess
} from '../lib/form-errors.js';

function init() {
    ensureData();
    const form = document.querySelector('#student-form');
    if (!form) {
        console.error('Форма student-form не найдена.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        clearFormErrors(form);
        const normalizedData = normalizeStudentFormData(form);
        const result = validateStudentData(normalizedData);
        if (!result.valid) {
            showFormErrors(form, result.errors);
            return;
        }
        const newStudent = createStudent(normalizedData);
        showFormSuccess(`Студент «${newStudent.fullName}» успешно добавлен.`);
        setTimeout(() => {
            window.location.href = '/pages/students.html';
        }, 1200);
    });
}

document.addEventListener('DOMContentLoaded', init);