import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiMenu2Line } from 'react-icons/ri';

import styles from '../scss/primeFolder.module.scss';

const MenuIcon = React.memo(RiMenu2Line);

const PrimeFolder = () => {
  const location = useLocation();
  const pathId = location.pathname.split('/')[1];

  return (
    <div className={styles.root}>
      <Link className={!pathId ? styles.active : ''} to={'/'}>
        <MenuIcon />
        <span>Все задачи</span>
      </Link>
    </div>
  );
};

export default React.memo(PrimeFolder);
