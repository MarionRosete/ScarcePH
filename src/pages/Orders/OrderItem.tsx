import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { OrderProps } from "@/types/Order";
import ConfirmationDialog from "../component/confirmation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateOrder } from "@/api";
import type { UpdateOrderParams } from "@/types/api";

export function OrderItem ({data}:OrderProps){    
    
    return(
        <Card className="p-4 h-auto text-xs md:text-sm">
            <div>
                <Badge>
                    {data.status.toLocaleUpperCase()}
                </Badge>
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
                                src={data.payment.payment_ss}
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
                <ActionButton status={data.status} order_id={data.id}/>
            </div>
        </Card>
    )
}

function ActionButton({ status, order_id }: { status: string, order_id:number}){
    const queryClient = useQueryClient()
    const [received_payment, setReceivedPayment] = useState(0)
    const [cancel_reason, setCancelReason] = useState('')
    const [orderStatus, setOrderStatus] = useState('')

  

    const addVariationsMutation = useMutation({
        mutationFn: ({order_id, status, received_payment, cancel_reason}: UpdateOrderParams) => UpdateOrder({order_id, status, received_payment, cancel_reason}),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-order", status]})
        },
    })

    

    const handleUpdateOrder=()=>{
        addVariationsMutation.mutate(
           {order_id,status:orderStatus,received_payment,cancel_reason}
            
        )
    }

   
    switch (status) {
        case "pending":
            return (
            <>
                <ConfirmationDialog
                    title="Reject Order"
                    description="NOTE: We'll message the customer for this reason"
                    confirm={handleUpdateOrder}
                    input={
                        <Textarea 
                            className="mt-2 mb-2"
                            placeholder="Invalid payment."
                            onChange={(e)=>setCancelReason(e.target.value)} 
                            value={cancel_reason}
                        />
                    }
                    isLoading={false}
                    
                >
                    <Button size={'sm'} variant="outline" onClick={()=>setOrderStatus('cancelled')}>
                        Reject
                    </Button>
                </ConfirmationDialog>

                <ConfirmationDialog
                    title="Accept order"
                    description="Verify payment and input amount received"
                    confirm={handleUpdateOrder}
                    input={
                        <Input 
                            className="mt-2 mb-2"
                            placeholder="₱7,500.00"
                            type="number"
                            onChange={(e)=>setReceivedPayment(Number(e.target.value))} 
                        />
                    }
                    isLoading={false}
                >
                    <Button size={'sm'} onClick={()=>setOrderStatus('confirmed')}>
                        Confirm
                    </Button>
                </ConfirmationDialog>
            </>
            )
            break;
        case "confirmed":
            return (
            <>
                <Button size={'sm'} variant="outline">
                    Return to sender
                </Button>
                <Button size={'sm'} >
                    Mark as completed
                </Button>
            </>
            )
            break;
        default:
            break;
    }
}