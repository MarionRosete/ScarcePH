import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { GetCustomers } from "@/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { CustomerObj } from "@/features/admin/types/customer";

type Props = {
    setCustomerData:(customer:CustomerObj|null)=>void
    next:()=>void
}

export default function ExistingCustomer({setCustomerData, next}:Props){
    const [customer,setCustomer] = useState('')
     const {
        data,
        isLoading,
    } = useQuery<CustomerObj[]>({
        queryKey: ["get-customers"],
        queryFn:GetCustomers
    });


    const handleChange = (value:string) => {
        setCustomer(value)
        const cust = data?.find((cust)=>cust.id === value) || null
        setCustomerData(cust)
    }
    
    
    return(
      <div className="space-y-2 p-2 w-full">
        <Select 
            onValueChange={(v)=> handleChange(v)} 
            value={customer}
        > 
          <SelectTrigger className="text-xs w-full"> 
              <SelectValue placeholder="Marion rosete" /> 
          </SelectTrigger> 
          <SelectContent className="text-xs"> 

              {isLoading?
                  <SelectItem value="loading" disabled>Loading...</SelectItem> 
                  :
                  data?.map((customer, key)=> 
                      <SelectItem value={customer.id} key={key}>{customer.name}</SelectItem> 
                  )
              } 
          </SelectContent> 
        </Select> 
        <Button 
            variant='secondary' 
            disabled={!customer} 
            onClick={next}
            >
            Next
        </Button>
      </div>
    )
}