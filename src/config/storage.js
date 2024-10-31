import Cookies from "js-cookie";

export function loadState(key) {
    try {
        const serializedState = Cookies.get(key); // Cookies dan data olib beradigon funksiya
        if (!serializedState)
            return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}


export async function saveState(key, state){
    try {
        const serializedState = JSON.stringify(state); // Cookies ga malumot yozadigon funksiya 
        Cookies.set(key,serializedState);
    } catch (error) {
        return error;
    }
}