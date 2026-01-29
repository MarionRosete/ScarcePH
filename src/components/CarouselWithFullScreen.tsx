import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { X, ChevronLeft, ChevronRight } from "lucide-react"


type Props = {
  images: string[]
}

export default function CarouselWithFullScreen({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = zoomOpen ? "hidden" : ""
  }, [zoomOpen])

  useEffect(() => {
    if (!zoomOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false)
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [zoomOpen, currentIndex])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="shrink-0 flex justify-center py-2">
        <Carousel className="w-full max-w-[140px] md:max-w-[220px]">
          <CarouselContent
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            className="transition-transform duration-300"
          >
            {images.map((img, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <div className="w-full aspect-square max-h-[160px] md:max-h-[260px] flex items-center justify-center">
                  <img
                    src={img}
                    alt="Preview"
                    onClick={() => setZoomOpen(true)}
                    className="h-full w-full object-contain rounded-md cursor-zoom-in"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious onClick={prev} />
              <CarouselNext onClick={next} />
            </>
          )}
        </Carousel>
      </div>

      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-background rounded-lg p-4
                         max-w-[90vw] max-h-[85vh]
                         md:max-w-[800px] md:max-h-[600px]
                         flex flex-col items-center"
            >
              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-sm">
                  {currentIndex + 1} / {images.length}
                </span>

                <button onClick={() => setZoomOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                <img
                  src={images[currentIndex]}
                  alt="Zoomed"
                  className="max-w-full max-h-full object-contain rounded-md"
                />
              </div>

              {images.length > 1 && (
                <div className="w-full flex justify-between mt-3">
                  <button onClick={prev} className="p-2">
                    <ChevronLeft className="w-8 h-8" />
                  </button>

                  <button onClick={next} className="p-2">
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
