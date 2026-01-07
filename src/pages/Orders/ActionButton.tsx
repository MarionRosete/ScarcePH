import ConfirmationDialog from "../component/confirmation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";


export function OrderButtons({ status, order_id }: { status: string, order_id:number}){
    const {
        handleUpdateOrder, 
        setCancelReason, 
        setOrderStatus, 
        setReceivedPayment, 
        cancel_reason
    }=useOrders(status,order_id)

   
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