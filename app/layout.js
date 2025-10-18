import './globals.css'

export const metadata = {
  title: 'AEO Tracker - AI Search Visibility Dashboard',
  description: 'Monitor your AI search visibility across major engines',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
