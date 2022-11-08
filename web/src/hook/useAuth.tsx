import { useContext } from "react";

import { AuthContext, AuthContextDataProps } from "../context/AuthContext";

export const useAuth = (): AuthContextDataProps => {
  const context = useContext(AuthContext);

  return context;
};
