
import { useLogin, useRegister } from "../hooks/useAuth";
import { toast } from "sonner";
import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from '@tanstack/react-query';


export default function AuthModal() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState<boolean>(false)
    const { mutate:Login, isPending:logging } = useLogin();
    const { mutate:Register, isPending:registering } = useRegister()
    const [isLogin, setIsLogin] = useState(true)


    return(
        <div>
            <Button size='sm' variant='outline' onClick={()=>setOpen(!open)}> 
                Login
            </Button>
        {
            isLogin ? 
                <AuthForm
                    open={open}
                    onOpenChange={setOpen}
                    title="Login"
                    submitLabel="Login"
                    footerText="Don't have an account?"
                    footerActionLabel="Register"
                    onFooterAction={() => setIsLogin(!isLogin)}
                    isPending={logging}
                    onSubmit={(data) =>
                        Login(data, {
                            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
                            onError: (err) => toast.error(err.message),
                        })
                    }
                />
                :
                <AuthForm
                    open={open}
                    onOpenChange={setOpen}
                    title="Register"
                    submitLabel="Register"
                    footerText="Already have an account?"
                    footerActionLabel="Login"
                    onFooterAction={() => setIsLogin(!isLogin)}
                    isPending={registering}
                    onSubmit={(data) =>
                        Register(data, {
                        onSuccess: () => setOpen(false),
                        onError: (err) => toast.error(err.message),
                        })
                    }
                />
        }
        </div>
    ) 
        
    
  
    
}

