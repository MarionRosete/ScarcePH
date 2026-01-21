import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Camera, ImageIcon } from "lucide-react"

type Props = {
  initialImage?: string
  setImage: (file:File) => void
}


export default function ImagePicker({ initialImage, setImage }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(initialImage)

  const handleClick = () => {
    fileRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)
    setImage(file)
  }

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer rounded-md hover:opacity-80"
    >
      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
      {!preview && 
        <div className="flex flex-col items-center text-muted-foreground">
          <ImageIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Upload photo</span>
        </div>
      }
      {preview && 
        <>
            <img
                src={preview}
                className="w-25 md:w-50 rounded-sm object-fit"
                alt="Preview"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera className="text-white w-6 h-6" />
            </div>
        </>
      }
      
    </div>
  )
}
