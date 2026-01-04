import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ChevronRight, PlusCircle } from "lucide-react"
import { useState } from "react"

import {
  FieldDescription,
} from "@/components/ui/field"

import { Textarea } from "@/components/ui/textarea"
import { Variations } from "./Variations"
import { Progress } from "@/components/ui/progress"
import { CreatePair } from "@/api"
import { Label } from "@/components/ui/label"

export function AddPair() {
    const [currentStep, setCurrentStep] = useState(1)
    const progress = ((currentStep) / 2) * 100;
    
    const [data, setData] = useState({
        name:'',
        description:'',
        image:'',
    })

    const [invId, setInvId] = useState(0)

    

    const handleInventory = async () => {
        const res = await CreatePair(data.name, data.description, data.image)
        if(res){
            setInvId(res.id)
            setCurrentStep(currentStep+1)
        }
    }

    function Inventory(){
        return (
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="inv-name" className="text-xs">
                            Name
                        </Label>
                        <Input
                            id="inv-name"
                            placeholder="Nike sb stefan janoski og venom"
                            required
                            className="text-xs h-8"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="inv-desc" className="text-xs">
                            Description
                        </Label>
                        <Textarea
                            id="inv-desc"
                            placeholder="first release of janoski 2009. blue box"
                            className="resize-none text-xs"
                        />
                        
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="inv-img" className="text-xs">
                            Image
                        </Label>
                        <Input
                            id="inv-img"
                            placeholder="OG.PNG"
                            required
                            className="text-xs h-8"
                        />
                        <FieldDescription className="text-xs">
                            Use image name from ScarcePH/public/static/
                        </FieldDescription>
                    </div>
                     <Button 
                        size='sm' 
                        type="submit" 
                        variant='outline'
                        className="mt-3"
                        onClick={handleInventory}
                    >
                        Next <ChevronRight/>
                    </Button>
                </div>
                   
        )
    }

    const RenderCurrentStepContent = () => {
        switch (currentStep) {
            case 2: {
                return <Inventory/>
            }
            case 1: {
                return <Variations/>
            }
            default: {
                return null
            }
        }
    }
    return (
    <Dialog>
        <form onSubmit={handleInventory}>
        <DialogTrigger asChild>
            <Button size='sm' variant='outline'>
                <PlusCircle/> Add Pair
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-hidden flex flex-col  max-h-full">
            <DialogHeader>
                <DialogTitle>{currentStep>2?"Add new pair":"Variation"}</DialogTitle>
                <DialogDescription>
                    {currentStep>2?"Add new pair on inventory":"Add Variations here"}
                </DialogDescription>
                
                <Progress value={progress} className="mt-2"/>
                <p className="text-right">{currentStep}/2</p>
            </DialogHeader>
              
                {RenderCurrentStepContent()}
            
        </DialogContent>
        </form>
    </Dialog>
    )
}



