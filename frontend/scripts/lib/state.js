export const state = {
    route: {
        name: 'dashboard',
        params: {}
    },
    items: [],
    groups: [],
    lessons: [],
    selectedItemId: null
};

export function setRoute(route) {
    state.route = route;
    state.selectedItemId = route.params?.id ?? null;
}

export function setItems(items) {
    state.items = Array.isArray(items) ? items : [];
}

export function setGroups(groups) {
    state.groups = Array.isArray(groups) ? groups : [];
}

export function setLessons(lessons) {
    state.lessons = Array.isArray(lessons) ? lessons : [];
}