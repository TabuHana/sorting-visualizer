import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SortingAlgorithmProvider } from '@/context/visualizer-context';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sorting Visualizer',
    description: 'Next.js Sorting Visualizer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='light'
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <SortingAlgorithmProvider>{children}</SortingAlgorithmProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
