
import { MobileSheet } from "./components/MobileSheet"
import { AppCart } from "../cart/AppCart"



export function UserHeader({user}:{user:string}) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur mb-2 p-2 flex justify-between">

      <div className="flex space-x-2 items-center">
        <p className="text-md">Archives by</p>
        <img src="/image/ScarceLogo.PNG" className="w-15 object-fit" />
      </div>

      <div className="hidden md:flex items-center space-x-4">
         <AppCart/>
        <p>Good day, {user}</p>
      </div>

      <div className="flex md:hidden space-x-4">
        <AppCart/>
        <MobileSheet user={user}/>
      </div>
    </div>
  )
}
