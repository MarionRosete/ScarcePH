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

async function GetAllOrder(){
    try {
        const response = await api.get('/orders/get-all-confirmed')
        return response.data
    } catch (error) {
        throw error
    }
}

async function UpdateOrder(order_id:number, status:string, received_payment:number, cancel_reason:string){
    try {
        const response = await api.post('/orders/update-status',{order_id, status, received_payment, cancel_reason})
        return response.data
    } catch (error) {
        throw error;
    }
}

async function GetAllInventory(){
    try {
        const response = await api.get('/inventory/get-all')
        return response.data
    } catch (error) {
        throw error;
        
    }
}


export { LoginAPI, CheckToken,GetALLPendingOrder, UpdateOrder, GetAllInventory, GetAllOrder };