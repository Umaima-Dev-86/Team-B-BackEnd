export const metadata = {
  title: 'InsightX Enterprise ERP System',
  description: 'Enterprise Grade Business Management Web Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0b0f19', fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}