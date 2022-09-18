import React from 'react';

import styles from '../scss/color.module.scss';

const Color = ({ color, active, setCurrentColor }) => {
  const clickHandler = () => {
    setCurrentColor(color);
  };

  return (
    <button
      type={'button'}
      onClick={clickHandler}
      style={{ backgroundColor: color }}
      className={`${styles.root} ${active ? styles.active : ''}`}
    />
  );
};

export default React.memo(Color);
