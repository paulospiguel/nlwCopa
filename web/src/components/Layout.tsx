import { VStack } from "native-base";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <VStack flex={1} bg="gray.900">
      {children}
    </VStack>
  );
}
