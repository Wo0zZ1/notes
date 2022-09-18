import { configureStore } from '@reduxjs/toolkit';

import todosSlice from './reducers/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});
