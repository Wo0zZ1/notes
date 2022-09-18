import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import Folder from './Folder';
import PrimeFolder from './PrimeFolder';
import Button from './Button';

import {
  toggleAddFolderPopupActive,
  toggleSidebarActive,
} from '../redux/reducers/todosSlice';

import useChekMobileScreen from '../hooks/useChekMobileScreen';

import styles from '../scss/sidebar.module.scss';

const PlusIcon = React.memo(AiOutlinePlus);

const DeleteIcon = React.memo(BsXLg);

const Sidebar = ({ active }) => {
  const dispatch = useDispatch();

  const sidebarActive = useSelector((state) => state.todos.sidebarActive); //

  const folders = useSelector((state) => state.todos.folders);

  //   React.useEffect(() => {
  //     const time = setTimeout(() => {
  //       dispatch(toggleSidebarActive());
  //     }, 5000);
  //     return () => {
  //       clearTimeout(time);
  //     };
  //   }, [sidebarActive]);

  const isMobile = useChekMobileScreen();

  const variant = isMobile ? (sidebarActive ? 'open' : 'close') : 'open';

  const ClickHandler = () => dispatch(toggleAddFolderPopupActive());

  const variants = {
    close: {
      left: '-100%',
    },
    open: {
      left: 0,
    },
  };

  return (
    <motion.div
      initial={variant}
      animate={variant}
      variants={variants}
      transition={{
        duration: 0.4,
        type: 'keyframes',
      }}
      className={styles.root}>
      {isMobile && (
        <button
          onClick={() => dispatch(toggleSidebarActive())}
          className={styles.close}>
          <DeleteIcon />
        </button>
      )}

      <PrimeFolder />

      <ul>
        {folders
          .filter((folder) => folder.toBeDeleted !== true)
          .map((folder) => {
            return (
              <li key={folder.id}>
                <Folder {...folder} />
              </li>
            );
          })}
      </ul>

      <Button
        Svg={PlusIcon}
        clickHandler={ClickHandler}
        title={'Добавить папку'}
      />
    </motion.div>
  );
};

export default React.memo(Sidebar);
