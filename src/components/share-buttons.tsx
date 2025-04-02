"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

interface ShareButtonsProps {
  articleId: string
  articleTitle: string
  isCompact?: boolean
}

export function ShareButtons({ articleId, articleTitle }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  function getShareUrl(id: string): string {
    return `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/news/${id}`
  }
  
  const handleCopyLink = () => {
    const url = getShareUrl(articleId)
    navigator.clipboard.writeText(url)
    setCopied(true)
    alert(`Link copied: ${articleTitle}`)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="rounded-full bg-white/90 hover:bg-white backdrop-blur-sm text-black" asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full shadow-sm backdrop-blur-sm"
            onClick={handleCopyLink}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-black p-2 bg-white rounded-md shadow-sm backdrop-blur-sm m-2">{copied ? "Link copied!" : "Copy link"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}