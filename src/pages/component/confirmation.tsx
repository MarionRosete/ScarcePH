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
import type { ReactElement } from "react"
import { Spinner } from "@/components/ui/spinner";


interface types{
    children: ReactElement,
    title:string,
    description:string,
    confirm:() => void,
    input: ReactElement,
    isLoading:boolean
}


function ConfirmationDialog({children, title,description,input,confirm, isLoading}:types){
    return(
        <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {title}
                </AlertDialogTitle>
                {input}
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>confirm()} disabled={isLoading}>
                    {isLoading ? <Spinner /> : ""}
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
     
}

export default ConfirmationDialog