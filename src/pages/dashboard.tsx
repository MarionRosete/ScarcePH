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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { AddPair } from "./AddPair";


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
        <div className="p-3 h-screen w-full flex items-start overflow-hidden">
        <Item className="p-6 w-full h-full overflow-hidden" variant="outline">
            <Tabs className="w-full h-full" defaultValue="pendingOrder">
                <TabsList className="h-full">
                    <TabsTrigger value="pendingOrder">Orders</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
                <TabsContent className="h-full" value="pendingOrder">
                    <div className="space-y-6 h-full overflow-scroll">
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
                            <Separator/>
                            <Orders
                                data={orders}
                            />
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent className="h-full" value="inventory">
                    <div className="flex justify-between items-center mt-4 mb-6">
                        <h4 className="text-sm leading-none font-medium">
                            Inventory
                        </h4>
                        <AddPair/>
                    </div>
                    <div className="h-[86%] overflow-scroll">
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
                    </div>
                 </TabsContent>
            </Tabs>
        </Item>
        </div>
    )
}

export default Dashboard;