import { ensureData, getAllItems } from '../lib/data.js';

function countActiveThirdCoursePlus(students) {
    return students.filter(s => s.status === 'active' && s.course >= 3).length;
}

function countEnrolledLastMonth(students) {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return students.filter(s => {
        const enrolled = new Date(s.enrolledAt);
        return enrolled >= oneMonthAgo;
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
    if (periodEl) periodEl.textContent = String(countEnrolledLastMonth(students));
}

document.addEventListener('DOMContentLoaded', init);
