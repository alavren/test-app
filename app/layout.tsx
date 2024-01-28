import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ChakraProvider, Container } from '@chakra-ui/react';
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Lorem ipsum dolor sit amet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <NavBar />
          <Container
            py={4}
            style={{
              position: 'relative',
              height: 'calc(100dvh - 120px)',
              overflowY: 'auto',
            }}
          >
            {children}
          </Container>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
