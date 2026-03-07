import { ensureData, getAllItems } from '../lib/data.js';

function countActiveThirdCoursePlus(students) {
    return students.filter(s => s.status === 'active' && s.course >= 3).length;
}

function countEnrolledLastYear(students) {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    return students.filter(s => {
        const enrolled = new Date(s.enrolledAt);
        return enrolled >= oneYearAgo;
    }).length;
}

function init() {
    ensureData();
    const students = getAllItems();

    const totalEl = document.getElementById('metric-total');
    const activeEl = document.getElementById('metric-active');
    const periodEl = document.getElementById('metric-period');

    if (totalEl) totalEl.textContent = String(students.length);
    if (activeEl) activeEl.textContent = String(countActiveThirdCoursePlus(students));
    if (periodEl) periodEl.textContent = String(countEnrolledLastYear(students));
}

document.addEventListener('DOMContentLoaded', init);
