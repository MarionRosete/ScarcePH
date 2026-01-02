import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { UpdateOrder } from "@/api"
import { toast } from 'sonner';
import { Input } from "@/components/ui/input"
import { FieldSet,FieldDescription,Field, FieldLabel } from "@/components/ui/field"
import ConfirmationDialog from "./component/confirmation"




interface Customer{
    name:string,
    address:string,
    phone:string,
    payment_ss:string
}

interface Payment{
    payment_ss:string
}

interface Inventory{
    name:string
}

interface OrderData {
  payment: Payment;
  customer: Customer;
  inventory:Inventory;
  id:number
}

interface PaymentInput {
    setReceivedPayment:(amount:number)=> void
    receivedPayment:number
}

interface CancelInput{
    setCancelReason:(reason:string)=>void
    cancelReason:string
}

interface HandleOrder{
    order_id:number,
    status:string,
    received_payment:number,
    cancel_reason:string
    setIsLoading:(loading:boolean) => void
    setCancelReason:(reason:string)=>void
}




interface OrdersProps {
    data: OrderData[];
}

function PendingOrder({ data }: OrdersProps) {
    const [action, setAction] = useState({msg:'', status:''})
    const [receivedPayment, setReceivedPayment] = useState(0)
    const [cancelReason, setCancelReason] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="flex w-full flex-col gap-6 mt-6">
            <h4 className="text-sm leading-none font-medium">Pending Orders</h4>
            <div className="flex flex-col md:flex-row gap-6">
                {data.map((order, idx) => (
                    <Item key={idx} className={"max-w-xs"}size={'sm'} variant="outline">
                        <ItemContent >
                            <ItemTitle className="text-xs">{order.inventory.name}</ItemTitle>
                        </ItemContent>
                        <ItemActions>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="xs">
                                        View
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Customer</h4>
                                    <p className="text-muted-foreground text-sm">
                                        Name: {order.customer.name}<br/>
                                        Address: {order.customer.address}<br/>
                                        Contact Number: {order.customer.phone}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Payment</h4>
                                    <div className="max-h-60 overflow-scroll">
                                        <img src={order.payment.payment_ss}/>
                                    </div>
                                        <ConfirmationDialog
                                            title={action.msg+" Order"}
                                            description={action.msg=='Reject'?'Please state your reason for cancelling the order so the buyer is informed.':''}
                                            confirm={() => handleOrder({
                                                order_id: order.id,
                                                status: action.status,
                                                received_payment: receivedPayment,
                                                cancel_reason: cancelReason,
                                                setCancelReason:setCancelReason,
                                                setIsLoading: setIsLoading
                                            })}
                                        input={action.msg=='Confirm'?
                                            <PaymentInput receivedPayment={receivedPayment} setReceivedPayment={setReceivedPayment} />
                                            :
                                            <CancelInput cancelReason={cancelReason} setCancelReason={setCancelReason} />
                                        }
                                        isLoading={isLoading}
                                    >
                                        <div className="mt-3 grid grid-cols-2 gap-x-3">
                                            <Button 
                                                variant={"destructive"}
                                                onClick={()=>setAction({
                                                    msg:'Reject',
                                                    status:'cancelled'
                                                })}
                                            >
                                                Reject
                                            </Button>
                                            <Button 
                                                variant={"default"}
                                                onClick={()=>setAction({
                                                    msg:'Confirm',
                                                    status:'confirmed'
                                                })}
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                    </ConfirmationDialog>
                                </div>
                                </div>
                                </PopoverContent>
                            </Popover>
                        </ItemActions>
                    </Item>
                ))}
            </div>
        </div>
    );
}

 function PaymentInput({receivedPayment, setReceivedPayment}:PaymentInput){
    return(
        <FieldSet className="w-full">
            <Field>
                <FieldLabel htmlFor="username">How much did you received?</FieldLabel>
                <Input
                    onChange={(e)=>setReceivedPayment(parseInt(e.target.value))}
                    type="number"
                    value={receivedPayment}
                />
                <FieldDescription>
                    NOTE: Verify reference number from received funds
                </FieldDescription>
            </Field>
        </FieldSet>
    )
}

function CancelInput({cancelReason, setCancelReason}:CancelInput){
    return(
         <FieldSet className="w-full">
            <Field>
                <FieldLabel htmlFor="username">Cancellation reason</FieldLabel>
                <Input
                    onChange={(e)=>setCancelReason(e.target.value)}
                    value={cancelReason}
                />
                {/* <FieldDescription>
                    State your reason for cancellation
                </FieldDescription> */}
            </Field>
        </FieldSet>
    )
}

async function handleOrder({order_id, status, received_payment, cancel_reason, setIsLoading}:HandleOrder)  {
    setIsLoading(true)
    try {
        const order = await UpdateOrder(order_id, status, received_payment, cancel_reason)
        toast.success("Order " + order.status)
    } catch (error) {
        toast.error(
            error instanceof Error ? error.message : "Failed to get orders"
        );
    }
    setIsLoading(false)
}

export default PendingOrder