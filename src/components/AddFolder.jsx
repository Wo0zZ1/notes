import React from 'react';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import Button from './Button';
import Color from './Color';

import {
  addFolder,
  toggleAddFolderPopupActive,
} from '../redux/reducers/todosSlice';

import styles from '../scss/addFolder.module.scss';

const colors = [
  '#C9D1D3',
  '#42B883',
  '#64C4ED',
  '#FFBBCC',
  '#B6E6BD',
  '#C355F5',
  '#09011A',
  '#FF6464',
];

const DeleteIcon = React.memo(BsXLg);

const AddFolder = () => {
  const dispatch = useDispatch();

  const active = useSelector((state) => state.todos.addFolderPopupActive);

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const [currentColor, setCurrentColor] = React.useState('#C9D1D3');

  const add = (e) => {
    e.preventDefault();
    setValue('');
    inputRef.current.focus();
    dispatch(addFolder({ color: currentColor, title: value }));
  };

  const close = () => {
    setValue('');
    dispatch(toggleAddFolderPopupActive());
  };

  //FOCUS
  React.useEffect(() => {
    if (!active) return;
    inputRef.current.focus();
  }, [active]);
  //FOCUS

  //FRAMER_MOTION
  const variants = {
    close: { opacity: 0, x: '-100%' },
    open: { opacity: 1, x: '6vw' },
  };
  //FRAMER_MOTION

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 100, damping: 13 }}
      variants={variants}
      initial={'close'}
      animate={active ? 'open' : 'close'}
      className={styles.root}>
      <form onSubmit={add}>
        <input
          value={value}
          ref={inputRef}
          spellCheck={'false'}
          maxLength={20}
          required={true}
          placeholder='Название папки'
          type='text'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div>
          {colors.map((color, index) => (
            <Color
              setCurrentColor={setCurrentColor}
              active={currentColor === color}
              key={index}
              color={color}
            />
          ))}
        </div>
        <Button type={'submit'} title={'Добавить'} />
      </form>
      <motion.button
        initial={{ x: '50%', y: '-50%', rotateZ: 0 }}
        whileHover={{ rotateZ: 180 }}
        onClick={close}>
        <DeleteIcon />
      </motion.button>
    </motion.div>
  );
};

export default React.memo(AddFolder);
