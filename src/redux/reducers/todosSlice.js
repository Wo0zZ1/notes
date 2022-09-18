import { createSlice } from '@reduxjs/toolkit';
import {} from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const initialState = {
  tasks: [
    {
      title: 'Пример невыполненного задания',
      completed: false,
      folderId: '1251c2e9-b885-43f1-bdb4-bc9f23f54110',
      toBeDeleted: false,
      id: uuid(),
    },
    {
      title: 'Пример выполненного задания',
      completed: true,
      folderId: '2251c2e9-b885-43f1-bdb4-bc9f23f54110',
      toBeDeleted: false,
      id: uuid(),
    },
  ],
  folders: [
    {
      color: 'green',
      title: 'Тест 1',
      toBeDeleted: false,
      id: '1251c2e9-b885-43f1-bdb4-bc9f23f54110',
    },
    {
      color: 'blue',
      title: 'Тест 2',
      toBeDeleted: false,
      id: '2251c2e9-b885-43f1-bdb4-bc9f23f54110',
    },
  ],
  undoPopupActive: false,
  addFolderPopupActive: false,
  sidebarActive: false,
};

const setData = (state) => {
  try {
    window?.localStorage.setItem('tasks', JSON.stringify(state.tasks));
    window?.localStorage.setItem('folders', JSON.stringify(state.folders));
  } catch (error) {}
};

const getData = () => {
  try {
    const tasks = JSON.parse(window?.localStorage.getItem('tasks'));
    const folders = JSON.parse(window?.localStorage.getItem('folders'));
    return { tasks, folders };
  } catch (error) {
    console.log('Please allow access to the local storage');
    return { undefined, undefined };
  }
};

const TodosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (!task) return;
      task.completed = !task.completed;
      setData(state);
    },
    addTask(state, action) {
      state.tasks.push({
        ...action.payload,
        completed: false,
        toBeDeleted: false,
        id: uuid(),
      });
      setData(state);
    },
    deleteTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (!task) return;
      task.toBeDeleted = true;
      setData(state);
    },
    addFolder(state, action) {
      state.folders.push({ ...action.payload, id: uuid() });
      setData(state);
    },
    editFolder(state, action) {
      const { id, title } = action.payload;
      const folder = state.folders.find((folder) => folder.id === id);
      if (!folder) return;
      folder.title = title;
      setData(state);
    },
    deleteFolder(state, action) {
      const folder = state.folders.find(
        (folder) => folder.id === action.payload,
      );
      if (!folder) return;
      folder.toBeDeleted = true;
      setData(state);
    },
    applyUndoList(state) {
      state.folders = state.folders.filter((folder) => {
        if (!folder.toBeDeleted) return true;
        const id = folder?.id;
        if (id)
          state.tasks = state.tasks.filter((task) => task.folderId !== id);
        return false;
      });
      state.tasks = state.tasks.filter(
        (task) => task.toBeDeleted !== true,
      );
      state.undoPopupActive = false;
      setData(state);
    },
    clearUndoList(state) {
      state.folders.forEach((folder) => {
        folder.toBeDeleted = false;
      });
      state.tasks.forEach((task) => {
        task.toBeDeleted = false;
      });
      state.undoPopupActive = false;
      setData(state);
    },
    toggleSidebarActive(state) {
      state.sidebarActive = !state.sidebarActive;
    },
    toggleAddFolderPopupActive(state) {
      state.addFolderPopupActive = !state.addFolderPopupActive;
    },
    setUndoPopupActive(state, action) {
      state.undoPopupActive = action.payload;
    },
    fetchData(state) {
      const { tasks, folders } = getData();
      state.tasks = tasks || [];
      state.folders = folders || [];
    },
  },
});

export const {
  toggleTask,
  addTask,
  deleteTask,
  addFolder,
  editFolder,
  deleteFolder,
  applyUndoList,
  clearUndoList,
  toggleSidebarActive,
  toggleAddFolderPopupActive,
  setUndoPopupActive,
  fetchData,
} = TodosSlice.actions;

export default TodosSlice.reducer;
