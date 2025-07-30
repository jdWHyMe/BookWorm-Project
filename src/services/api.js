const API_KEY = "";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const getLatestsBooks = async () => {
    const response = await fetch(`${BASE_URL}?q=books&orderBy=relevance&maxResults=30`);
    const data = await response.json()
    return data.items
}

export const searchBooks = async (query) => {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=30`);
    const data = await response.json()
    return data.items
}