import {useState} from "react";

interface UseMutationState {
    loading: boolean;
    data?: object;
    error?: object;
}

type UseMutationResult = [(data:any) => void, UseMutationState]

export default function useMutation(url: string): UseMutationResult
{
    const [state, setState] = useState<UseMutationState>({
        loading: false,
        data: undefined,
        error: undefined
    })

    function mutation(data:any) {
        setState((prev) => ({...prev, loading: true}))
        fetch(url,{
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((response) => response.json().catch(() => {}))
            .then((data) => setState((prev) => ({...prev, data})))
            .catch((error) => setState((prev) => ({...prev, error})))
            .finally(() => setState((prev) => ({...prev, loading: false})))
    }

    return [mutation, state];
}