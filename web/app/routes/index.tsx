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
    <div>
      <img src="/assets/nlwCopa.svg" alt="Logotipo da aplicação NLW Copa em amarelo" />
      <h1>NLW Copa 2022</h1>
      count: {pools.count}
    </div>
  );
}
