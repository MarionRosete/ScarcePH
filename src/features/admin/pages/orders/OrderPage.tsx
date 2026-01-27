import { GetOrder } from "@/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { OrderItem } from "./OrderItem"
import type { OrderObj, PresetDdateFilter } from "@/features/admin/types/Order"
import DateFilter from "../../component/DateFilter"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { format } from "date-fns"
import AddOrder from "../../component/order/AddOrder"


export default function OrderPage() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const status = params.get("status") ?? "pending";
    const rangeParam = params.get("range") as PresetDdateFilter ?? "this_week"
    const [range, setRange] = useState<{from: string, to: string }>({from: "",to: ""})

    let navigate = useNavigate();

    const handleTabs = (e:string) => {
        navigate("/admin/orders?status="+e)
    }
  

    const HandleGetOrder = async () => {
        return await GetOrder(status, range.from, range.to)
    }

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["get-order", status, range.from, range.to],
        enabled: !!range.from && !!range.to,
        queryFn:HandleGetOrder
    });
   

 
    return (
        <div className="p-5 h-full flex flex-col">
            <Tabs 
                value={status} 
                onValueChange={handleTabs}
            >   
                <div className="sticky top-0 z-10 backdrop-blur-lg space-y-3 mb-2">
                    <TabsList>
                        <TabsTrigger value="all" className="text-xs md:text-dm">
                            All
                        </TabsTrigger>
                        <TabsTrigger value="pending"className="text-xs md:text-md" >
                            Pending
                        </TabsTrigger>
                        <TabsTrigger value="confirmed" className="text-xs md:text-md">
                            Confirmed
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="text-xs md:text-md">
                            Completed
                        </TabsTrigger>
                        <TabsTrigger value="cancelled"className="text-xs md:text-md">
                            Cancelled
                        </TabsTrigger>
                        
                    </TabsList>
                    <div className="flex items-center space-x-2">
                        <DateFilter
                            onChange={(val) => {
                                setRange({
                                from: format(val.from, "yyyy-MM-dd"),
                                to: format(val.to, "yyyy-MM-dd"),
                                })
                            }}
                            defaultPreset={rangeParam}
                        />
                        <AddOrder/>
                    </div>
                </div>
                <TabsContent value={status}>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-6 h-full">
                        {isLoading ? (
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        ) : (
                        data?.length?
                        data?.map((order: OrderObj) => (
                            <OrderItem key={order.id} data={order} />
                        ))
                        :
                        <p className="text-md text-center col-span-3">
                            No orders found.
                        </p>

                        )}
                    </div>
                </TabsContent>
            
            </Tabs>

        </div>
    )
}
