import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsPencilSquare } from 'react-icons/bs';

import { editFolder } from '../redux/reducers/todosSlice';

import styles from '../scss/title.module.scss';

const EditIcon = React.memo(BsPencilSquare)

const Title = ({ pathId, color, title }) => {
  const dispatch = useDispatch();

  const [isShow, setIsShow] = React.useState(false);

  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isShow) inputRef.current.focus();
  }, [isShow]);

  const [value, setValue] = React.useState(title);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isShow) {
      setIsShow(true);
      return;
    }
    setIsShow(false);
    if (value !== title)
      dispatch(editFolder({ id: pathId, title: value }));
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{ color: color }}
      className={styles.root}>
      {isShow ? (
        <input
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          required
          type={'text'}
          maxLength={20}
          spellCheck={'false'}
          placeholder='Название папки'
          value={value}
        />
      ) : (
        <Link to={`/${pathId}`}>
          <h1>{title}</h1>
        </Link>
      )}
      <button type={'submit'}>
        <EditIcon />
      </button>
    </form>
  );
};

export default React.memo(Title);
