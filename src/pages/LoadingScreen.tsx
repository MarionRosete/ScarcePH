import { Avatar,AvatarImage } from "@/components/ui/avatar"

function LoadingScreen({msg}:{msg:string}){
    return(
        <div className="h-screen flex justify-center flex-col items-center">
            <div>
                <Avatar className="mb-4 mx-auto h-22 w-22 mt-2">
                    <AvatarImage 
                        src="https://scontent.fceb10-1.fna.fbcdn.net/v/t39.30808-6/457018195_122193654590162841_769628168669116497_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEoApMpRXfHWsOjzunTOdA499JJ3pWJcSb30knelYlxJtoVTAaLiwMhVUIty4mFw3kgpYxkwJMN0i7xto3DbmJT&_nc_ohc=KtGFFqER0zIQ7kNvwEB9Wuw&_nc_oc=AdkAPFIkmNGdrLZOu_lgKuQ9-Pvva7hK9Z1YTTJZ1_LY9loryuFVClOG9HNe157hO_s&_nc_zt=23&_nc_ht=scontent.fceb10-1.fna&_nc_gid=ex--yoYjCngMAQwrT6Kz-g&oh=00_Aflw_grm7Wnkskf2ZVh3Fgno09iA70qEzxYrfz-8coM3yA&oe=6951BBCC" 
                    />
                </Avatar>
            </div>
            <div>
            {   msg}
            </div>
        </div>
    )
}

export default LoadingScreen