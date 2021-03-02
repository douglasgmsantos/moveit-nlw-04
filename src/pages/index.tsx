import Login from "./login";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const Home = () => {
  const router = useRouter();
  const [session, _] = useSession();

  if (Boolean(session))
    router.replace("/exercicios")

  return <Login />
}

export default Home;