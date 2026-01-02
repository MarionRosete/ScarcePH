import { Item } from "@/components/ui/item";
import { useEffect, useState } from "react";
import { GetAllInventory, GetAllOrder, GetALLPendingOrder } from "@/api";
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Inventory from "./Inventory";
import { NoDataPage } from "./NoData";
import PendingOrder from "./PendingOrder";
import { Orders } from "./Orders";


function Dashboard() {
    const [pendingOrder, setPendingOrder] = useState([])
    const [inventory, setInventory] = useState([])
    const [orders, setOrders] = useState({
        orders:[],
        total_balance:0,
        total:0
    })
    
    useEffect(()=>{
        const handleGetData = async () => {
            try {
                const pendingOrder =  await GetALLPendingOrder()
                setPendingOrder(pendingOrder)
                const inventory =  await GetAllInventory()
                setInventory(inventory)
                const orders = await GetAllOrder()
                
                setOrders(orders)
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to Get data"
                );
            }
            
        }
        handleGetData()
   
    },[])
    
    return (
        <div className="p-3 h-screen w-full flex items-start">
        <Item className="p-6 w-full overflow-scroll" variant="outline">
            <Tabs className="w-full" defaultValue="pendingOrder">
                <TabsList>
                    <TabsTrigger value="pendingOrder">Orders</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
                <TabsContent value="pendingOrder">
                    <div className=" space-y-6">
                        {pendingOrder.length?
                            <PendingOrder data={pendingOrder}/>
                            : 
                            <NoDataPage
                                header="You’re all caught up"
                                description="No pendingOrder need your attention right now."
                                addBtn={false}
                                btnName="Order history"
                                btnClick={()=>{}}

                            />
                        }
                        <div className="w-full over-flow-scroll">
                            <hr className="h-1 w-full my-4 bg-neutral-800 border-0 rounded-sm md:my-10"/>
                            <Orders
                                data={orders}
                            />
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent value="inventory">
                    {inventory.length?
                        <Inventory data={inventory}/>
                    :
                        <NoDataPage
                            header="Your inventory is empty"
                            description="Add products to start receiving pendingOrder."
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