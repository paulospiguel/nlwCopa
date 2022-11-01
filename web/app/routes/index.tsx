import { Center, Heading, Image, VStack } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import api from "~/services/api";

type PoolType = {
  count: number;
};

export async function loader() {
  const pools = await api.get("/pools/count");

  return pools.data;
}

export default function Index() {
  const pools: PoolType = useLoaderData();

  return (
    <Center flex={1} bg="black" h="full">
      <VStack>
        <Image
          src="/assets/nlwCopa.svg"
          alt="Logotipo da aplicação NLW Copa em amarelo"
        />
        <Heading>NLW Copa 2022</Heading>
        count: {pools.count}
      </VStack>
    </Center>
  );
}
