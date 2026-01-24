import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "../auth/pages/AuthModal";
export function PublicHeader(){
    
    return(
        <div className="sticky top-0 z-10 backdrop-blur space-y-3 mb-2 flex justify-between pb-3 pt-3">
            <div className="flex w-full justify-between">
                <div className="flex space-x-2 items-center">
                    <div>
                        <p className="text-md">
                            Archives by
                        </p>
                    </div>
                    <div className="">
                        <img
                            src="/image/ScarceLogo.PNG"
                            className="w-15  object-fit"

                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Button size='icon-sm' variant={'outline'}>
                        <ShoppingCartIcon/>
                    </Button>
                    <AuthModal/>
                </div>
            </div>
            
        </div>
    )
}