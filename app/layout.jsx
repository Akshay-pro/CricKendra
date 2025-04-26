import localFont from "next/font/local";
import "./globals.css";
import { NextThemeProvider } from "./utils/theme-provider";
import { cn } from "../lib/utils";
import { Providers } from "./Provider";
import { Roboto } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-roboto',
  });
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "CricKendra",
    description: "Cricked Based Stats Engine",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${roboto.variable} antialiased !bg-white dark:bg-gradient-to-b bg-no-repeat dark:from-gray-900 dark:to-black duration-300`
                )}
            >
                <Providers>
                    <NextThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        {children}    
                        <Toaster />
                    </NextThemeProvider>
                </Providers>
            </body>
        </html>
    );
}
