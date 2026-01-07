import { UpdateOrder } from "@/api"
import type { UpdateOrderParams } from "@/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const  useOrders = (status:string, order_id:number) => {
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

    return {
        setReceivedPayment, 
        setCancelReason, 
        setOrderStatus, 
        handleUpdateOrder, 
        cancel_reason
    }
}