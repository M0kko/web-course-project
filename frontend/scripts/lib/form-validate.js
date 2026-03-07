function isValidDate(value) {
    if (!value) return false;
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function validateStudentData(data) {
    const errors = {};

    if (!data.fullName) {
        errors.fullName = 'Поле "ФИО" является обязательным.';
    } else if (data.fullName.length < 5) {
        errors.fullName = 'ФИО должно содержать не менее 5 символов.';
    } else if (data.fullName.length > 150) {
        errors.fullName = 'ФИО не должно превышать 150 символов.';
    }

    if (!data.groupName) {
        errors.groupName = 'Поле "Группа" является обязательным.';
    } else if (data.groupName.length > 20) {
        errors.groupName = 'Название группы не должно превышать 20 символов.';
    }

    if (!data.course) {
        errors.course = 'Поле "Курс" является обязательным.';
    } else {
        const courseNum = Number(data.course);
        if (isNaN(courseNum) || !Number.isInteger(courseNum) || courseNum < 1 || courseNum > 6) {
            errors.course = 'Курс должен быть целым числом от 1 до 6.';
        }
    }

    if (data.recordBook && data.recordBook.length > 20) {
        errors.recordBook = 'Номер зачётки не должен превышать 20 символов.';
    }

    if (!data.enrolledAt) {
        errors.enrolledAt = 'Поле "Дата зачисления" является обязательным.';
    } else if (!isValidDate(data.enrolledAt)) {
        errors.enrolledAt = 'Дата должна быть в формате ГГГГ-ММ-ДД.';
    }

    if (!data.status) {
        errors.status = 'Поле "Статус" является обязательным.';
    } else if (!['active', 'inactive'].includes(data.status)) {
        errors.status = 'Выбрано недопустимое значение статуса.';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}