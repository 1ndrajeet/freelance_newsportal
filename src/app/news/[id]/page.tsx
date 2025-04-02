// app/news/[id]/page.tsx
import { getArticleById } from "@/lib/articles"
import ArticleClient from "./ArticleClient"
import { notFound } from "next/navigation"

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageParams) {
  try {
    // Await the params first
    const resolvedParams = await params;
    const articleId = resolvedParams.id;
    
    // Now use the resolved ID to fetch the article
    const article = await getArticleById(articleId);
    
    if (!article) {
      notFound();
    }
    
    return <ArticleClient article={article} />;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    notFound();
  }
}