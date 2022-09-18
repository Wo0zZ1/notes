import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RiMenuUnfoldFill } from 'react-icons/ri';

import ContentBlock from './ContentBlock';

import { toggleSidebarActive } from '../redux/reducers/todosSlice';

import useChekMobileScreen from '../hooks/useChekMobileScreen';

import styles from '../scss/content.module.scss';

const Content = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  let folders = useSelector((state) => state.todos.folders);

  const pathId = location.pathname.split('/')[1];

  if (pathId) folders = [folders.find((folder) => folder.id === pathId)];

  const sidebarActive = useSelector((state) => state.todos.sidebarActive);

  const isMobile = useChekMobileScreen();

  const variant = isMobile ? (sidebarActive ? 'open' : 'close') : 'open';

  const variants = {
    open: { marginLeft: 250 },
    close: { marginLeft: 0 },
  };

  const BurgerIcon = React.memo(RiMenuUnfoldFill);

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
      <div
        className={`${styles.contentBlocks} ${
          pathId ? styles.row : styles.table
        }`}>
        {folders[0] &&
          folders
            .filter((folder) => folder.toBeDeleted !== true)
            .map((folder) => (
              <ContentBlock
                color={folder.color}
                title={folder.title}
                key={folder.id}
                id={folder.id}
              />
            ))}
      </div>
      {isMobile && (
        <button
          onClick={() => {
            dispatch(toggleSidebarActive());
          }}>
          <BurgerIcon />
        </button>
      )}
    </motion.div>
  );
};

export default React.memo(Content);
