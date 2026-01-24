import { useQuery } from "@tanstack/react-query";
import { getAllAvailPairs } from "../api";
import type { PairObj } from "@/types/pair";


export const useGetPairs = () => {
    return useQuery<PairObj[]>({
        queryKey:['get-available-pairs'],
        queryFn: getAllAvailPairs
    })
}