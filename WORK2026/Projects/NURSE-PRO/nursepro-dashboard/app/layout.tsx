import SupabaseProvider from './supabase-provider';
import { PropsWithChildren } from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from './theme-provider';

export const dynamic = 'force-dynamic';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>NursePro · Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!--  Social tags   --> */}
        <meta
          name="keywords"
          content="enfermagem, plantão, calculadora médica, evolução, dicionário médico"
        />
        <meta name="description" content="Sistema operacional da nova enfermagem" />
        {/* <!-- Schema.org markup for Google+ --> */}
        <meta itemProp="name" content="NursePro" />
        <meta
          itemProp="description"
          content="Sistema operacional da nova enfermagem"
        />
        <meta
          itemProp="image"
          content="https://nurseprox.netlify.app/img/favicon.ico"
        />
        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="product" />
        <meta
          name="twitter:title"
          content="NursePro · Admin"
        />
        <meta
          name="twitter:description"
          content="Sistema operacional da nova enfermagem"
        />
        <meta
          name="twitter:image"
          content="https://nurseprox.netlify.app/img/favicon.ico"
        />
        {/* <!-- Open Graph data --> */}
        <meta
          property="og:title"
          content="NursePro · Admin"
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://nurseprox.netlify.app" />
        <meta
          property="og:image"
          content="https://nurseprox.netlify.app/img/favicon.ico"
        />
        <meta
          property="og:description"
          content="Sistema operacional da nova enfermagem"
        />
        <meta
          property="og:site_name"
          content="NursePro"
        />
        <link rel="canonical" href="https://nurseprox.netlify.app" />
        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body id={'root'} className="loading bg-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseProvider>
            <main id="skip">{children}</main>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
