"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Article } from "@/lib/types"
import { Plus, LogOut, Trash2, Loader2 } from "lucide-react"
import Cookies from "js-cookie"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [newArticle, setNewArticle] = useState({ title: '', description: '', content: '', imageUrl: '' })
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check if the user is logged in
        if (Cookies.get('isAdmin') !== 'true') {
            router.push('/admin/login')
            return
        }

        async function fetchArticles() {
            try {
                const response = await fetch('/api/articles')
                const data = await response.json()
                setArticles(data)
            } catch (error) {
                console.error('Error fetching articles:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchArticles()
    }, [router])

    const handleLogout = () => {
        Cookies.remove('isAdmin')
        router.push('/')
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch('/api/articles', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
            setArticles((prevArticles) => prevArticles.filter(article => article.id !== id))
        } catch (error) {
            console.error('Error deleting article:', error)
        }
    }

    const handleNewArticleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setNewArticle(prev => ({ ...prev, [name]: value }))
    }

    const handleCreateArticle = async () => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            })
            const createdArticle = await response.json()
            setArticles(prevArticles => [...prevArticles, createdArticle])
            setNewArticle({ title: '', description: '', content: '', imageUrl: '' })
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Error creating article:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container py-10 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage your news articles</p>
                </div>
                <div className="flex gap-3">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex cursor-pointer items-center gap-2" variant={"default"}>
                                <Plus className="h-4 w-4" />
                                New Article
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                                <DialogTitle>Create New Article</DialogTitle>
                                <DialogDescription>Fill in the details to publish a new article.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={newArticle.title}
                                        onChange={handleNewArticleChange}
                                        placeholder="Enter article title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={newArticle.description}
                                        onChange={handleNewArticleChange}
                                        placeholder="Brief summary of the article"
                                        className="resize-none h-24"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={newArticle.content}
                                        onChange={handleNewArticleChange}
                                        placeholder="Full article content"
                                        className="resize-none h-32"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl">Image URL</Label>
                                    <Input
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={newArticle.imageUrl}
                                        onChange={handleNewArticleChange}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateArticle} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Article'
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>

            <Card className="shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle>Articles</CardTitle>
                    <CardDescription>Manage your published news articles</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-12 border rounded-md bg-muted/40">
                            <h3 className="font-medium text-lg mb-2">No articles yet</h3>
                            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Create your first article to start sharing news with your readers.</p>
                            <Button onClick={() => setIsDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create your first article
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Title</TableHead>
                                    <TableHead className="w-[300px]">Description</TableHead>
                                    <TableHead className="w-[180px]">Date</TableHead>
                                    <TableHead className="w-[100px]">Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.map((article) => (
                                    <TableRow key={article.id}>
                                        <TableCell className="font-medium">{article.title}</TableCell>
                                        <TableCell className="font-medium w-min text-wrap">{article.description}</TableCell>
                                        <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                                Published
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:text-red-600 cursor-pointer hover:bg-red-50"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}