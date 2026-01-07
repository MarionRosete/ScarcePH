import { GetOrder } from "@/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { OrderItem } from "./OrderItem"
import type { OrderObj } from "@/types/Order"



export default function OrderPage() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const status = params.get("status") ?? "pending";
    let navigate = useNavigate();

    const HandleGetOrder = async () => {
        return await GetOrder(status)
    }

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["get-order", status],
        queryFn:HandleGetOrder,
    });
    const handleTabs = (e:string) => {
        navigate("/orders?status="+e)
    }

 
    return (
        <div className="p-4 md:p-8 h-full overflow-hidden">
        <Tabs 
            className="w-full" 
            value={status} 
            onValueChange={handleTabs}
        >
            <TabsList>
                <TabsTrigger value="pending">
                    Pending
                </TabsTrigger>

                <TabsTrigger value="confirmed">
                    Confirmed
                </TabsTrigger>
                <TabsTrigger value="completed">
                    Completed
                </TabsTrigger>

                <TabsTrigger value="cancelled">
                    Cancelled
                </TabsTrigger>
              
            </TabsList>
            <TabsContent value={status}>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-6 h-[80%] overflow-scroll">
                    {data?.map((order: OrderObj)=>
                        <OrderItem data={order}/>
                    )}
                </div>
            </TabsContent>
           
        </Tabs>

        </div>
    )
}
