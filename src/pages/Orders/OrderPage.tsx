import { GetOrder } from "@/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { OrderItem } from "./OrderItem"
import type { OrderObj, PresetDdateFilter } from "@/types/Order"
import DateFilter from "../component/DateFilter"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { format } from "date-fns"


export default function OrderPage() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const status = params.get("status") ?? "pending";
    const rangeParam = params.get("range") as PresetDdateFilter ?? "this_week"
    const [range, setRange] = useState<{from: string, to: string }>({from: "",to: ""})

    let navigate = useNavigate();

    const HandleGetOrder = async () => {
        return await GetOrder(status, range.from, range.to)
    }

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["get-order", status, range.from, range.to],
        enabled: !!range.from && !!range.to,
        queryFn:HandleGetOrder
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
                <TabsTrigger value="all">
                    All
                </TabsTrigger>
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
               <DateFilter
                    onChange={(val) => {
                        setRange({
                        from: format(val.from, "yyyy-MM-dd"),
                        to: format(val.to, "yyyy-MM-dd"),
                        })
                    }}
                    defaultPreset={rangeParam}
                />
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-6 h-[80%] overflow-scroll mt-2">
                    {isLoading?      
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        :
                        data?.map((order: OrderObj)=>
                            <OrderItem data={order}/>
                        )
                    }
                </div>
            </TabsContent>
           
        </Tabs>

        </div>
    )
}
