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
    handleLogin('google', { callbackUrl: process.env.NEXTAUTH_URL_CALLBACK })
      .then(response => {
        Cookies.set("authenticated", "true");
      });
  }, [])

  const signOut = useCallback((event: FormEvent) => {
    event.preventDefault();
    handleLogout({ callbackUrl: process.env.NEXTAUTH_URL })
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