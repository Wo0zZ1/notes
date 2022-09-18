import React from 'react';

import styles from '../scss/button.module.scss';

const Button = ({ Svg, clickHandler, title, type }) => {
  return (
    <button type={type} onClick={clickHandler} className={styles.root}>
      {Svg && <Svg />}
      {title && <span>{title}</span>}
    </button>
  );
};

export default React.memo(Button);
