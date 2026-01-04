import { toast } from "sonner";
import api from "./setup";
import type { VariationParams } from "@/types/api";

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

async function CreatePair(name:string, description:string, image:string){
    try {
        const response = await api.post('/inventory/create', {name, description, image})
        toast.success('Successfully created pair')
        return response.data
    } catch (error) {
        toast.error(
            error instanceof Error ? error.message : "Failed to add new pair"
        );
        throw error
    }
}

async function CreateVariation(key:number,payload:VariationParams){
    console.log({...payload});
    
    try {
        const response = await api.post('/inventory/create-variation',{...payload})
        toast.success('Variation '+key+' Created')
        return response.data
    } catch (error) {
        toast.error(
            error instanceof Error ? error.message : "Failed to add new pair"
        );
        throw error
    }
}


export { 
    LoginAPI, 
    CheckToken,
    GetALLPendingOrder, 
    UpdateOrder, 
    GetAllInventory, 
    GetAllOrder,
    CreatePair,
    CreateVariation
};