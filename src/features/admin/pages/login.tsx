import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function LoginPage() {
    const { login } = useAuth();


    const [data, setData] = useState({
        email: "",
        password: "",
        is_loading: false,
    });
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setData({ ...data, is_loading: true });
        await login({ email: data.email, password: data.password });
        setData({ ...data, is_loading: false });
    }
    return (
        <div className="h-screen flex justify-center items-center p-8">
           <div className="w-full md:max-w-md  p-8">
                <form  onSubmit={handleSubmit}>
                    <FieldSet className="space-y-4 mt-4" >
                        <div className="flex justify-center mb-4">
                            <img 
                                src="/image/ScarceLogo.PNG "
                                className="w-20 md:w-40 rounded-sm object-fit rounded-md object-fit"
                            />
                        </div>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Email</FieldLabel>
                                <Input id="name" autoComplete="off" placeholder="your email" onChange={(e) => setData({...data, email: e.target.value})} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" autoComplete="off"  type="password" placeholder="your password" onChange={(e) => setData({...data, password: e.target.value})}/>
                            </Field>
                            <Field orientation="horizontal">
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <div className="flex justify-center">
                        <Button 
                            type="submit"
                            variant="outline" 
                            size="lg"
                            disabled={data.is_loading}
                            onClick={handleSubmit}
                        >
                        {data.is_loading ? <Spinner /> : ""}
                        Login
                        </Button>
                    </div>
                 </form>
            </div>
        </div>
    );
}

export default LoginPage;