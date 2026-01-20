import ConfirmationDialog from "../component/confirmation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const variationStatus = [
    'onhand',
    'preorder',
    'sold'
]
export function OrderButtons({ status, order_id }: { status: string, order_id:number}){
    const {
        handleUpdateOrder, 
        setCancelReason, 
        setOrderStatus, 
        setReceivedPayment, 
        cancel_reason,
        setRelease
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
                <ConfirmationDialog
                    title="Cancel Order"
                    description="NOTE: We'll message the customer for this reason"
                    confirm={handleUpdateOrder}
                    input={
                        <>
                            <Textarea 
                                className="mt-2 mb-2"
                                placeholder="Failed to pickup/Deliver"
                                onChange={(e)=>setCancelReason(e.target.value)} 
                                value={cancel_reason}
                            />
                            <Select 
                                onValueChange={(v)=> setRelease(v)}                             
                            > 
                                <SelectTrigger className="text-xs "> 
                                    <SelectValue placeholder="onhand" className="text-xs w-full"/> 
                                </SelectTrigger> 
                                <SelectContent className="text-xs"> 
                                    {variationStatus.map((status, key)=> 
                                        <SelectItem value={status} key={key}>{status}</SelectItem> 
                                    )} 
                                </SelectContent> 
                            </Select> 
                        </>
                    }
                    isLoading={false}
                >
                    <Button size={'sm'} variant="outline" onClick={()=>setOrderStatus('cancelled')}>
                        Return to sender
                    </Button>
                </ConfirmationDialog>
                <ConfirmationDialog
                    title="Complete order"
                    description="Please confirm if costumer received order & COD/COP payments release in your account"
                    confirm={handleUpdateOrder}
                    input={<></>}
                    isLoading={false}
                >
                    <Button size={'sm'} onClick={()=>setOrderStatus('completed')} >
                        Mark as completed
                    </Button>
                </ConfirmationDialog>
            </>
            )
            break;
        default:
            break;
    }
}