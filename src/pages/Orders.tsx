import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface Invoice {
  pair: string;
  customer: string;
  tracking: string;
  balance: number
  amount: number;
  size:string
}

interface props{
    data: Array<Invoice>;
}

export function Orders({data}:props) {
    console.log("order",data)

    return (
        <div>
                <h4 className="text-sm leading-none font-medium">Orders</h4>
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
                        {data.map((order, key) => (
                        <TableRow key={key}>
                            <TableCell className="text-xs">{order.pair+" "+order.size}</TableCell>
                            <TableCell className="text-xs">{order.customer}</TableCell>
                            <TableCell className="text-xs">{order.tracking}</TableCell>
                            <TableCell className="text-xs">{order.balance}</TableCell>
                            <TableCell className="text-right text-xs">{order.amount}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                 
                </Table>
        </div>
    )
}
