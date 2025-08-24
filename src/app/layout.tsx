import { ToastContainer } from "react-toastify";
import ReduxProviderWrapper from "./components/ReduxProviderWrapper";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-gray-200">
        <ReduxProviderWrapper>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
