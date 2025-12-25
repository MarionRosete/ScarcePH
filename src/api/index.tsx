import api from "./setup";

async function 
LoginAPI(email: string, password: string) {
    try {
        const response = await api.post("/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { LoginAPI };