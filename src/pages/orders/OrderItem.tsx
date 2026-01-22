import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { OrderProps } from "@/types/Order";
import { OrderButtons } from "./ActionButton";


export function OrderItem ({data}:OrderProps){    

    
    return(
        <Card className="p-4 h-auto text-xs md:text-sm max-w-sm md:max-w-md">
            <div className="flex justify-between">
                    <Badge>
                        {data.status.toLocaleUpperCase()}
                    </Badge>
                <p className="text-xs">{new Date(data.created_at).toLocaleString()}</p>
            </div>
            <div className="flex">
                <div className="w-1/2 flex justify-center">
                    <div className="w-1/2 h-1/2">
                        <img
                            src={data.inventory.image}
                                className="w-full rounded-sm object-fit"
                        />
                    </div>
                </div>
                <div className="w-1/2 text-right">
                    <Popover>
                        <PopoverTrigger asChild>
                            <p className="font-bold underline cursor-pointer">
                                Payment info  
                                {data.payment?.payment_method?"-"+data.payment?.payment_method?.toLocaleUpperCase():""}
                            </p>
                        </PopoverTrigger>
                        <PopoverContent>
                            <img
                                src={data?.payment?.payment_ss}
                            />
                        </PopoverContent>
                    </Popover>
                    <p>
                        Balance: ₱{Math.abs(data?.payment?.to_settle).toLocaleString()||"PAID"}
                    </p>
                    <p>
                       {data?.shipment?.tracking?"Tracking:":""}
                        <span className="underline cursor-pointer" onClick={()=>
                            window.open("https://parcelsapp.com/en/tracking/"+data?.shipment?.tracking, 
                                'popupName', 'width=600,height=600,resizable=yes,scrollbars=yes,status=yes')
                        }>
                            {data?.shipment?.tracking}
                        </span>
                    </p>
                       
                    
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <p>
                        {data.inventory.name}
                    </p>
                    <p>
                        Size: {data.variation.size} us
                    </p>
                    <p>
                        Price: ₱{Math.abs(data.variation.price).toLocaleString()}
                    </p>         
                    <p>
                        Spent: ₱{Math.abs(data.variation.spent).toLocaleString()}
                    </p>
                    <p>
                        Profit: ₱{Math.abs(data.variation.price - data.variation.spent).toLocaleString()}
                    </p>         
                </div>
                <div className="w-1/2 text-right">
                    {/* <p className="font-bold underline">
                        Shipping info
                    </p> */}
                    <p>
                        {data.customer.name}
                    </p>
                    <p>
                        {data.customer.address}
                    </p>
                    <p>
                        {data.customer.phone}
                    </p>
                  
                </div>
            </div>
            <div className="flex justify-end gap-3">
                <OrderButtons status={data.status} order_id={data.id}/>
            </div>
        </Card>
    )
}

