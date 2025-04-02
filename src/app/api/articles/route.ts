import { NextRequest, NextResponse } from 'next/server'
import { Article } from '@/lib/types'
import fs from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'

const dataFilePath = path.join(process.cwd(), 'src/data/news.json')

async function readNewsFile() {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8')
  return JSON.parse(fileContent)
}

async function writeNewsFile(data: { articles: Article[] }) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const data = await readNewsFile()
    return NextResponse.json(data.articles, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await readNewsFile()
    const body = await req.json()
    const newArticle: Article = {
      ...body,
      id: randomBytes(16).toString('hex'), // Generate a random string for the id
      date: new Date().toISOString(),
      imageUrl: body.imageUrl || '', // Ensure imageUrl is a string
    }
    data.articles.push(newArticle)
    await writeNewsFile(data)
    return NextResponse.json(newArticle, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await readNewsFile()
    const body = await req.json()
    const index = data.articles.findIndex((article: Article) => article.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    data.articles[index] = { ...data.articles[index], ...body }
    await writeNewsFile(data)
    return NextResponse.json(data.articles[index], { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await readNewsFile()
    const body = await req.json()
    data.articles = data.articles.filter((article: Article) => article.id !== body.id)
    await writeNewsFile(data)
    return NextResponse.json(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}