import { createContext, ReactNode, useCallback, FormEvent, useState } from "react";

import Cookies from "js-cookie";
import { Provider } from 'next-auth/client'
import {
  signOut as handleLogout,
  signIn as handleLogin
} from 'next-auth/client';


interface IAuthProvider {
  children: ReactNode,
  pageProps: any;
}

interface IAuthContextData {
  signIn: (event: FormEvent) => void,
  signOut: (event: FormEvent) => void,
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ pageProps, children }: IAuthProvider) => {

  const signIn = useCallback((event: FormEvent) => {
    event.preventDefault();
    handleLogin('google', { callbackUrl: "https://moveit-dg-3v2pr6h44-douglasgmsantos.vercel.app" })
      .then(response => {
        Cookies.set("authenticated", "true");
      });
  }, [])

  const signOut = useCallback((event: FormEvent) => {
    event.preventDefault();
    handleLogout({ callbackUrl: "https://moveit-dg-3v2pr6h44-douglasgmsantos.vercel.app/execicios" })
      .then(response => {
        Cookies.remove("authenticated");
      });;
  }, [])

  return (
    <Provider session={pageProps.session}>
      <AuthContext.Provider value={{ signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </Provider>
  )
}