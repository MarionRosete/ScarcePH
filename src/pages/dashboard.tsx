import { Item } from "@/components/ui/item";
import Orders from "./component/orders";
import { useEffect, useState } from "react";
import { GetALLPendingOrder } from "@/api";
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


function Dashboard() {
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        const handleGetOrder = async() => {
            try {
                const orders =  await GetALLPendingOrder()
                console.log("orders",orders)
                setOrders(orders)
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to get orders"
                );
            }
            
        }
        handleGetOrder()
    },[])
    return (
        <div className="p-3 h-screen">
        <Item className="p-6" variant="outline">
            <Tabs defaultValue="orders">
                <TabsList>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="password">Inventory</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <Orders data={orders} />
                </TabsContent>
                 <TabsContent value="inventory">
                    <div>
                        Inventory
                    </div>
                 </TabsContent>
            </Tabs>
        </Item>
        </div>
    )
}

export default Dashboard;