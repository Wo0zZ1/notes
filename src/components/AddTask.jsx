import React from 'react';
import { useDispatch } from 'react-redux';

import Button from './Button';

import { addTask } from '../redux/reducers/todosSlice';

import styles from '../scss/addTask.module.scss';

const AddTask = ({ setInputActive, folderId }) => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const inputRef = React.useRef();

  const add = (e) => {
    e.preventDefault();
    if (!value) return;
    dispatch(
      addTask({
        title: value,
        folderId,
      }),
    );
    setValue('');
    inputRef.current.focus();
  };

  const cancel = () => {
    setInputActive(false);
  };

  //FOCUS
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  //FOCUS

  return (
    <form onSubmit={add} className={styles.root}>
      <input
        maxLength={100}
        required
        placeholder='Текст задачи'
        ref={inputRef}
        spellCheck={'false'}
        value={value}
        type={'text'}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        <Button
          type={'submit'}
          clickHandler={add}
          title={'Добавить задачу'}
        />
        <Button type={'button'} clickHandler={cancel} title={'Отмена'} />
      </div>
    </form>
  );
};

export default React.memo(AddTask);
