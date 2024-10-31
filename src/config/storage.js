import Cookies from "js-cookie";

export function loadState(key) {
    try {
        const serializedState = Cookies.get(key);
        if (!serializedState) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state:', error);
        return undefined;
    }
}

export function saveState(key, state) {
    try {
        const serializedState = typeof state === 'string' ? state : JSON.stringify(state);
        Cookies.set(key, serializedState);
    } catch (error) {
        console.error('Error saving state:', error);
    }
}