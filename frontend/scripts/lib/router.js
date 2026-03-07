function normalizeHash() {
    const raw = window.location.hash || '#/dashboard';
    return raw.startsWith('#') ? raw.slice(1) : raw;
}

export function parseRoute() {
    const hash = normalizeHash();
    if (hash === '/dashboard') {
        return { name: 'dashboard', params: {} };
    }
    if (hash === '/students') {
        return { name: 'students', params: {} };
    }
    if (hash.startsWith('/students/')) {
        const id = Number(hash.split('/')[2]);
        return Number.isFinite(id) ? { name: 'student', params: { id } } : { name: 'not-found', params: {} };
    }
    if (hash === '/student-form') {
        return { name: 'student-form', params: {} };
    }
    if (hash === '/groups') return { name: 'groups', params: {} };
    
    if (hash === '/lessons') return { name: 'lessons', params: {} };
    if (hash === '/lesson-form') return { name: 'lesson-form', params: {} };
    if (hash.startsWith('/attendance')) {
        const parts = hash.split('/');
        if (parts.length === 2) return { name: 'attendance', params: {} };
        if (parts.length === 3) {
            const id = Number(parts[2]);
            return Number.isFinite(id) ? { name: 'attendance', params: { lessonId: id } } : { name: 'not-found', params: {} };
        }
        return { name: 'not-found', params: {} };
    }
    if (hash === '/login') {
        return { name: 'login', params: {} };
    }
    return { name: 'not-found', params: {} };
}

export function startRouter(onRouteChange) {
    const applyRoute = () => {
        const route = parseRoute();
        onRouteChange(route);
    };
    window.addEventListener('hashchange', applyRoute);
    applyRoute();
}