const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TOKEN_KEY = "ff_token";

export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}
async function request(endpoint, { method = "GET", body} = {}) {
    const token = getToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    if (response.status === 204) return null;

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Ocurrió un error inesperado.");
    }
    return data;
}

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

export function getSummary({ year, month }) {
    return request(`/transactions/summary?year=${year}&month=${month}`);
}

export function getTransactions({ year, month, category } = {}) {
    const params = new URLSearchParams();
    if (year) params.append("year", year);
    if (month) params.append("month", month);
    if (category) params.append("category", category);
    const qs = params.toString();
    return request(`/transactions${qs ? `?${qs}` : ""}`)
}

export function createTransaction(payload) {
    return request("/transactions", {method: "POST", body: payload});
}

export function deleteTransaction(id) {
    return request(`/transactions/${id}`, {method: "DELETE"});
}

export function getTransaction(id) {
    return request(`/transactions/${id}`);
}

export function updateTransaction(id, payload) {
    return request(`/transactions/${id}`, { method: "PUT", body: payload});
}
