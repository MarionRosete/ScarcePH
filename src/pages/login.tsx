import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { toast } from "sonner"
import { LoginAPI } from "@/api";

function LoginPage() {
    const [data, setData] = useState({
        email: "",
        password: "",
        is_loading: false,
    });
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setData({ ...data, is_loading: true });
        try {
            const response = await LoginAPI(data.email, data.password);
            localStorage.setItem("token", response.token);
            toast.success("Login successful");
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "Login failed";
            toast.error(errorMessage);
        }
        setData({ ...data, is_loading: false });
    }
    return (
        <div className="h-screen flex justify-center items-center p-8">
           <div className="w-full md:max-w-md  p-8">
                <FieldSet onSubmit={handleSubmit} className="space-y-4 mt-4" >
                       <Avatar className="mb-4 mx-auto h-22 w-22 mt-2">
                        <AvatarImage 
                            src="https://scontent.fceb10-1.fna.fbcdn.net/v/t39.30808-6/457018195_122193654590162841_769628168669116497_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEoApMpRXfHWsOjzunTOdA499JJ3pWJcSb30knelYlxJtoVTAaLiwMhVUIty4mFw3kgpYxkwJMN0i7xto3DbmJT&_nc_ohc=KtGFFqER0zIQ7kNvwEB9Wuw&_nc_oc=AdkAPFIkmNGdrLZOu_lgKuQ9-Pvva7hK9Z1YTTJZ1_LY9loryuFVClOG9HNe157hO_s&_nc_zt=23&_nc_ht=scontent.fceb10-1.fna&_nc_gid=ex--yoYjCngMAQwrT6Kz-g&oh=00_Aflw_grm7Wnkskf2ZVh3Fgno09iA70qEzxYrfz-8coM3yA&oe=6951BBCC" 
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Email</FieldLabel>
                            <Input id="name" autoComplete="off" placeholder="your email" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" autoComplete="off"  type="password" placeholder="your password"/>
                        </Field>
                        <Field orientation="horizontal">
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <div className="flex justify-center">
                    <Button 
                        variant="outline" 
                        size="lg"
                        disabled={data.is_loading}
                           onClick={handleSubmit}
                    >
                       {data.is_loading ? <Spinner /> : ""}
                       Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;