import React from 'react';
import { useDispatch } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';

import {
  toggleTask,
  deleteTask,
  setUndoPopupActive,
} from '../redux/reducers/todosSlice';

import useChekMobileScreen from '../hooks/useChekMobileScreen';

import styles from '../scss/task.module.scss';

const DeleteIcon = React.memo(FaRegTrashAlt);

const Task = ({ title, completed, id }) => {
  const dispatch = useDispatch();

  const isMobile = useChekMobileScreen();

  const deleteHandler = () => {
    dispatch(deleteTask(id));
    dispatch(setUndoPopupActive(true));
  };

  return (
    <div className={styles.root}>
      <div className={styles.checkbox}>
        <input
          onChange={() => {
            dispatch(toggleTask(id));
          }}
          checked={completed}
          id={id}
          type='checkbox'
        />
        <label htmlFor={id}>
          <svg
            width='11'
            height='8'
            viewBox='0 0 11 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001'
              stroke='#000'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </label>
      </div>
      <p>{title}</p>
      <button
        onClick={deleteHandler}
        style={{ opacity: isMobile ? 1 : '' }}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default React.memo(Task);
