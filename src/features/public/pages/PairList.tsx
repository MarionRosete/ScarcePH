import { useGetPairs } from "../hooks/usePairs";
import { Skeleton } from "@/components/ui/skeleton";
import { PairCard } from "../components/PairCard";


export function PairList(){
   const { data:pairs, isLoading }= useGetPairs()
   
   return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
            {isLoading?
                <div>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
                :
                pairs?.flatMap((pair, key) =>
                    <PairCard pair={pair} key={key}/>
                )
            }
        </div>
   )
}