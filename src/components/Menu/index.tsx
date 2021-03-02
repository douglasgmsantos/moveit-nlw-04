import React, { useState, useContext } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

import { BiHome, BiLogOut, BiMedal, BiLoaderCircle } from "react-icons/bi";
import styles from '../../styles/components/Menu.module.css';
import { AuthContext } from '../../contexts/AuthContext';

interface ILinks {
  hrefText: string;
  Icon: string;
}

const Menu = () => {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();
  const [links, _] = useState([
    {
      hrefText: "/exercicios",
      Icon: BiHome
    },
    {
      hrefText: "/melhores",
      Icon: BiMedal
    }
  ])


  return (
    <div className={styles.containerMenu}>
      <button>
        <img src="logo.png" alt="Move.it" />
      </button>
      <div className={styles.containerPage}>
        {links.map(({ hrefText, Icon }: ILinks) => {
          return (
            <Link key={hrefText} href={hrefText} >
              <button className={router.pathname === hrefText ? styles.active : ""}>
                <Icon />
              </button>
            </Link>
          )
        })}
      </div>
      <div>
        <button onClick={(e) => !loading && signOut(e)} disabled={loading}>
          {loading ? <BiLoaderCircle /> : <BiLogOut />}
        </button>
      </div>
    </div>
  )
}

export default Menu;