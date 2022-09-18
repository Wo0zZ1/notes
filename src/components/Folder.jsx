import React from 'react';
import { BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  deleteFolder,
  setUndoPopupActive,
} from '../redux/reducers/todosSlice';

import useChekMobileScreen from '../hooks/useChekMobileScreen';

import styles from '../scss/folder.module.scss';

const DeleteIcon = React.memo(BsXLg);

const Folder = ({ id, color, title }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const pathId = location.pathname.split('/')[1];

  const isMobile = useChekMobileScreen();

  const clickHandler = () => {
    history('/');
    dispatch(deleteFolder(id));
    dispatch(setUndoPopupActive(true));
  };

  return (
    <div
      className={
        pathId === id
          ? `${styles.active} ${styles.root}`
          : `${styles.root}`
      }>
      <Link to={`/${id}`}>
        <div
          style={{ backgroundColor: color }}
          className={styles.mark}></div>
        <span>{title}</span>
      </Link>
      <button
        style={{ opacity: isMobile ? 1 : '' }}
        onClick={clickHandler}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default React.memo(Folder);
