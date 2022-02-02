import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Transactions from "../components/Transactions";
import Welcome from "../components/Welcome";

const Home: NextPage = () => {
  return (
    <div className="bg-stone-900  min-h-screen">
      <Head>
        <title>Weeb Blockchain</title>
        <meta name="description" content="Weeb Blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Welcome />
      <Transactions />
      <Footer />
    </div>
  );
};

export default Home;
