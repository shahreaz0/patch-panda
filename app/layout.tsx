import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ThemeProvider } from "@/components/providers/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PatchPanda",
  description: "PatchPanda - The best place to find and manage your prs",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>{children}</Suspense>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
