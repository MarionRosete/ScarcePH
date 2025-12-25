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

async function CheckToken() {
    try {
        const response = await api.get("/auth/validate");
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function GetALLPendingOrder(){
    try {
        const response = await api.get("/orders/get-all-pending")
        return response.data
    } catch (error) {
        throw error;
    }
}

export { LoginAPI, CheckToken,GetALLPendingOrder };