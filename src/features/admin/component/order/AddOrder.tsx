import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, CirclePlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NewCustomer from "./NewCustomerForm";
import ExistingCustomer from "./ExistingCustomerForm";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import SelectPair from "./SelectPair";
import type { CustomerObj } from "@/features/admin/types/customer";



export default function AddOrder () {
  const [step, setStep] = useState<1 | 2>(1)
  const progress = (step / 2) * 100
  const [customerData, setCustomerData] = useState<CustomerObj|null>(null)
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-xs">
          <CirclePlusIcon/>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Add Manual Order</DialogTitle>
      
        <Progress value={progress} className="mt-2" />
        {
          step > 1 && 
          <div>
              <Button variant="ghost" size="xs" onClick={()=>setStep(1)}>
                <ArrowLeft/> Customer
              </Button>
          </div>
        }
        {step === 1 && (
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3"
          >
            <AccordionItem value="new">
              <AccordionTrigger className="flex items-center justify-between">
                <span className="text-xs font-light">New customer</span>
              </AccordionTrigger>

              <AccordionContent className="pt-2 pb-4">
                <NewCustomer 
                  setStep={()=>setStep(2)}
                  setCustomerData={setCustomerData}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="existing">
              <AccordionTrigger className="flex items-center justify-between">
                <span className="text-xs font-light">Existing customer</span>
              </AccordionTrigger>

              <AccordionContent className="pt-2 pb-4">
                <ExistingCustomer 
                  setCustomerData={setCustomerData}
                  next={()=>setStep(2)}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {step === 2 && (
          <SelectPair 
            customer={customerData!}
          />
        )}

      </DialogContent>
    </Dialog>
  )
}







