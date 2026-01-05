import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface Order {
  pair: string;
  customer: string;
  tracking: string;
  balance: number,
  amount: number;
  size:string,
}

interface OrderObj{
    orders: Array<Order>
    total_balance: number,
    total: number

}

interface props{
    data: OrderObj
}

export function Orders({data}:props) {
    console.log("order",data)

    return (
        <div className="gap-6 mt-6">
            <h4 className="text-sm leading-none font-medium mb-3">Orders</h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs">Pair</TableHead>
                            <TableHead className="text-xs">Customer</TableHead>
                            <TableHead className="text-xs">Tracking</TableHead>
                            <TableHead className="text-xs">Balance</TableHead>
                            <TableHead className="text-right text-xs">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.orders.map((order, key) => (
                        <TableRow key={key}>
                            <TableCell className="text-xs">{order.pair+" "+order.size}</TableCell>
                            <TableCell className="text-xs">{order.customer}</TableCell>
                            <TableCell className="text-xs">
                                <a 
                                    href={"https://parcelsapp.com/en/tracking/"+order.tracking} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                   {order.tracking}
                                </a>
                            </TableCell>
                            <TableCell className="text-xs">{order.balance}</TableCell>
                            <TableCell className="text-right text-xs">{order.amount}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="text-xs" colSpan={3}>Total</TableCell>
                            <TableCell className="text-left text-xs">₱{data.total_balance}</TableCell>
                            <TableCell className="text-right text-xs">₱{data.total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
        </div>
    )
}
