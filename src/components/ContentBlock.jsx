import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';

import Title from './Title';
import Task from './Task';
import Button from './Button';
import AddTask from './AddTask';

import useChekMobileScreen from '../hooks/useChekMobileScreen';

import styles from '../scss/contentBlock.module.scss';

const ContentBlock = ({ id, color, title }) => {
  const tasks = useSelector((state) =>
    state.todos.tasks.filter((task) => task.folderId === id),
  );

  const [inputActive, setInputActive] = React.useState(false);

  const isMobile = useChekMobileScreen();

  const PlusIcon = React.memo(AiOutlinePlus);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className={styles.root}>
      <Title color={color} title={title} pathId={id} />
      <div className={styles.tasks}>
        <ul>
          {tasks
            .filter((task) => task.toBeDeleted !== true)
            .map((task) => {
              return (
                <li key={task.id}>
                  <Task {...task} />
                </li>
              );
            })}
        </ul>
      </div>
      {!inputActive ? (
        <div
          className={styles.addButton}
          style={{ opacity: isMobile ? 1 : '' }}>
          <Button
            style={{ opacity: isMobile ? 1 : '' }}
            type={'button'}
            Svg={PlusIcon}
            clickHandler={() => setInputActive(true)}
            title={'Новая задача'}
          />
        </div>
      ) : (
        <AddTask setInputActive={setInputActive} folderId={id} />
      )}
    </motion.div>
  );
};

export default React.memo(ContentBlock);
