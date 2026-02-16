import { Spinner } from "@/components/ui/spinner"
import { useGetPendingApproval, useRejectPaymentIntent, useApprovePaymentIntent } from "../hooks/useIntent"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import {motion, AnimatePresence} from "framer-motion"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item"


export default function ReviewPayment() {
  const { data, isLoading } = useGetPendingApproval()

  const [activeIntent, setActiveIntent] = useState<any | null>(null)

  const approveMutation = useApprovePaymentIntent()
  const rejectMutation = useRejectPaymentIntent()

  useEffect(() => {
    document.body.style.overflow = activeIntent ? "hidden" : ""
  }, [activeIntent])

  if (isLoading) return <Spinner />

  
  return (
    <>
      <div className="flex justify-center py-6">
        <Carousel className="w-[80%]">
          <CarouselContent>
            {data?.map((intent: any) => (
              <CarouselItem key={intent.id}>
                <Item >
                  <ItemHeader>
                    <div>
                    <ItemTitle>Payment #{intent.id}</ItemTitle>
                    <p className="text-start">Total: ₱{intent.total_price}</p>
                    </div>
                  </ItemHeader>

                  <ItemContent className="space-y-4">
                    <div
                      onClick={() => setActiveIntent(intent)}
                      className="w-full max-h-[65vh] flex justify-center items-center bg-black/5 rounded-md overflow-hidden cursor-zoom-in"
                    >
                      <img
                        src={intent.proof_image_url}
                        alt="Payment proof"
                        className="max-h-[65vh] w-auto object-contain"
                      />
                    </div>

                    {intent.items.map((item: any, i: number) => (
                      <div key={i}>
                        <p>{item.inventory.name}</p>
                        <p>{item.inventory.variations[0].condition}</p>
                        <p>₱{item.inventory.variations[0].price}</p>
                       
                      </div>
                    ))}

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => rejectMutation.mutate(intent.id)}
                      >
                        Reject
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => approveMutation.mutate(intent.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </ItemContent>
                </Item>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <AnimatePresence>
        {activeIntent && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 overflow-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIntent(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col"
            >
              <div className="flex justify-end p-2 text-white">
                <button onClick={() => setActiveIntent(null)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <img
                  src={activeIntent.proof_image_url}
                  className="h-full w-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
