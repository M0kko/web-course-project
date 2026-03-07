const fieldMap = {
    fullName: 'fullName-error',
    groupName: 'groupName-error',
    course: 'course-error',
    recordBook: 'recordBook-error',
    enrolledAt: 'enrolledAt-error',
    status: 'status-error'
};

export function clearFormErrors(form) {
    form.querySelectorAll('field-error').forEach(el => {
        el.textContent = '';
    });
    form.querySelectorAll('is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
        messageEl.textContent = '';
    }
}

export function showFormErrors(form, errors) {
    for (const [field, message] of Object.entries(errors)) {
        const errorId = fieldMap[field];
        if (!errorId) continue;
        const errorEl = document.getElementById(errorId);
        const inputEl = form.querySelector(`[name="${field}"]`);
        if (errorEl) {
            errorEl.textContent = message;
        }
        if (inputEl) {
            inputEl.classList.add('is-invalid');
        }
    }
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
        messageEl.textContent = 'Форма содержит ошибки. Исправьте выделенные поля.';
    }
}

export function showFormSuccess(message) {
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
        messageEl.textContent = message;
    }
}