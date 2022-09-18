import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import Button from './Button';

import {
  applyUndoList,
  clearUndoList,
} from '../redux/reducers/todosSlice';

import styles from '../scss/undo.module.scss';

const Undo = () => {
  const dispatch = useDispatch();

  const undoActive = useSelector((state) => state.todos.undoPopupActive);

  const [isActive, setIsActive] = React.useState(false);

  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(undoActive);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [undoActive]);

  React.useEffect(() => {
    if (!isActive) return setSeconds(0);
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds >= 100 - 0.2) {
          clearInterval(interval);
          setTimeout(() => {
            dispatch(applyUndoList());
          }, 500);
        }
        return seconds + 0.2;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isActive]);

  const variants = {
    close: {
      opacity: 0,
      y: '100%',
    },
    open: {
      opacity: 1,
      y: -50,
    },
  };

  const clickHandler = () => {
    dispatch(clearUndoList());
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0, x: '-50%' }}
      animate={isActive ? 'open' : 'close'}
      variants={variants}
      transition={{
        duration: 1,
        type: 'spring',
      }}
      className={styles.root}>
      <div className={styles.content}>
        <span>Отменить изменения?</span>
        <Button clickHandler={clickHandler} title={'Отменить'} />
      </div>
      <div
        style={{ width: `${Math.abs(seconds)}%` }}
        className={styles.bar}></div>
    </motion.div>
  );
};

export default React.memo(Undo);
