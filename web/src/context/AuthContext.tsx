import React, { createContext, useEffect, useState } from "react";

// import * as Google from "expo-auth-session/providers/google";
// import * as AuthSession from "expo-auth-session";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [user, setUser] = useState({
    name: "Paulo",
    avatarUrl: "https://www.github.com/paulospiguel.png",
  } as UserProps);

  //const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: String(process.env.GOOGLE_CLIENT_ID),
  //   redirectUri,
  //   scopes: ["email", "profile"],
  // });

  const signIn = async () => {
    try {
      setIsUserLoading(true);
      //await promptAsync();
    } catch (error) {
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signInWithGoogle = async (accessToken: string) => {
    console.log("token", accessToken);
  };

  // useEffect(() => {
  //   if (
  //     response &&
  //     response?.type === "success" &&
  //     response?.authentication?.accessToken
  //   ) {
  //     signInWithGoogle(response.authentication.accessToken);
  //   }
  // }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
