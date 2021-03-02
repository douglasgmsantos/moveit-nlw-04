import { useContext, useEffect } from 'react';
import { AiOutlineGoogle, AiOutlineLoading } from 'react-icons/ai';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { AuthContext } from '../../contexts/AuthContext';

import styles from '../../styles/components/Login.module.css';
import LoadingContainer from '../../components/LoadingContainer';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (Boolean(session))
      router.replace("/exercicios");
  }, [session])

  return (
    loading ?
      <LoadingContainer />
      :
      (<div className={styles.loginContainer}>
        <img className={styles.logoBox} src="logo-box.png" alt="Logo Box" />
        <div>
          <img className="logo-moveit" src="logo-moveit.png" alt="Move.it" />
          <h1>Bem-vindo</h1>
          <div className={styles.github}>
            <AiOutlineGoogle size={50} color={"#FFF"} />
            <p>Faça login com seu Google para começar.</p>
          </div>
          <div className={styles.loginFooter}>
            <button type="button" onClick={signIn} disabled={loading}>
              {
                loading ?
                  <AiOutlineLoading size={30} color={"#FFF"} /> :
                  <p>Fazer login com o Google</p>
              }
            </button>
          </div>
        </div>
      </div>)
  )
}

export default Login;