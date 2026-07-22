const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function post(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Ocurrió un error inesperado");
    }

    return data;
}

export function registerUser({ name, email, password }) {
    return post("/auth/register", { name, email, password});
}

export function loginUser({ email, password }) {
    return post("/auth/login", { email, password});
}
