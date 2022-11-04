import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Highlight,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import api from "~/services/api";
import appNlwCopaPreview from "~/assets/app-nlw-copa-preview.png";
import logo from "~/assets/logo.svg";
import checkIconImage from "~/assets/check-icon.svg";
import usersAvatarGroup from "~/assets/users-avatar.png";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { redirect, json } from "@remix-run/node";
import { createFormAction, createForm } from "remix-forms";
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useTransition as useNavigation,
  useLoaderData,
} from "@remix-run/react";

const formAction = createFormAction({ redirect, json });
const Form = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

type PoolType = {
  poolCount: number;
  guessCount: number;
  userCount: number;
};

export async function loader() {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("/pools/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    poolCount: poolCountResponse.data.count,
    guessCount: guessCountResponse.data.count,
    userCount: userCountResponse.data.count,
  };
}

const schema = z.object({
  title: z.string().min(3, { message: "Titulo do bolão muito curto." }),
});

const ErroSchema = z.record(schema.keyof(), z.array(z.string()));

type ActionDataResponse = {
  errors: z.infer<typeof ErroSchema>;
  values: z.infer<typeof schema>;
};

const mutation = makeDomainFunction(schema)(async (inputValues) => {
  await api.post("/pools", inputValues);

  return inputValues;
});

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: ".",
  });

export default function Home() {
  const [errors, setErrors] = useState<z.infer<typeof ErroSchema> | null>(null);
  const data: PoolType = useLoaderData();

  const inputData = useActionData<ActionDataResponse>();

  useMemo(() => {
    setErrors(() => {
      if (!inputData?.errors) return null;
      return inputData?.errors;
    });
  }, [inputData?.errors]);

  return (
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
            query={[data?.userCount?.toString()]}
            styles={{
              fontWeight: "bold",
              textColor: "green.500",
            }}
          >
            {`+${data.userCount} pessoas já estão usando`}
          </Highlight>
        </Flex>

        <Form schema={schema}>
          {({ Field, register }) => {
            return (
              <>
                <HStack mt={10} display="flex" spacing={2}>
                  <Field name="title">
                    {({ Error }) => (
                      <>
                        <Input
                          {...register("title")}
                          placeholder="Qual o nome do seu bolão?"
                          required
                          type="text"
                          flex={1}
                          px={6}
                          py={4}
                          rounded="md"
                          borderColor="gray.600"
                          bg="gray.800"
                          fontSize="sm"
                        />
                        {/* <Error /> */}
                      </>
                    )}
                  </Field>
                  <Button
                    type="submit"
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
                {/* <Errors /> */}
                {errors &&
                  Object.entries(errors).map(([key, values]) => (
                    <Text mt={2} textColor="red.500" key={key}>
                      {values.join(" * ")}
                    </Text>
                  ))}
              </>
            );
          }}
        </Form>

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
              <Text fontSize="2xl">+{data.poolCount}</Text>
              <Text>Bolões criados</Text>
            </VStack>
          </HStack>
          <Divider orientation="vertical" height="auto" />
          <HStack spacing={6}>
            <Image src={checkIconImage} alt="" />
            <VStack alignItems="start" fontWeight="bold" spacing={0}>
              <Text fontSize="2xl">+{data.guessCount}</Text>
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
  );
}
