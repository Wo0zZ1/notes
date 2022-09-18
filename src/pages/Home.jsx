import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import AddFolder from '../components/AddFolder';
import Undo from '../components/Undo';

import { fetchData } from '../redux/reducers/todosSlice';

import styles from '../scss/home.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, type: 'keyframes' }}
      className={styles.root}>
      <Sidebar />
      <Content />
      <AddFolder />
      <Undo />
    </motion.div>
  );
};

export default Home;
