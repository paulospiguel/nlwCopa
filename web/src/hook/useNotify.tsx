import { useToast, ToastProps } from "@chakra-ui/react";

export const useNotify = () => {
  const toast = useToast();

  return ({ ...props }: ToastProps) =>
    toast({
      duration: 9000,
      isClosable: true,
      status: "info",
      position: "top",
      ...props,
    });
};
