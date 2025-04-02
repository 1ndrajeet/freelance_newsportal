import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "News Portal",
  description: "A modern news portal built with Next.js and shadcn/ui",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <span className="font-bold text-xl">NewsPortal</span>
                </Link>

                <div className="ml-auto flex items-center space-x-4">
                  <Link href="/admin/login">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            {/* Footer */}
            <footer className=" pt-12 border-t">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">News Platform</h3>
                    <p className=" mb-4">Delivering the latest and most important news stories with accuracy and integrity.</p>
                    <div className="flex gap-4">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Categories</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className=" transition-colors">World</a></li>
                      <li><a href="#" className=" transition-colors">Technology</a></li>
                      <li><a href="#" className=" transition-colors">Business</a></li>
                      <li><a href="#" className=" transition-colors">Science</a></li>
                      <li><a href="#" className=" transition-colors">Health</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className=" transition-colors">About Us</a></li>
                      <li><a href="#" className=" transition-colors">Contact</a></li>
                      <li><a href="#" className=" transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className=" transition-colors">Terms of Service</a></li>
                    </ul>
                  </div>
                </div>
                <Separator className="my-8" />
                <div className="text-center  text-sm">
                  © {new Date().getFullYear()} News Platform. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 