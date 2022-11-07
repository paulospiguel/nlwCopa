import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { THEME } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={THEME}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
