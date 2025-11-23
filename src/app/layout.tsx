import React from 'react';

// This is the root layout for the redirecting page at src/app/page.tsx.
// It is required by Next.js but does not need any content as the page redirects immediately.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
