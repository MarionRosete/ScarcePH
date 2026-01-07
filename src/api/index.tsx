import { toast } from "sonner";
import api from "./setup";
import type { UpdateOrderParams, VariationParams } from "@/types/api";

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

async function GetOrder(status:string){
    try {
        const response = await api.get("/orders/get-all?status="+status)
        return response.data
    } catch (error) {
        throw error;
    }
}



async function UpdateOrder({order_id, status, received_payment, cancel_reason}:UpdateOrderParams){
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

async function CreateVariation(inventory_id:number, variations:VariationParams[]){
    
    try {
        const response = await api.post('/inventory/create-variation',{inventory_id, variations})
        if(response.data){
            toast.success(response.data.message)
        }
        return response.data
    } catch (error) {
        toast.error(
            error instanceof Error ? error.message : "Failed to add new pair"
        );
        throw error
    }
}

async function GetDashboardSummary(){
    try {
        const response = await api.get('/dashboard/summary')
        return response.data
    } catch (error) {
         toast.error(
            error instanceof Error ? error.message : "Failed to add new pair"
        );
        throw error
    }
}

async function GetBestSeller(){
    try {
        const response = await api.get('dashboard/bestseller')
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
    UpdateOrder, 
    GetAllInventory, 
    CreatePair,
    CreateVariation,
    GetDashboardSummary,
    GetBestSeller,
    GetOrder
};