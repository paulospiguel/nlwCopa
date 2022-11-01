import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const THEME = extendTheme({
  colors: {
    gray: {
      950: "#09090A",
      900: "#121214",
      800: "#202024",
      600: "#323238",
      300: "#8D8D99",
      200: "#C4C4CC",
    },
    green: {
      500: "#047C3F",
    },
    yellow: {
      500: "#F7DD43",
      600: "#BBA317",
    },
    red: {
      500: "#DB4437",
    },
    white: "#FFFFFF",
  },
  fonts: {
    heading: "'Roboto_700Bold', sans-serif;",
    body: "'Roboto_400Regular', sans-serif;",
    medium: "'Roboto_500Medium', sans-serif;",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56,
  },
  styles: {
    global: (props: any) => ({
      "html, body": {
        height: "full",
        width: "full",
        color: mode("gray.800", "whiteAlpha.900")(props),
        lineHeight: "tall",
      },
    }),
  },
});
