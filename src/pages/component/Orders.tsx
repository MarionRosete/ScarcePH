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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


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
}




interface OrdersProps {
    data: OrderData[];
}

function Orders({ data }: OrdersProps) {
    return (
        <div className="flex w-full flex-col md:flex-row gap-6 mt-6">
            {data.map((order, idx) => (
                <Item key={idx} variant="outline">
                    <ItemContent >
                        <ItemTitle>{order.inventory.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <OpenAction 
                            name={order.customer.name} 
                            address={order.customer.address}
                            phone={order.customer.phone}
                            payment_ss={order.payment.payment_ss}
                        />
                    </ItemActions>
                </Item>
            ))}
        </div>
    );
}

function OpenAction({name, address, phone, payment_ss}:Customer){
    return(
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
                        Name: {name}<br/>
                        Address: {address}<br/>
                        Contact Number: {phone}
                    </p>
                </div>
                <div className="space-y-2">
                    <h4 className="leading-none font-medium">Payment</h4>
                    <div className="max-h-60 overflow-scroll">
                    <img src={payment_ss}/>
                    </div>
                      
                        <Confirmation/>
                </div>
                </div>
                </PopoverContent>
            </Popover>
    )
}

function Confirmation(){
    return(
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <div className="mt-3 grid grid-cols-2 gap-x-3">
                <Button variant={"default"}>
                    Confirm
                    </Button>
                <Button variant={"destructive"}>
                    Reject
                </Button>
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}

export default Orders