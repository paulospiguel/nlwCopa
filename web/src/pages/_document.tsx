import React from "react";

import Document, {
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { THEME } from "../styles/theme";
import { ColorModeScript, Stack } from "@chakra-ui/react";

class MyDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <ColorModeScript initialColorMode={THEME.config.initialColorMode} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
