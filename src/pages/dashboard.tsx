import { Item } from "@/components/ui/item";
import { useEffect, useState } from "react";
import { GetAllInventory, GetALLPendingOrder } from "@/api";
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Orders from "./Orders";
import Inventory from "./Inventory";
import { NoDataPage } from "./NoData";


function Dashboard() {
    const [orders, setOrders] = useState([])
    const [inventory, setInventory] = useState([])
    
    useEffect(()=>{
        const handleGetOrder = async () => {
            try {
                const orders =  await GetALLPendingOrder()
                setOrders(orders)
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to get orders"
                );
            }
            
        }
        const handleGetInventory = async ()=>{
            try {
                const inventory =  await GetAllInventory()
                setInventory(inventory)

            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to get orders"
                );
            }
           
        }
  
        handleGetOrder()
        handleGetInventory()   
    },[])
    
    return (
        <div className="p-3 h-screen">
        <Item className="p-6" variant="outline">
            <Tabs defaultValue="orders">
                <TabsList>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    {orders.length?
                        <Orders data={orders}/>
                        : 
                        <NoDataPage
                            header="You’re all caught up"
                            description="No orders need your attention right now."
                            addBtn={false}
                            btnName="Order history"
                            btnClick={()=>{}}

                        />
                    }
                </TabsContent>
                 <TabsContent value="inventory">
                    {inventory.length?
                        <Inventory data={inventory}/>
                    :
                        <NoDataPage
                            header="Your inventory is empty"
                            description="Add products to start receiving orders."
                            addBtn={true}
                            btnName="Add first item"
                            btnClick={()=>{}}

                        />
                    }
                 </TabsContent>
            </Tabs>
        </Item>
        </div>
    )
}

export default Dashboard;