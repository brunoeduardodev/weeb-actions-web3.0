import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TransactionProvider } from "../contexts/TransactionContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer theme="dark" />

      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </>
  );
}

export default MyApp;
