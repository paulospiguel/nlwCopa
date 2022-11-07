import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Highlight,
  HStack,
  Input,
  Stack,
  Text,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";

import Image from "next/image";
import type { GetServerSideProps } from "next";

import appNlwCopaPreview from "~/assets/app-nlw-copa-preview.png";
import logo from "~/assets/logo.svg";
import checkIconImage from "~/assets/check-icon.svg";
import usersAvatarGroup from "~/assets/users-avatar.png";

import api from "~/services/api";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { z, ZodError } from "zod";
import { useNotify } from "~/hook/useNotify";

interface HomeProps {
  data: { poolCount: number; guessCount: number; userCount: number };
}

export default function Home({ data }: HomeProps) {
  const [title, setTitle] = useState("");
  const [infoData, setInfoData] = useState({
    ...data,
  });

  const notify = useNotify();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const schema = z.object({
        title: z.string().min(3, { message: "Titulo do bolão muito curto." }),
      });

      const inputData = schema.parse({ title });

      await api.post("/polls", inputData);

      notify({
        title: "Bolão criado com sucesso!",
      });

      setInfoData((state) => ({ ...state, poolCount: state.poolCount++ }));

      setTitle("");
    } catch (error: ZodError | any) {
      let message = "";

      if (typeof error === "object") {
        if (error["issues"]) {
          message = error["issues"][0]?.message;
        }
      }

      notify({
        title: "Erro ao criar bolão!",
        description: message,
        status: "error",
      });
    }
  };

  return (
    <Stack
      h="100vh"
      w="full"
      bg="gray.900"
      bgImage={`url(/assets/app-bg.png)`}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Grid
        maxW="1124px"
        h="full"
        mx="auto"
        templateColumns="repeat(2, 1fr)"
        alignItems="center"
        gap={28}
      >
        <Box as="main">
          <Image src={logo} alt="Logotipo da aplicação NLW Copa em amarelo" />

          <Heading
            as="h1"
            fontWeight="bold"
            mt="14"
            fontSize="5xl"
            letterSpacing="tight"
          >
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </Heading>

          <Flex
            mt="10"
            gap={2}
            alignItems="center"
            textColor="gray.100"
            fontSize="xl"
          >
            <Image src={usersAvatarGroup} alt="" />

            <Highlight
              query={[infoData?.userCount?.toString()]}
              styles={{
                fontWeight: "bold",
                textColor: "green.500",
              }}
            >
              {`+${infoData?.userCount} pessoas já estão usando`}
            </Highlight>
          </Flex>

          <HStack
            as="form"
            mt={10}
            display="flex"
            spacing={2}
            onSubmit={handleSubmit}
          >
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Qual o nome do seu bolão?"
              type="text"
              flex={1}
              px={6}
              py={4}
              rounded="md"
              borderColor="gray.600"
              bg="gray.800"
              fontSize="sm"
            />

            <Button
              type="submit"
              name="action"
              value="create"
              px={6}
              py={4}
              rounded="md"
              bg="yellow.500"
              textColor="gray.900"
              fontWeight="bold"
              fontSize="sm"
              textTransform="uppercase"
              _hover={{
                bg: "yellow.600",
              }}
            >
              Criar meu bolão
            </Button>
          </HStack>

          <Text textColor="gray.300" mt={4} fontSize="sm" letterSpacing="wider">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </Text>

          <Flex
            mt="10"
            pt="10"
            borderTop="2px"
            borderColor="gray.600"
            justifyContent="space-between"
          >
            <HStack spacing={6}>
              <Image src={checkIconImage} alt="" />
              <VStack alignItems="start" fontWeight="bold" spacing={0}>
                <Text fontSize="2xl">+{infoData?.poolCount}</Text>
                <Text>Bolões criados</Text>
              </VStack>
            </HStack>
            <Divider orientation="vertical" height="auto" />
            <HStack spacing={6}>
              <Image src={checkIconImage} alt="" />
              <VStack alignItems="start" fontWeight="bold" spacing={0}>
                <Text fontSize="2xl">+{infoData?.guessCount}</Text>
                <Text>Palpites enviados</Text>
              </VStack>
            </HStack>
          </Flex>
        </Box>
        <Image
          src={appNlwCopaPreview}
          alt="Imagem de dois telefones com o a pre visualização do aplicativo"
        />
      </Grid>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("/polls/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      data: {
        poolCount: poolCountResponse.data.count,
        guessCount: guessCountResponse.data.count,
        userCount: userCountResponse.data.count,
      },
    },
  };
};
