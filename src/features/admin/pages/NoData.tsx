import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InfoIcon
} from "lucide-react"

interface Props {
    header:string,
    description:string,
    addBtn:boolean,
    btnName:string,
    btnClick: ()=>void
}

export function NoDataPage({header, description, addBtn, btnName, btnClick, }:Props) {
  return (
    <div className="w-full flex justify-center">
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <InfoIcon/>
                </EmptyMedia>
                <EmptyTitle>{header}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
            {addBtn?
            <EmptyContent>
                <Button onClick={btnClick}>{btnName}</Button>
            </EmptyContent>
            :
            <></>
            }
        </Empty>
    </div>
  )
}
