import { Stack } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";

// import { Container } from './styles';

export default function Home() {
  return (
    <Stack
      h="full"
      w="full"
      bg="gray.900"
      bgImage="url(/assets/app-bg.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Outlet />
    </Stack>
  );
}
