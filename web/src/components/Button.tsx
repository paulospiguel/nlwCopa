import { Button as ChakraButton, ButtonProps, Text } from "@chakra-ui/react";

interface Props extends ButtonProps {
  title: string;
  schema?: "PRIMARY" | "SECONDARY";
}

export function Button({ title, schema = "PRIMARY", ...rest }: Props) {
  return (
    <ChakraButton
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={schema === "SECONDARY" ? "red.500" : "yellow.500"}
      _hover={{
        bg: schema === "SECONDARY" ? "red.400" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={schema === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ChakraButton>
  );
}
