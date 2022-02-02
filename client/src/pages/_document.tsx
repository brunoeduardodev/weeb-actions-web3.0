import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap"
            rel="stylesheet"
          />

          <meta property="og:title" content="Weeb Blockchain" />
          <meta property="og:site_name" content="Weeb Blockchain" />
          <meta
            property="og:url"
            content="https://weeb-actions-web3-0.vercel.app/"
          />
          <meta
            property="og:description"
            content="Make your friends get memed by sending them ethereum with low fees"
          />
          <meta property="og:description" content="" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://weeb-actions-web3-0.vercel.app/ogimage.jgp"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="Make your friends get memed by sending them ethereum with low fees"
          />
          <meta name="twitter:title" content="Weeb Blockchain" />
          <meta
            name="twitter:image"
            content="https://weeb-actions-web3-0.vercel.app/ogimage.jgp"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
