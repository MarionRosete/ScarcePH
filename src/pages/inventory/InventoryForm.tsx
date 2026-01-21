const IMG_DIR = "https://marionrosete.github.io/ScarcePH/public/static/"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

import {
  FieldDescription,
} from "@/components/ui/field"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { InventoryData } from "@/types/variations"
import ImagePicker from "../component/ImagePicker"

type InventoryFormProps = {
  value: InventoryData
  onSubmit: (data: InventoryData) => void
}

export function InventoryForm({ value, onSubmit }: InventoryFormProps) {
  const [form, setForm] = useState(value)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }
  console.log(form.image);
  

  return (
    <div className="grid gap-4">
        <ImagePicker
            initialImage={form.file ? URL.createObjectURL(form.file) : form.image}
            setImage={(event) => setForm(v => ({ ...v, file: event }))}
        />
        <div className="grid gap-2">
            <Label className="text-xs">Name</Label>
            <Input
            className="text-xs h-8"
            value={form.name}
            onChange={e =>
                setForm(v => ({ ...v, name: e.target.value }))
            }
            />
        </div>

        <div className="grid gap-2">
            <Label className="text-xs">Description</Label>
            <Textarea
            className="text-xs resize-none"
            value={form.description}
            onChange={e =>
                setForm(v => ({ ...v, description: e.target.value }))
            }
            />
        </div>

        <div className="grid gap-2">
            <Label className="text-xs">Image</Label>
            <Input
            className="text-xs h-8"
            placeholder="OG.PNG"
            onChange={e =>
                setForm(v => ({
                ...v,
                image: IMG_DIR + e.target.value,
                }))
            }
            />
            <FieldDescription className="text-xs">
            Use image name from public/static
            </FieldDescription>
        </div>

        <Button
            size="sm"
            variant="outline"
            disabled={loading || !form.name}
            onClick={submit}
        >
            Next <ChevronRight />
        </Button>
    </div>
  )
}
