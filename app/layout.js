import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feria",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
