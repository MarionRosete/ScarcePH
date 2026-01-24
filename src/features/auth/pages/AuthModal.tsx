
import { useLogin, useRegister } from "../hooks/useAuth";
import { toast } from "sonner";
import AuthForm from "../components/AuthForm";
import { useState } from "react";

export default function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
    const { mutate:Login, isPending:logging } = useLogin();
    const { mutate:Register, isPending:registering } = useRegister()
    const [isLogin, setIsLogin] = useState(true)

    return isLogin ? 
       
        <AuthForm
            open={open}
            onOpenChange={onOpenChange}
            title="Login"
            submitLabel="Login"
            footerText="Don't have an account?"
            footerActionLabel="Register"
            onFooterAction={() => setIsLogin(!isLogin)}
            isPending={logging}
            onSubmit={(data) =>
                Login(data, {
                    onSuccess: () => onOpenChange(false),
                    onError: (err) => toast.error(err.message),
                })
            }
        />
        :
         <AuthForm
            open={open}
            onOpenChange={onOpenChange}
            title="Register"
            submitLabel="Register"
            footerText="Already have an account?"
            footerActionLabel="Login"
            onFooterAction={() => setIsLogin(!isLogin)}
            isPending={registering}
            onSubmit={(data) =>
                Register(data, {
                onSuccess: () => onOpenChange(false),
                onError: (err) => toast.error(err.message),
                })
            }
        />
        
    
  
    
}

