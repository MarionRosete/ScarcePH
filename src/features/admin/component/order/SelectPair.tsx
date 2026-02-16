import { Button } from "@/components/ui/button";
import { Item, ItemHeader } from "@/components/ui/item";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateOrder, GetAllAvailablePairs } from "@/api";
import type { InventoryObj } from "@/features/admin/types/Inventory";
import type { CustomerObj } from "@/features/admin/types/customer";
import { Input } from "@/components/ui/input";



export default function SelectPair({customer}:{customer:CustomerObj}){
    const [selectedPair, setSelectedPair] = useState<InventoryObj | null>(null);
    const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
    const [funds, setFunds] = useState('');
    const {
        data,
        isLoading,
    } = useQuery<InventoryObj[]>({
        queryKey: ["get-all-available-pairs"],
        queryFn:GetAllAvailablePairs
    });

    const queryClient = useQueryClient()
    const addOrderMutation = useMutation({
        mutationFn: CreateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-order"] })
        },

    })

    const submit = () => {
        if(!selectedPair || !selectedVariation) return;
        const payload = {
            customer_id: customer.id,
            inventory_id: selectedPair?.id!,
            variation_id: selectedVariation!,
            status: 'pending',
            received_amount:funds
        }
        addOrderMutation.mutate(payload)
    }
    
    

    
    return(
        <div>
            <Item className="flex justify-center flex-col">
                <ItemHeader className="flex w-full text-xs mb-3 justify-start">
                        {customer?.name}, {customer?.address}, {customer?.phone}
                </ItemHeader>
                <div>
                    <img
                        className="w-25 md:w-50 rounded-sm object-fit"
                        src={selectedPair?.image}
                        alt="PAIR IMAGE"
                    />
                </div>
                    <Select 
                        onValueChange={(value)=>{
                            const pair = data?.find((pair)=>pair.name === value) || null
                            setSelectedPair(pair)
                        }}
                        value={selectedPair?.name|| ""}
                        disabled={isLoading}
                    > 
                        <SelectTrigger className="text-xs w-full"> 
                            <SelectValue placeholder="Nike sb stefan janoski Og Venom" /> 
                        </SelectTrigger> 
                        <SelectContent> 
                            {data?.map((pair, key)=> 
                                <SelectItem value={pair.name} key={key}> {pair.name} </SelectItem> 
                            )} 
                        </SelectContent> 
                    </Select>
                    <Select 
                        onValueChange={(value)=>{
                            setSelectedVariation(parseInt(value))
                        }}
                        value={selectedVariation?.toString() || ""}
                        disabled={isLoading}

                    > 
                        <SelectTrigger className="text-xs w-full"> 
                            <SelectValue placeholder="New in box Size 10.5" /> 
                        </SelectTrigger> 
                        <SelectContent> 
                            {selectedPair?.variations?.map((pair, key)=> 
                                <SelectItem value={pair.id.toString()} key={key}> {pair.condition},&nbsp;Size:&nbsp;{pair.size}us </SelectItem> 
                            )} 
                        </SelectContent> 
                    </Select> 
                    <Input
                        placeholder="Amount received"
                        onChange={(e)=>setFunds(e.target.value)}
                    />
                <Button size={'sm'} 
                    onClick={submit} 
                    disabled={!selectedPair||!selectedVariation||addOrderMutation.isPending}
                >
                    Create Order
                </Button>
              
            </Item>
        </div>
    )
}