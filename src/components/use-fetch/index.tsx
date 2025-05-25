import { useEffect, useState } from "react"

const useFetch = (url:string, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async() => {
        try {
            setLoading(true);
            const response = await fetch(url, {...options});
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const res  = await response.json();
            setData(res);
        } catch (error) {
            setError(`${error}: some error occurred`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url])

    return {data, loading, error};
}

export default useFetch;