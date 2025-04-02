"use server"
import { Article } from "./types"
import newsData from '../data/news.json'

async function writeNewsFile(data: { articles: Article[] }) {
  const fs = await import('fs/promises')
  const path = await import('path')
  const dataFilePath = path.join(process.cwd(), 'src/data/news.json')
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function getArticles() {
  return newsData.articles
}

export async function getArticleById(id: string) {
  return newsData.articles.find(article => article.id === id)
}

export async function addArticle(article: Omit<Article, "id" | "date">) {
  const newArticle = {
    ...article,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    imageUrl: article.imageUrl || "" // Ensure imageUrl is always a string
  }
  
  newsData.articles.unshift(newArticle)
  await writeNewsFile(newsData)
  return newArticle
}

export async function deleteArticle(id: string) {
  newsData.articles = newsData.articles.filter(article => article.id !== id)
  await writeNewsFile(newsData)
}

export async function updateArticle(id: string, updates: Partial<Omit<Article, "id" | "date">>) {
  newsData.articles = newsData.articles.map(article => 
    article.id === id ? { ...article, ...updates } : article
  )
  await writeNewsFile(newsData)
} 