import { useEffect, useState } from "react";

const useLocalStorage = (key: string, defaultValue: string) => {
    const [value, setValue] = useState(() => {
        let currentValue;

        try {
            currentValue = JSON.parse(localStorage.getItem(key) ?? 'null') || String(defaultValue);
        }catch(e) {
            console.log(e);
            currentValue = defaultValue;
        }

        return currentValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        document.documentElement.setAttribute("data-theme", value);
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage;