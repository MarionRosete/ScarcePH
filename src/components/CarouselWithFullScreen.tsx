import { useEffect, useState, useRef } from "react"
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
  const [isPortrait, setIsPortrait] = useState(false)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = zoomOpen ? "hidden" : ""
  }, [zoomOpen])

  useEffect(() => {
    if (!zoomOpen) return

    const img = new Image()
    img.src = images[currentIndex]
    img.onload = () => {
      setIsPortrait(img.height > img.width)
    }
  }, [currentIndex, zoomOpen, images])

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

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current) return
    const diff = startX.current - e.changedTouches[0].clientX

    if (diff > 50) next()
    if (diff < -50) prev()

    startX.current = null
  }

  return (
    <>
      <div className="flex justify-center py-2">
        <Carousel className="w-full max-w-[200px]">
          <CarouselContent
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            className="transition-transform duration-300"
          >
            {images.map((img, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <div className="w-full max-h-[50vh] flex items-center justify-center">
                  <img
                    src={img}
                    alt="Preview"
                    onClick={() => {
                      setCurrentIndex(index)
                      setZoomOpen(true)
                    }}
                    className="max-h-[50vh] w-auto object-contain rounded-md cursor-zoom-in"
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
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
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
              className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex justify-between items-center p-3 text-white">
                <span>
                  {currentIndex + 1} / {images.length}
                </span>
                <button onClick={() => setZoomOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center overflow-hidden px-2">
                <img
                  src={images[currentIndex]}
                  alt="Zoomed"
                  className={
                    isPortrait
                      ? "h-full w-auto object-contain"
                      : "w-full h-auto object-contain"
                  }
                />
              </div>

              {images.length > 1 && (
                <div className="flex justify-between p-3 text-white">
                  <button onClick={prev}>
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button onClick={next}>
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
