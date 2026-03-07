export function normalizeStudentFormData(form) {
    const formData = new FormData(form);
    
    const fullName = String(formData.get('fullName') ?? '').trim();
    const groupName = String(formData.get('groupName') ?? '').trim();
    const course = String(formData.get('course') ?? '').trim();
    const recordBook = String(formData.get('recordBook') ?? '').trim();
    const enrolledAt = String(formData.get('enrolledAt') ?? '').trim();
    const status = String(formData.get('status') ?? '').trim();
    return {
        fullName,
        groupName,
        course,
        recordBook,
        enrolledAt,
        status
    };
}