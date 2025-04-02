// app/news/[id]/ArticleClient.tsx
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarIcon, ArrowLeft } from "lucide-react"

interface Article {
  title: string;
  date: string;
  imageUrl?: string;
  content: string;
}

interface ArticleClientProps {
  article: Article;
}

export default function ArticleClient({ article }: ArticleClientProps) {
  return (
    <div className="container mx-auto py-8 bg-white text-black">
      <Link href="/">
        <Button variant="ghost" className="mb-6 pl-0 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center text-gray-600 mb-8">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {new Date(article.date).toLocaleDateString()}
        </div>
        
        {article.imageUrl && (
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg mb-8">
            <img
              src={article.imageUrl} 
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed">{article.content}</p>
        </div>
      </article>
    </div>
  )
}