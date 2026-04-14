import "./globals.css";

export const metadata = {
  title: "Vantage Select — Bid Evaluation Tool",
  description: "Professional bid evaluation and comparison tool for renewable energy projects. Compare bidders, score proposals, and generate recommendation reports.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-navy-50">{children}</body>
    </html>
  );
}
