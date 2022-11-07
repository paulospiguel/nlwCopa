import { Center, chakra, Icon, Stack, Text } from "@chakra-ui/react";
import { Button } from "~/components/Button";
import Logo from "~/assets/logo.svg";
//import { useAuth } from "../hooks/useAuth";

import { GoogleLogo } from "phosphor-react";

const GoogleIcon = chakra(GoogleLogo);

const SignIn = () => {
  //const { signIn } = useAuth();
  return (
    <Stack
      h="100vh"
      w="full"
      bg="gray.900"
      bgImage={`url(/assets/app-bg.png)`}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Center
        flex={1}
        p={7}
        display="flex"
        flexDir="column"
        maxW="2xl"
        mx="auto"
      >
        <Logo width={212} height={40} fill="red" />
        <Button
          color="white"
          title="Log In com o Goggle"
          schema="SECONDARY"
          maxW={{
            base: "full",
            lg: "min-content",
          }}
          h={12}
          mt={12}
          // onPress={signIn}
          leftIcon={<GoogleIcon color="white" h={8} w={8} />}
        />
        <Text color="white" textAlign="center" mt={4}>
          Não utilizamos nenhuma informação além {"\n"} do seu e-mail para
          criação de sua conta.
        </Text>
      </Center>
    </Stack>
  );
};

export default SignIn;
