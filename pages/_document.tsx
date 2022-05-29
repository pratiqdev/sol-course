import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script'

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        {/* <Script src="../utils/browser-solc.js" type="text/javascript" /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}