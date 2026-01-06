import { GetBestSeller } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import type { BestsellerItem } from "@/types/dashboard";
import { normalizePair } from "@/utils/dashboard";
import { useQuery } from "@tanstack/react-query";

export function BestSelling () {
    const {
        data,
        isLoading,
        isError,
    } = useQuery<BestsellerItem[]>({
        queryFn:GetBestSeller,
        queryKey: ["bestsellers"],
        staleTime: 30 * 60_000,
    })

    if (isError) {
        return (
            <div className="m-6 text-sm text-destructive">
                Failed to load Best sellers
            </div>
        )
    }

    return (
        <div className="col-span-2 border rounded-lg border-grey-800 md:p-7 p-5">
            <p className="text-xs md:text-sm ">
                Best selling
            </p>
            <div className="grid grid-cols-3 gap-8 md:gap-13 p-2 md:mt-4">
                {isLoading ? (
                    <>
                        <Skeleton className="h-8 w-20 mx-auto" />
                        <Skeleton className="h-3 w-24 mx-auto" />
                    </>
                ):(
                    data?.map((pair,key)=>
                    <div key={key}>
                        <img src={pair?.image} 
                            className="w-full rounded-sm object-fit"
                        />
                        <p className="text-xs md:text-xs text-center font-light mt-4">
                            
                            {normalizePair(pair?.name)}
                        </p>
                    </div>
                )
            )}
            </div>
        </div>
    )
}