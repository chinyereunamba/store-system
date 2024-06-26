import "../globals.css";
import { Inter, Poppins } from "next/font/google";
import Layout from "@/components/layout/Layout";
import Provider from "./providers";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Anol",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getServerSession();
  return (
    <Provider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </Provider>
  );
}
