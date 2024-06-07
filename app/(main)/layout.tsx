import Navbar from "../components/Navbar/Navbar";
import "../globals.css";
import "../globalsExtend.scss";
import ReduxProvider from "../reduxProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
