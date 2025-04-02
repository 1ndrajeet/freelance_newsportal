// This is your main page.tsx - a server component
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getArticles } from "@/lib/articles"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShareButtons } from "@/components/share-buttons"

interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export default async function Home() {
  const articles: Article[] = await getArticles()

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero section with featured article */}
      {articles.length > 0 && (
        <div className="pt-10 pb-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <Badge variant="outline" className="bg-primary/10 text-black border-primary/20 px-3 py-1">
                <TrendingUp className="mr-1 h-3 w-3" />
                Featured
              </Badge>

              <ShareButtons articleId={articles[0].id} articleTitle={articles[0].title} />
            </div>

            <Link href={`/news/${articles[0].id}`} className="group">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4 text-black group-hover:text-blue-800 transition-colors">
                    {articles[0].title}
                  </h1>
                  <p className="text-black/70 text-lg mb-6">
                    {articles[0].description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-black/70 mb-6">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(articles[0].date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      5 min read
                    </div>

                  </div>
                  <div className="flex items-center gap-3">
                    <Button asChild className="group-hover:translate-x-1 text-white bg-black hover:bg-black/90 transition-all px-6">
                      <Link href={`/news/${articles[0].id}`}>
                        Read article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                  <img
                    src={articles[0].imageUrl || "https://picsum.photos/800/400?random=8"}
                    alt={articles[0].title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-700"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Latest articles section */}
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Latest News</h2>
            <p className="text-black/70">Stay updated with the most recent stories</p>
          </div>

        </div>

        <Separator className="mb-8" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(1).map((article: Article) => (
            <Card key={article.id} className="h-full overflow-hidden hover:shadow-lg transition-all border-gray-200 group relative">
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={article.imageUrl || "https://picsum.photos/800/400?random=8"}
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <ShareButtons articleId={article.id} articleTitle={article.title} isCompact />

                </div>
              </div>
              <Link href={`/news/${article.id}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-black/70 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>

                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-800 transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/70 line-clamp-3">
                    {article.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="text-sm text-black font-medium flex items-center hover:text-blue-800 transition-colors">
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>


      </div>


    </div>
  )
}